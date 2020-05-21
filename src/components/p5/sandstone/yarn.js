// inspired by https://josephg.com/perlin/3/

export default (p) => {
  const TAU = p.TAU;
  const period = 1 / 800;
  const colorRange = 50;
  const numParticles = 1000;

  let particles = [];
  let baseColor;

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
    p.colorMode(p.HSL);
    p.rectMode(p.CENTER);
    p.noStroke();

    p.background(360, 0, 0, 1);

    init();
  };

  p.draw = () => {
    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i];

      const v = p.noise(particle.x * period, particle.y * period);

      p.fill(baseColor + v * colorRange, 100, 70, 0.05);
      p.square(particle.x, particle.y, 1.5, 1.5);

      const a = v * 2 * p.PI + particle.a;

      particle.x += Math.cos(a);
      particle.y += Math.sin(a);
    }
  };

  p.windowResized = () => {
    p.resizeCanvas(window.innerWidth, window.innerHeight);

    reset();
  };

  p.mouseClicked = () => {
    reset();
  };

  const reset = () => {
    p.background(360, 0, 0, 1);

    p.noiseSeed(Math.random() * 10000);

    particles = [];

    init();
  };

  const init = () => {
    baseColor = Math.random() * 360;
    const radius = (p.width + p.height) / 8;

    for (let i = 0; i < numParticles; i++) {
      const r = radius * Math.sqrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;

      const p1 = {
        x: r * Math.cos(theta),
        y: r * Math.sin(theta),
        a: 0,
      };
      particles.push(p1);
      particles.push({
        x: p1.x,
        y: p1.y,
        a: TAU / 4,
      });
      particles.push({
        x: p1.x,
        y: p1.y,
        a: TAU / 2,
      });
      particles.push({
        x: p1.x,
        y: p1.y,
        a: (3 * TAU) / 4,
      });
    }
  };
};
