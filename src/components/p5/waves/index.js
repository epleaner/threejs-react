export default function sketch(p) {
  const numWaves = 10;
  let yoff = 0;
  let boff = 0;

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
    p.colorMode(p.HSL, 360, 100, 100, 1);
    p.noStroke();
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function (props) {};

  p.draw = function () {
    const bhue = p.map(p.noise(boff), 0, 1, 0, 35);
    p.background(bhue, 50, 70, 1);

    boff += 0.01;

    let coff = 0;
    let woff = 0;

    for (let i = numWaves; i > 0; i--) {
      const hue = p.map(p.noise(woff), 0, 1, 150, 250);
      wave({ height: i * 30, hue, woff });

      coff += 0.01;
      woff += 0.1;
    }
  };

  const wave = ({ height, hue, woff }) => {
    p.fill(hue, 95, 25, 1);

    p.beginShape();
    p.vertex(-p.width / 2, p.height / 2);

    let xoff = 0;

    for (let x = -p.width / 2; x <= p.width / 2; x++) {
      let y = p.map(p.noise(xoff, yoff, woff), 0, 1, p.height / 2, -height);

      p.vertex(x, y);

      xoff += 0.0005;
    }

    yoff += 0.001;

    p.vertex(p.width / 2, p.height / 2);

    p.endShape(p.CLOSE);
  };
}
