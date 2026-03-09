/* ================================================================
   petals.js  ·  Falling sunflower petals — premium animation
   Features:
     · Realistic petal shapes drawn with bezier curves
     · Depth layers (parallax, size, opacity, blur)
     · Wind physics with smooth interpolation
     · Rotation + gentle flutter on each petal
     · Ambient warm light blobs that breathe
     · Delta-time loop for stable 60fps on any device
   ================================================================ */

(() => {
  'use strict';

  /* ── Setup ───────────────────────────────────────────────── */
  const canvas = document.getElementById('petal-canvas');
  const ctx    = canvas.getContext('2d');
  let W = 0, H = 0;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  /* ── Utility ─────────────────────────────────────────────── */
  const rand  = (a, b)  => a + Math.random() * (b - a);
  const lerp  = (a, b, t) => a + (b - a) * t;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  /* ── Wind ────────────────────────────────────────────────── */
  const wind = { now: 0, target: 0, cd: 0 };
  function tickWind(dt) {
    wind.cd -= dt;
    if (wind.cd <= 0) {
      wind.target = rand(-0.28, 0.28);
      wind.cd     = rand(3500, 9000);
    }
    wind.now = lerp(wind.now, wind.target, clamp(0.00035 * dt, 0, 1));
  }

  /* ── Ambient glow blobs ──────────────────────────────────── */
  let ambientT = 0;
  function drawAmbient() {
    ambientT += 0.00035;

    // Warm centre glow
    const cx  = W * 0.5  + Math.cos(ambientT * 0.7) * W * 0.07;
    const cy  = H * 0.44 + Math.sin(ambientT)        * H * 0.05;
    const r   = Math.min(W, H) * 0.62;
    const g1  = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    g1.addColorStop(0,   'rgba(212,160, 23, 0.055)');
    g1.addColorStop(0.45,'rgba(190, 90, 50, 0.022)');
    g1.addColorStop(1,   'transparent');
    ctx.fillStyle = g1;
    ctx.fillRect(0, 0, W, H);

    // Rose side wash
    const bx = W * 0.12;
    const by = H * 0.28;
    const g2 = ctx.createRadialGradient(bx, by, 0, bx, by, W * 0.42);
    g2.addColorStop(0, 'rgba(180, 70, 95, 0.038)');
    g2.addColorStop(1, 'transparent');
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, W, H);
  }

  /* ── Petal shape ─────────────────────────────────────────── */
  /*
     A sunflower petal = an elongated ellipse with a pointed tip,
     drawn using two cubic bezier curves mirrored on the X axis.
     We draw it pointing "up" (tip at top), centred at origin,
     then the caller does translate + rotate.
  */
  function buildPetalPath(len, w) {
    const path = new Path2D();
    // right side: origin → right bulge → tip
    path.moveTo(0, 0);
    path.bezierCurveTo(
       w * 0.55,  -len * 0.18,   // cp1
       w * 0.50,  -len * 0.72,   // cp2
       0,         -len            // tip
    );
    // left side: tip → left bulge → origin
    path.bezierCurveTo(
      -w * 0.50,  -len * 0.72,
      -w * 0.55,  -len * 0.18,
       0,          0
    );
    path.closePath();
    return path;
  }

  /* ── Petal gradient cache ────────────────────────────────── */
  // We pre-bake one gradient per "size bucket" (small/med/large)
  // to avoid creating new gradient objects every frame.
  const gradCache = {};
  function getPetalGrad(len) {
    const key = Math.round(len / 4) * 4;  // quantise to 4px buckets
    if (gradCache[key]) return gradCache[key];
    const g = ctx.createLinearGradient(0, 0, 0, -len);
    g.addColorStop(0,    '#c89010');
    g.addColorStop(0.15, '#e8b820');
    g.addColorStop(0.55, '#f5d855');
    g.addColorStop(0.85, '#d4a017');
    g.addColorStop(1,    '#9a6c08');
    gradCache[key] = g;
    return g;
  }

  /* ── Petal veins ─────────────────────────────────────────── */
  function drawVeins(len, w) {
    ctx.strokeStyle = 'rgba(180,130,0,0.18)';
    ctx.lineWidth   = Math.max(0.4, len * 0.012);
    ctx.lineCap     = 'round';

    // Centre vein
    ctx.beginPath();
    ctx.moveTo(0, -len * 0.04);
    ctx.lineTo(0, -len * 0.92);
    ctx.stroke();

    // Side veins
    const veins = 3;
    for (let i = 1; i <= veins; i++) {
      const t  = i / (veins + 1);
      const y  = -len * (0.12 + t * 0.55);
      const vw = w * (0.30 - t * 0.08);

      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.quadraticCurveTo(vw * 0.6, y - len * 0.08, vw, y - len * 0.05);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.quadraticCurveTo(-vw * 0.6, y - len * 0.08, -vw, y - len * 0.05);
      ctx.stroke();
    }
  }

  /* ── Petal particle ──────────────────────────────────────── */
  function createPetal(spreadY = false) {
    const depth   = rand(0.1, 1.0);
    const len     = 10 + depth * 42;
    const w       = len * rand(0.28, 0.40);

    return {
      x:          rand(0, W),
      y:          spreadY ? rand(-len, H) : rand(-len * 2, -H * 0.3),
      depth,
      len,
      w,
      path:       buildPetalPath(len, w),
      speed:      0.25 + depth * 1.25,
      drift:      rand(-0.22, 0.22),
      alpha:      0.12 + depth * 0.52,
      rot:        rand(0, Math.PI * 2),
      rotSpeed:   rand(-0.012, 0.012) * (0.4 + depth * 0.6),
      flutter:    rand(0,   Math.PI * 2),        // phase offset
      flutterSpd: rand(0.04, 0.10),              // flutter freq
      flutterAmp: rand(0.015, 0.05),             // flutter magnitude
      sway:       rand(0, Math.PI * 2),
      swaySpd:    rand(0.006, 0.013),
      swayAmp:    rand(14, 36) * depth,
    };
  }

  /* ── Pool ────────────────────────────────────────────────── */
  const COUNT   = 55;
  const petals  = Array.from({ length: COUNT }, () => createPetal(true));
  // Sort back → front so nearer petals paint over far ones
  petals.sort((a, b) => a.depth - b.depth);

  /* ── Background ──────────────────────────────────────────── */
  function drawBackground() {
    const bg = ctx.createRadialGradient(
      W * 0.50, H * 0.40, 0,
      W * 0.50, H * 0.40, Math.max(W, H) * 0.80
    );
    bg.addColorStop(0,   '#241016');
    bg.addColorStop(0.5, '#180a0d');
    bg.addColorStop(1,   '#0a0406');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);
  }

  /* ── Draw single petal ───────────────────────────────────── */
  function drawPetal(p) {
    ctx.save();
    ctx.globalAlpha = p.alpha;
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);

    // Soft depth blur via shadow (cheap approximation)
    if (p.depth < 0.35) {
      ctx.shadowColor = 'rgba(0,0,0,0)'; // no shadow for bg petals
    } else {
      ctx.shadowColor  = 'rgba(10,4,6,0.50)';
      ctx.shadowBlur   = p.len * 0.18;
      ctx.shadowOffsetY = p.len * 0.06;
    }

    // Fill with cached gradient
    ctx.fillStyle = getPetalGrad(p.len);
    ctx.fill(p.path);

    // Rim highlight
    ctx.strokeStyle = `rgba(255,240,120,${0.08 * p.depth})`;
    ctx.lineWidth   = Math.max(0.3, p.len * 0.018);
    ctx.stroke(p.path);

    // Veins only on mid/front petals
    if (p.depth > 0.38) {
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur  = 0;
      ctx.shadowOffsetY = 0;
      drawVeins(p.len, p.w);
    }

    ctx.restore();
  }

  /* ── Main loop ───────────────────────────────────────────── */
  let lastTs = 0;

  function loop(ts) {
    const dt = Math.min(ts - lastTs, 50);
    lastTs = ts;

    ctx.clearRect(0, 0, W, H);
    drawBackground();
    drawAmbient();
    tickWind(dt);

    const DT = dt / 16.667;   // normalise to 60fps

    for (const p of petals) {
      // Flutter = tiny fast wobble simulating aerodynamic flutter
      p.flutter += p.flutterSpd * DT;
      const flutter = Math.sin(p.flutter) * p.flutterAmp;

      // Sway = slow horizontal oscillation
      p.sway += p.swaySpd * DT;
      const sway = Math.sin(p.sway) * p.swayAmp;

      p.x   += (sway * 0.014 + p.drift + wind.now * p.depth * 48) * DT;
      p.y   += p.speed * DT;
      p.rot += (p.rotSpeed + flutter) * DT;

      // Wrap X
      const margin = p.len * 2;
      if (p.x < -margin)     p.x = W + margin;
      if (p.x > W + margin)  p.x = -margin;

      drawPetal(p);

      // Recycle below screen
      if (p.y > H + p.len * 3) {
        const fresh = createPetal(false);
        Object.assign(p, fresh);
        p.path = buildPetalPath(p.len, p.w);
        p.x    = rand(0, W);
      }
    }

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(ts => { lastTs = ts; requestAnimationFrame(loop); });

})();
