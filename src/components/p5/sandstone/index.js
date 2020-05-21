export default function sketch(p) {
  let yoff = 0;
  const width = window.innerWidth;
  const height = window.innerHeight;

  p.setup = () => {
    p.createCanvas(width, height, p.WEBGL);
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function (props) {};

  p.draw = function () {
    p.background(51);
    p.fill(255);
    p.noStroke();

    p.beginShape();
    p.vertex(-p.width / 2, p.height / 2);

    let xoff = 0;

    for (let x = -p.width / 2; x <= p.width / 2; x += 10) {
      let y = p.map(p.noise(xoff, yoff), 0, 1, -50, 50);

      p.vertex(x, y);

      xoff += 0.05;
    }

    yoff += 0.01;

    p.vertex(p.width / 2, p.height / 2);
    p.endShape('close');
  };
}
