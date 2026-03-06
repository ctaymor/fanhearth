(function () {
  const STAR_COUNT = 160;
  const CROSS_STAR_RATIO = 0.18; // ~18% of stars get the anamorphic cross treatment

  // Weighted color palette: mostly cold white, with splashes of pink/purple/blue
  const STAR_COLORS = [
    [220, 215, 255],  // cold white (most common)
    [220, 215, 255],
    [220, 215, 255],
    [255, 120, 200],  // pink
    [180, 130, 255],  // purple
    [100, 190, 255],  // blue
  ];

  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');
  let stars = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function makeStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      const isCross = Math.random() < CROSS_STAR_RATIO;
      const color = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        // cross stars are brighter and slightly larger
        radius: isCross ? Math.random() * 1.2 + 1.0 : Math.random() * 1.2 + 0.3,
        phase: Math.random() * Math.PI * 2,
        freq: Math.random() * 0.6 + 0.2,
        color,
        isCross,
      });
    }
  }

  // Draws the anamorphic lens cross: a bright center dot with horizontal + vertical streaks
  function drawCrossStar(s, alpha) {
    const { x, y, radius, color } = s;
    const [r, g, b] = color;

    // Center dot (brighter)
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
    ctx.fill();

    // Horizontal streak — longer, like a real anamorphic flare
    const hLen = radius * 18;
    const hGrad = ctx.createLinearGradient(x - hLen, y, x + hLen, y);
    hGrad.addColorStop(0,   `rgba(${r}, ${g}, ${b}, 0)`);
    hGrad.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${alpha * 0.65})`);
    hGrad.addColorStop(1,   `rgba(${r}, ${g}, ${b}, 0)`);
    ctx.beginPath();
    ctx.strokeStyle = hGrad;
    ctx.lineWidth = radius * 0.7;
    ctx.moveTo(x - hLen, y);
    ctx.lineTo(x + hLen, y);
    ctx.stroke();

    // Vertical streak — shorter
    const vLen = radius * 9;
    const vGrad = ctx.createLinearGradient(x, y - vLen, x, y + vLen);
    vGrad.addColorStop(0,   `rgba(${r}, ${g}, ${b}, 0)`);
    vGrad.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${alpha * 0.45})`);
    vGrad.addColorStop(1,   `rgba(${r}, ${g}, ${b}, 0)`);
    ctx.beginPath();
    ctx.strokeStyle = vGrad;
    ctx.lineWidth = radius * 0.4;
    ctx.moveTo(x, y - vLen);
    ctx.lineTo(x, y + vLen);
    ctx.stroke();
  }

  function draw(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const t = timestamp / 1000;

    for (const s of stars) {
      const alpha = 0.2 + 0.8 * (0.5 + 0.5 * Math.sin(t * s.freq + s.phase));

      if (s.isCross) {
        drawCrossStar(s, alpha);
      } else {
        const [r, g, b] = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.fill();
      }
    }

    requestAnimationFrame(draw);
  }

  function init() {
    resize();
    makeStars();
    requestAnimationFrame(draw);
    window.addEventListener('resize', () => {
      resize();
      makeStars();
    });
  }

  init();
})();
