import React, { useRef, useMemo, useEffect, useCallback } from 'react';
import {
  WebGLRenderTarget,
  Scene,
  PerspectiveCamera,
  DirectionalLight,
  Color,
  BoxGeometry,
  MeshPhongMaterial,
  Mesh,
} from '@three';
import { useFrame } from 'react-three-fiber';

const RenderTarget = () => {
  const cube = useRef();

  const rtWidth = 512;
  const rtHeight = 512;

  const renderTarget = useMemo(
    () => new WebGLRenderTarget(rtWidth, rtHeight),
    []
  );

  const rtScene = new Scene();
  rtScene.background = new Color('red');

  const rtFov = 75;
  const rtAspect = rtWidth / rtHeight;
  const rtNear = 0.1;
  const rtFar = 5;
  const rtCamera = new PerspectiveCamera(rtFov, rtAspect, rtNear, rtFar);
  rtCamera.position.z = 2;

  const rtLight = new DirectionalLight(0xffffff, 1);
  rtLight.position.set(-1, 2, 4);
  rtScene.add(rtLight);

  function makeInstance(color, x) {
    const cube = new Mesh(
      new BoxGeometry(1, 1, 1),
      new MeshPhongMaterial({ color })
    );
    rtScene.add(cube);

    cube.position.x = x;

    return cube;
  }

  const rtCubes = [
    makeInstance(0x44aa88, 0),
    makeInstance(0x8844aa, -2),
    makeInstance(0xaa8844, 2),
  ];

  useFrame(() => {
    cube.current.rotation.x += 0.01;
    cube.current.rotation.y += 0.01;
  });

  useFrame(() =>
    rtCubes.forEach((cube) => {
      const speed = 0.01;
      cube.rotation.x += speed;
      cube.rotation.y += speed;
    })
  );

  useFrame(({ gl }) => {
    gl.setRenderTarget(renderTarget);
    gl.render(rtScene, rtCamera);
    gl.setRenderTarget(null);
  });

  return (
    <>
      <directionalLight position={[-1, 2, 4]} intensity={1} color={0xffffff} />
      <mesh ref={cube}>
        <boxGeometry attach='geometry' args={[1, 1, 1]} />
        <meshPhongMaterial
          attach='material'
          args={[{ map: renderTarget.texture }]}
        />
      </mesh>
    </>
  );
};

export default RenderTarget;
