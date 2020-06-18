export default (p) => {
  let numSegments = 5,
    segLength = 40,
    numPoints = 20,
    points = [],
    x = [],
    y = [],
    angle = [],
    targetX,
    targetY,
    randomize = false;

  p.myCustomRedrawAccordingToNewPropsHandler = function ({
    numSegments: newNumSegments,
    segLength: newSegLength,
    randomize: newRandomize,
  }) {
    numSegments = newNumSegments;
    segLength = newSegLength;
    randomize = newRandomize;
    init();
  };

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
    p.stroke(255, 100);

    init();
  };

  p.draw = () => {
    p.background(0);

    for (let t = 0; t < points.length; t++) {
      x = points[t].x;
      y = points[t].y;
      angle = points[t].angle;

      reachSegment(0, p.mouseX - p.width / 2, p.mouseY - p.height / 2);

      for (let i = 1; i < numSegments; i++) {
        reachSegment(i, targetX, targetY);
      }
      for (let j = x.length - 1; j >= 1; j--) {
        positionSegment(j, j - 1);
      }
      for (let k = 0; k < x.length; k++) {
        segment(x[k], y[k], angle[k], (k + 1) * 2);
      }
    }
  };

  function getHeartX(t) {
    return 0.25 * (-p.pow(t, 2) + 40 * t + 1200) * p.sin((Math.PI * t) / 180);
  }

  function getHeartY(t) {
    return (
      -0.25 * (-p.pow(t, 2) + 40 * t + 1200) * p.cos((Math.PI * t) / 180) +
      p.height / 4
    );
  }

  function positionSegment(a, b) {
    x[b] = x[a] + p.cos(angle[a]) * segLength;
    y[b] = y[a] + p.sin(angle[a]) * segLength;
  }

  function reachSegment(i, xin, yin) {
    const dx = xin - x[i];
    const dy = yin - y[i];
    angle[i] = p.atan2(dy, dx);

    targetX = xin - p.cos(angle[i]) * segLength;
    targetY = yin - p.sin(angle[i]) * segLength;
  }

  function segment(x, y, a, sw) {
    p.strokeWeight(1);
    p.push();
    p.translate(x, y);
    p.rotate(a);
    p.line(0, 0, segLength, 0);
    p.pop();
  }

  const init = () => {
    points = [];
    for (let t = 0; t < numPoints; t++) {
      const point = { x: [], y: [], angle: [] };

      let x1 = [],
        x2 = [];

      for (let i = 0; i < numSegments; i++) {
        x1.push(0);
        x2.push(0);
        point.y.push(0);
        point.angle.push(0);
      }

      const hx = getHeartX(t);
      const hy = getHeartY(t);

      x1[numSegments - 1] = hx;
      x2[numSegments - 1] = -hx;

      point.y[numSegments - 1] = hy;

      point.x = x1;

      const point2 = { x: x2, y: point.y, angle: point.angle };

      points.push(point);
      points.push(point2);
    }
  };
};
