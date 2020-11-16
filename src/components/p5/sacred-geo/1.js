export default function sketch(p5) {
  let rotation1 = 0;
  let rotation2 = 0;
  let rotation3 = 0;
  let rotation4 = 0;

  p5.setup = () => {
    p5.createCanvas(window.innerWidth, window.innerHeight);
    p5.stroke(0);
    p5.strokeWeight(0.5);
    p5.noFill();
  };

  p5.draw = function () {
    p5.translate(p5.width / 2, p5.height / 2);
    p5.blendMode(p5.ADD);
    p5.background(255, 10);
    p5.blendMode(p5.BLEND);

    const circles1 = (x0, y0) =>
      circle({ x0, y0, rotation: rotation1, points: 8, radius: 5 });

    const circles2 = (x0, y0) =>
      circle({
        x0,
        y0,
        drawFn: circles1,
        points: 10,
        radius: 25,
        rotation: rotation2,
      });

    const circles3 = (x0, y0) =>
      circle({
        x0,
        y0,
        drawFn: circles2,
        points: 5,
        radius: 50,
        rotation: rotation3,
      });
    const circles4 = (x0, y0) =>
      circle({
        x0,
        y0,
        drawFn: circles3,
        points: 5,
        radius: 200,
        rotation: rotation4,
      });
    const circles5 = () =>
      circle({ drawFn: circles4, points: 3, radius: 250, rotation: rotation1 });

    circles5();

    rotation1 += 0.01;
    rotation2 += 0.03;
    rotation3 += 0.002;
    rotation4 += 0.02;
  };

  const circle = ({
    x0 = 0,
    y0 = 0,
    drawFn = (x, y) => p5.point(x, y),
    points = 5,
    rotation = 0,
    radius = 100,
  }) => {
    for (let i = 0; i < 2 * p5.PI; i += (2 * p5.PI) / points) {
      const x = p5.cos(i + rotation) * radius;
      const y = p5.sin(i + rotation) * radius;
      drawFn(x + x0, y + y0);
    }
  };
}
