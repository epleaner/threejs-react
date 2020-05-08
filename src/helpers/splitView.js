import setScissorForElement from '@helpers/setScissorForElement';

export default ({ renderer, scene, camera1, camera2 }) => {
  const canvas = document.querySelector('#c');
  const view1Elem = document.querySelector('#view1');
  const view2Elem = document.querySelector('#view2');

  renderer.setScissorTest(true);

  const aspect1 = setScissorForElement(renderer, canvas, view1Elem);

  // adjust the camera for this aspect
  camera1.aspect = aspect1;
  camera1.left = -aspect1;
  camera1.right = aspect1;

  camera1.update = () => {};
  camera1.updateProjectionMatrix();
  camera1.helper.update();

  // don't draw the camera1 helper in the original view
  camera1.helper.visible = false;

  scene.background.set(0x000000);

  // render
  renderer.render(scene, camera1);

  const aspect2 = setScissorForElement(renderer, canvas, view2Elem);

  // adjust the camera for this aspect
  camera2.aspect = aspect2;
  camera2.updateProjectionMatrix();

  // draw the camera helper in the 2nd view
  camera1.helper.visible = true;

  scene.background.set(0x000040);

  renderer.render(scene, camera2);
};
