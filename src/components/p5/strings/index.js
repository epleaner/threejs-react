export default function sketch(p) {
  const TAU = p.TAU;
  const period = 1 / 200;
  const particles = [];
  const numParticles = 2000;

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
    p.colorMode(p.HSL, 360, 100, 100, 1);
    p.strokeWeight(2);

    p.fill(0, 0, 100, 1);

    for (let i = 0; i < numParticles; i++) {
      const p1 = {
        x: Math.random() * p.width - p.width / 2,
        y: 0,
        a: 0,
      };
      particles.push(p1);
      particles.push({
        x: p1.x,
        y: p1.y,
        a: TAU / 2,
      });
    }
  };

  p.draw = function () {
    p.background(0, 100, 100, 0.5);

    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i];

      const v = p.noise(particle.x * period, particle.y * period);

      const hue = p.map(v, 0, 1, 0, 360);

      p.stroke(hue, 95, 20, 1);
      p.point(particle.x, particle.y);

      particle.h++;

      const a = v * 2 * p.PI + particle.a;

      particle.x += Math.cos(a);
      particle.y += Math.sin(a);
    }
  };
}
