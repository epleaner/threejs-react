import ColorGUIHelper from '@helpers/gui/colorHelper';
import DegRadHelper from '@helpers/gui/degRadHelper';
import makeXYZGui from '@helpers/gui/makeXYZGui';

export const spotLightGui = ({ gui, light }) => {
  gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');

  gui.add(light, 'decay', 0, 4, 0.01);
  gui.add(light, 'power', 0, 2000);
  gui
    .add(new DegRadHelper(light, 'angle'), 'value', 0, 90)
    .name('angle')
    .onChange(light.update);
  gui.add(light, 'penumbra', 0, 1, 0.01);
  makeXYZGui(gui, light.position, 'position', light.update);
  makeXYZGui(gui, light.target.position, 'target', light.update);
};

export const ambientLightGui = ({ gui, light }) => {
  gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
  gui.add(light, 'intensity', 0, 2, 0.01);
};

export const hemisphereLightGui = ({ gui, light }) => {
  gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('skyColor');
  gui
    .addColor(new ColorGUIHelper(light, 'groundColor'), 'value')
    .name('groundColor');
  gui.add(light, 'intensity', 0, 2, 0.01);
};

export const directionalLightGui = ({ gui, light }) => {
  gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
  gui.add(light, 'intensity', 0, 2, 0.01);

  makeXYZGui(gui, light.position, 'position', light.update);
  makeXYZGui(gui, light.target.position, 'target', light.update);
};

export const pointLightGui = ({ gui, light }) => {
  gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
  gui.add(light, 'decay', 0, 4, 0.01);
  gui.add(light, 'power', 0, 2000);

  makeXYZGui(gui, light.position, 'position', light.update);
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
