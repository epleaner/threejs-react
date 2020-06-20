export default (p5) => {
  let segLength = 25,
    points = [],
    pressed = false,
    acceleration = 0.05,
    mouseX = p5.width / 2,
    mouseY = p5.height / 2,
    period = 1;

  p5.setup = () => {
    p5.createCanvas(window.innerWidth, window.innerHeight, p5.WEBGL);

    init();
  };

  p5.mousePressed = function () {
    pressed = true;
  };

  p5.mouseReleased = function () {
    pressed = false;
  };

  p5.draw = () => {
    p5.background(0, 0);
    let p;

    mouseX = p5.mouseX - p5.width / 2;
    mouseY = p5.mouseY - p5.height / 2;

    for (let i = 0; i < points.length; i++) {
      p = points[i];
      moveSegment(p);
      drawSegment(p);
    }
  };

  function moveSegment(p) {
    const dx = mouseX - p.x;
    const dy = mouseY - p.y;

    const dx0 = p.x0 - p.x;
    const dy0 = p.y0 - p.y;

    p.angle = p5.atan2(dy, dx);

    const velocityX = pressed ? dx : dx0;
    const velocityY = pressed ? dy : dy0;

    p.x += (velocityX + p5.cos(p.angle) * segLength) * acceleration;
    p.y += (velocityY + p5.sin(p.angle) * segLength) * acceleration;
  }

  function drawSegment(p) {
    p5.stroke(`rgba(${p.r}%,${p.g}%,${p.b}%,0.5)`);

    p5.strokeWeight(1);
    p5.push();
    p5.translate(p.x, p.y);
    p5.rotate(p.angle);
    p5.line(0, 0, segLength, 0);
    p5.pop();
  }

  const init = () => {
    points = [];

    for (let t1 = -p5.width / 2 - 100; t1 <= p5.width / 2 + 100; t1 += 100) {
      for (let t2 = -p5.height / 2; t2 <= p5.height / 2; t2 += 100) {
        const gn = p5.noise(t1 * period + 1000, t2 * period + 1000) * 100;
        const bn = p5.noise(t1 * period + 5000, t2 * period + 5000) * 100;

        const point = { angle: 0, r: 0, g: gn, b: bn };

        point.x = point.x0 = t1;
        point.y = point.y0 = t2;

        points.push(point);
      }
    }
  };
};
