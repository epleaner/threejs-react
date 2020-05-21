// inspired by https://josephg.com/perlin/1/

export default (p) => {
  const period = 1 / 200;
  const colorRange = 100;
  const baseColor = 40;
  const numParticles = 100;
  const maxParticles = 2000;

  let xStart;
  let yStart;

  let particles = [];

  p.myCustomRedrawAccordingToNewPropsHandler = function ({ octaves, fallout }) {
    p.noiseDetail(octaves, fallout);
  };

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
    p.colorMode(p.HSL);
    p.rectMode(p.CENTER);
    p.noStroke();

    p.background(360, 0, 0, 1);

    xStart = 0;
    yStart = -p.height / 2;

    init();
  };

  p.draw = () => {
    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i];

      const v = p.noise(particle.x * period, particle.y * period);

      p.fill(baseColor + v * colorRange, 100, 40, 0.2);
      p.square(particle.x, particle.y, 1.5, 1.5);

      const a = v * 2 * p.PI + particle.a;

      particle.x += Math.cos(a);
      particle.y += Math.abs(Math.sin(a));

      if (isOffscreen(particle)) {
        if (particle.added) {
          particles.splice(i, 1);
        } else {
          particle.x = xStart;
          particle.y = yStart;
          particle.a = Math.floor(Math.random() * numParticles);
          particle.split = 0;
        }
      }

      if (
        particles.length < maxParticles &&
        (!particle.split || particle.split < 3) &&
        Math.floor(Math.random() * 300) === 1
      ) {
        particle.split = particle.split ? particle.split + 1 : 1;

        if (particle.split < 2) {
          const p1 = {
            x: particle.x,
            y: particle.y,
            a: Math.floor(Math.random() * numParticles),
            added: true,
          };

          particles.push(p1);
        }
      }
    }
  };

  const isOffscreen = ({ x, y }) =>
    -p.width / 2 > x ||
    x > p.width / 2 ||
    -p.height / 2 > y ||
    y > p.height / 2;

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
    for (let i = 0; i < numParticles; i++) {
      const angle = Math.PI * Math.random() * numParticles;

      const p1 = {
        x: xStart,
        y: yStart,
        a: angle,
      };
      particles.push(p1);
    }
  };
};
