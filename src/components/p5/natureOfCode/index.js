import Jelly from '@components/p5/jelly/jelly';

export default function sketch(p5) {
  const jelly = new Jelly(p5);
  let bHueOff = 0;

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL);
    p5.colorMode(p5.HSL, 360, 100, 100, 1);
  };

  p5.myCustomRedrawAccordingToNewPropsHandler = function (props) {};

  p5.draw = function () {
    const backgroundHue = p5.map(p5.noise((bHueOff += 0.001)), 0, 1, 0, 360);
    p5.background(backgroundHue, 50, 70, 1);

    jelly.update();
    jelly.draw();
  };

  p5.windowResized = () => p5.setup();
}
