// inspired by https://josephg.com/perlin/1/

export default (p) => {
  const TAU = p.TAU;
  const period = 1 / 100;
  const colorRange = 110;
  const numParticles = 1000;

  let particles = [];
  let baseColor;

  p.myCustomRedrawAccordingToNewPropsHandler = function ({ octaves, fallout }) {
    p.noiseDetail(octaves, fallout);
  };

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

      p.fill(baseColor + v * colorRange, 100, 50, 0.2);
      p.square(particle.x, particle.y, 1.5, 1.5);

      const a = v * 2 * p.PI + particle.a;

      particle.x += Math.cos(a);
      particle.y += Math.sin(a);

      if (isOffscreen(particle)) {
        particle.x = Math.random() * p.width - p.width / 2;
        particle.y = Math.random() * p.height - p.height / 2;
      }
    }
  };

  const isOffscreen = ({ x, y }) =>
    -p.width / 2 > x || x > p.width || -p.height / 2 > y || y > p.height;

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
    baseColor = 25;

    for (let i = 0; i < numParticles; i++) {
      const direction = Math.floor(Math.random() * 5);

      const p1 = {
        x: Math.random() * p.width - p.width / 2,
        y: Math.random() * p.height - p.height / 2,
        a: (direction / 2) * TAU,
      };
      particles.push(p1);
    }
  };
};
