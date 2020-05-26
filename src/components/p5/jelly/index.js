export default function sketch(p5) {
  let boff = 0;
  let offset = 0;

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL);
    p5.colorMode(p5.HSL, 360, 100, 100, 1);
  };

  p5.myCustomRedrawAccordingToNewPropsHandler = function (props) {};

  p5.draw = function () {
    const backgroundHue = p5.map(p5.noise((boff += 0.01)), 0, 1, 0, 35);
    p5.background(backgroundHue, 50, 70, 1);

    jelly(offset++);
  };

  const jelly = (offset) => {
    let x = -50;
    p5.noFill();
    p5.stroke(0);

    while (x < 50) {
      p5.point(x, 5 * Math.sin((x + offset) / 10));
      x += 0.01;
    }
  };
}
