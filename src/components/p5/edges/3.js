// shout-out to https://editor.p5js.org/simontiger/sketches/a94yVnaRn

export default (p5) => {
  let video, edges;

  function edgeDetect() {
    video.loadPixels();
    edges.loadPixels();
    for (let y = 0; y < video.height; y++) {
      for (let x = 0; x < video.width; x++) {
        const rightIdx = (x + y * video.width) * 4;
        const leftIdx = rightIdx - 4;

        const rr = video.pixels[rightIdx + 0];
        const rg = video.pixels[rightIdx + 1];
        const rb = video.pixels[rightIdx + 2];
        const lr = video.pixels[leftIdx + 0];
        const lg = video.pixels[leftIdx + 1];
        const lb = video.pixels[leftIdx + 2];

        let edge = 255 - p5.abs((rr + rg + rb) / 3 - (lr + lg + lb) / 3);

        edges.pixels[rightIdx + 0] = edge;
        edges.pixels[rightIdx + 1] = edge;
        edges.pixels[rightIdx + 2] = edge;
        edges.pixels[rightIdx + 3] = 255;
      }
    }
    edges.updatePixels();
  }

  p5.setup = () => {
    p5.createCanvas(window.innerWidth, window.innerHeight, p5.WEBGL);
    p5.colorMode(p5.HSL);
    p5.rectMode(p5.CENTER);
    p5.noStroke();

    p5.background(360, 0, 0, 1);

    video = p5.createCapture(p5.VIDEO);

    video.size(window.innerWidth / 2, window.innerHeight / 2);
    video.hide();

    edges = p5.createImage(window.innerWidth / 2, window.innerHeight / 2);
  };

  p5.draw = () => {
    p5.background(204);
    edgeDetect();
    // p5.image(video, 0, 0);
    p5.image(edges, -window.innerWidth / 2, -window.innerHeight / 2);
  };
};
