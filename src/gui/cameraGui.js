import MinMaxGuiHelper from '@helpers/gui/minMaxGuiHelper';
import makeXYZGui from '@helpers/gui/makeXYZGui';

export const cameraGui = ({ gui, camera }) => {
  camera.fov && gui.add(camera, 'fov', 1, 180).onChange(camera.update);
  const minMaxGuiHelper = new MinMaxGuiHelper(camera, 'near', 'far', 0.1);
  gui
    .add(minMaxGuiHelper, 'min', 0.1, 50, 0.1)
    .name('near')
    .onChange(camera.update);
  gui
    .add(minMaxGuiHelper, 'max', 0.1, 50, 0.1)
    .name('far')
    .onChange(camera.update);

  makeXYZGui(gui, camera.position, 'position', camera.update);
  camera.zoom && gui.add(camera, 'zoom', 0.01, 1, 0.01).listen();
};
