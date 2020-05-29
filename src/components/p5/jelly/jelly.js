export default class Jelly {
  offset = 0;
  length = 50;
  rotation = 0;
  topSpeed = 5;
  p5;
  location;
  velocity;
  acceleration;

  constructor(p5) {
    this.p5 = p5;
    this.location = p5.createVector(0, 0);
    this.velocity = p5.createVector(0, 0);
    this.acceleration = p5.createVector(-0.001, 0.1);
  }

  init() {}

  update() {
    const mouseV = this.p5.createVector(this.p5.mouseX, this.p5.mouseY);
    mouseV.sub(this.location);
    mouseV.normalize();
    mouseV.mult(0.5);
    this.velocity.add(mouseV);
    this.velocity.limit(this.topSpeed);
    this.location.add(this.velocity);
    this.p5.translate(this.location.x, this.location.y);
    // this.p5.rotate(Math.PI * this.rotation);
  }

  draw() {
    this.p5.noFill();
    this.p5.stroke(0);

    let len = 0;
    while (len < this.length) {
      this.p5.point(len, 5 * Math.sin((len + this.offset) / 10));
      len += 0.01;
    }

    this.offset++;
  }
}
