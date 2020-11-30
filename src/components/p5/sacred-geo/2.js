export default function sketch(p5) {
  let layers = [],
    numLayers = 1;

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

  p5.setup = () => {
    p5.createCanvas(window.innerWidth, window.innerHeight);
    p5.stroke(0);
    p5.strokeWeight(0.5);
    p5.noFill();

    for (let i = 0; i < numLayers; i++) {
      let layer;
      if (i === 0) {
        layer = (x0, y0) =>
          circle({
            x0,
            y0,
            points: Math.floor(Math.random(5)),
            radius: Math.floor(Math.random(5)),
          });
      } else if (i === numLayers - 1) {
        layer = () =>
          circle({
            drawFn: layers[i - 1],
            points: Math.floor(Math.random(5)),
            radius: Math.floor(Math.random(5)),
          });
      } else {
        layer = (x0, y0) =>
          circle({
            x0,
            y0,
            drawFn: layers[i - 1],
            points: Math.floor(Math.random(5)),
            radius: Math.floor(Math.random(i * 10)) + i * 10,
          });
      }

      layers.push(layer);
    }
  };

  p5.draw = function () {
    p5.translate(p5.width / 2, p5.height / 2);
    p5.blendMode(p5.ADD);
    p5.background(255, 10);
    p5.blendMode(p5.BLEND);

    let outerCircle = layers[layers.length - 1];

    outerCircle();
  };
}
