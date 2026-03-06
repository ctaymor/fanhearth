(function () {
  const STAR_COUNT = 160;

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
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.4 + 0.3,
        phase: Math.random() * Math.PI * 2,
        freq: Math.random() * 0.8 + 0.3, // slower = lazy twinkle, faster = sparkle
      });
    }
  }

  function draw(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const t = timestamp / 1000;

    for (const s of stars) {
      const alpha = 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(t * s.freq + s.phase));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(240, 240, 210, ${alpha})`;
      ctx.fill();
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
