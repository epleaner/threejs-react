export default class Jelly {
  offset = 0;
  amplitude = 4;
  length = 25;
  rotation = 0;
  topSpeed = 5;
  rotation;
  p5;
  location;
  velocity;

  constructor(p5) {
    this.p5 = p5;
    this.location = p5.createVector(0, 0);
    this.velocity = p5.createVector(0, 0);
  }

  update() {
    const targetV = this.p5.createVector(
      this.p5.mouseX - this.p5.width / 2,
      this.p5.mouseY - this.p5.height / 2
    );

    targetV.sub(this.location);
    targetV.normalize();
    targetV.mult(0.001);

    this.velocity.add(targetV);
    this.velocity.limit(this.topSpeed);
    this.location.add(this.velocity);

    this.rotation = targetV.angleBetween(this.location);
  }

  draw() {
    this.p5.push();

    this.p5.translate(this.location.x, this.location.y);
    this.p5.rotate(-this.rotation);
    this.p5.stroke(2);

    let x = 0;

    while (x <= this.length) {
      this.p5.point(x, this.amplitude * Math.sin((x + this.offset) / 10));
      x += 1;
    }

    this.p5.pop();

    this.offset++;
  }
}
