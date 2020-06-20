export default (p) => {
  let numSegments,
    segLength,
    numPoints = 61,
    points = [],
    x = [],
    y = [],
    angle = [],
    targetX,
    targetY,
    randomize = false,
    r = 20,
    boff = 0;

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
    p.colorMode(p.HSL, 360, 100, 100, 1);
    p.strokeWeight(1);

    init();
  };

  p.draw = () => {
    const bhue = p.map(p.noise((boff += 0.01)), 0, 1, 0, 360);
    p.background(bhue, 50, 70, 1);

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
    return r * 16 * p.pow(p.sin(t), 3) - p.width / 2;
  }

  function getHeartY(t) {
    return (
      -r *
        (13 * p.cos(t) - 5 * p.cos(2 * t) - 2 * p.cos(3 * t) - p.cos(4 * t)) -
      50
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

      for (let i = 0; i < numSegments; i++) {
        point.x.push(0);
        point.y.push(0);
        point.angle.push(0);
      }

      point.x[numSegments - 1] = getHeartX(t) + p.width / 2;
      point.y[numSegments - 1] = getHeartY(t);

      points.push(point);
    }
  };
};
