class FogGuiHelper {
  constructor(fog, backgroundColor) {
    this.fog = fog;
    this.backgroundColor = backgroundColor;
  }
  get near() {
    return this.fog.near;
  }
  set near(v) {
    this.fog.near = v;
    this.fog.far = Math.max(this.fog.far, v);
  }
  get far() {
    return this.fog.far;
  }
  set far(v) {
    this.fog.far = v;
    this.fog.near = Math.min(this.fog.near, v);
  }
  get color() {
    return `#${this.fog.color.getHexString()}`;
  }
  set color(hexString) {
    this.fog.color.set(hexString);
    this.backgroundColor.set(hexString);
  }
}

export const fogGui = ({ gui, scene }) => {
  const folder = gui.addFolder('fog');

  const fogGuiHelper = new FogGuiHelper(scene.fog, scene.background);
  folder.add(fogGuiHelper, 'near', scene.fog.near, scene.fog.far).listen();
  folder.add(fogGuiHelper, 'far', scene.fog.near, scene.fog.far).listen();
  gui.addColor(fogGuiHelper, 'color');

  folder.open();
};
