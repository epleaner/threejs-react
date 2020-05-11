import ColorGUIHelper from '@helpers/gui/colorHelper';
import DegRadHelper from '@helpers/gui/degRadHelper';
import makeXYZGui from '@helpers/gui/makeXYZGui';

export const spotLightGui = ({ gui, light }) => {
  const folder = gui.addFolder('spot light');

  folder.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');

  folder.add(light, 'decay', 0, 4, 0.01);
  folder.add(light, 'power', 0, 2000);
  folder
    .add(new DegRadHelper(light, 'angle'), 'value', 0, 90)
    .name('angle')
    .onChange(light.update);
  folder.add(light, 'penumbra', 0, 1, 0.01);
  makeXYZGui(folder, light.position, 'position', light.update);
  makeXYZGui(folder, light.target.position, 'target', light.update);
  folder.open();
};

export const ambientLightGui = ({ gui, light }) => {
  gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
  gui.add(light, 'intensity', 0, 2, 0.01);
};

export const hemisphereLightGui = ({ gui, light }) => {
  const folder = gui.addFolder('hemisphere light');

  folder.addColor(new ColorGUIHelper(light, 'color'), 'value').name('skyColor');
  folder
    .addColor(new ColorGUIHelper(light, 'groundColor'), 'value')
    .name('groundColor');
  folder.add(light, 'intensity', 0, 2, 0.01);
  folder.open();
};

export const directionalLightGui = ({ gui, light }) => {
  gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
  gui.add(light, 'intensity', 0, 2, 0.01);

  makeXYZGui(gui, light.position, 'position', light.update);
  makeXYZGui(gui, light.target.position, 'target', light.update);
};

export const pointLightGui = ({ gui, light }) => {
  const folder = gui.addFolder('point light');
  folder.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
  folder.add(light, 'decay', 0, 4, 0.01);
  folder.add(light, 'power', 0, 8000);

  makeXYZGui(folder, light.position, 'position', light.update);
  folder.open();
};

export const rectAreaLightGui = ({ gui, light }) => {
  gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
  gui.add(light, 'intensity', 0, 10, 0.01);
  gui.add(light, 'width', 0, 20).onChange(light.update);
  gui.add(light, 'height', 0, 20).onChange(light.update);
  gui
    .add(new DegRadHelper(light.rotation, 'x'), 'value', -180, 180)
    .name('x rotation')
    .onChange(light.update);
  gui
    .add(new DegRadHelper(light.rotation, 'y'), 'value', -180, 180)
    .name('y rotation')
    .onChange(light.update);
  gui
    .add(new DegRadHelper(light.rotation, 'z'), 'value', -180, 180)
    .name('z rotation')
    .onChange(light.update);

  makeXYZGui(gui, light.position, 'position', light.update);
};
