import React, { useRef, useMemo } from 'react';
import { Geometry, Vector2, Vector3, Face3, TextureLoader } from '@three';
import { useFrame, useLoader } from 'react-three-fiber';
const textureUrl =
  'https://raw.githubusercontent.com/flowers1225/threejs-earth/master/src/img/earth4.jpg';

const RenderTarget = () => {
  const texture = useLoader(TextureLoader, textureUrl);

  const geometry = useMemo(() => {
    const geometry = new Geometry();

    geometry.vertices.push(
      new Vector3(-1, -1, 1), // 0
      new Vector3(1, -1, 1), // 1
      new Vector3(-1, 1, 1), // 2
      new Vector3(1, 1, 1), // 3
      new Vector3(-1, -1, -1), // 4
      new Vector3(1, -1, -1), // 5
      new Vector3(-1, 1, -1), // 6
      new Vector3(1, 1, -1) // 7)
    );

    /*
       6----7
      /|   /|
     2----3 |
     | |  | |
     | 4--|-5
     |/   |/
     0----1
  */

    geometry.faces.push(
      // front
      new Face3(0, 3, 2),
      new Face3(0, 1, 3),
      // right
      new Face3(1, 7, 3),
      new Face3(1, 5, 7),
      // back
      new Face3(5, 6, 7),
      new Face3(5, 4, 6),
      // left
      new Face3(4, 2, 6),
      new Face3(4, 0, 2),
      // top
      new Face3(2, 7, 6),
      new Face3(2, 3, 7),
      // bottom
      new Face3(4, 1, 0),
      new Face3(4, 5, 1)
    );

    geometry.faceVertexUvs[0].push(
      // front
      [new Vector2(0, 0), new Vector2(1, 1), new Vector2(0, 1)],
      [new Vector2(0, 0), new Vector2(1, 0), new Vector2(1, 1)],
      // right
      [new Vector2(0, 0), new Vector2(1, 1), new Vector2(0, 1)],
      [new Vector2(0, 0), new Vector2(1, 0), new Vector2(1, 1)],
      // back
      [new Vector2(0, 0), new Vector2(1, 1), new Vector2(0, 1)],
      [new Vector2(0, 0), new Vector2(1, 0), new Vector2(1, 1)],
      // left
      [new Vector2(0, 0), new Vector2(1, 1), new Vector2(0, 1)],
      [new Vector2(0, 0), new Vector2(1, 0), new Vector2(1, 1)],
      // top
      [new Vector2(0, 0), new Vector2(1, 1), new Vector2(0, 1)],
      [new Vector2(0, 0), new Vector2(1, 0), new Vector2(1, 1)],
      // bottom
      [new Vector2(0, 0), new Vector2(1, 1), new Vector2(0, 1)],
      [new Vector2(0, 0), new Vector2(1, 0), new Vector2(1, 1)]
    );

    // geometry.faces.forEach((face, ndx) => {
    //   face.vertexColors = [
    //     new Color().setHSL(ndx / 12, 1, 0.5),
    //     new Color().setHSL(ndx / 12 + 0.1, 1, 0.5),
    //     new Color().setHSL(ndx / 12 + 0.2, 1, 0.5),
    //   ];
    // });

    geometry.computeFaceNormals();
    // geometry.computeVertexNormals();

    return geometry;
  }, []);

  function makeCube(geometry, color, x) {
    const ref = useRef();
    const material = (
      <meshPhongMaterial attach='material' color={color} map={texture} />
    );
    // <meshBasicMaterial attach='material' vertexColors={VertexColors} />
    return {
      obj: (
        <mesh ref={ref} key={`${x}-${color}`} position-x={x}>
          {material}
          <primitive attach='geometry' object={geometry} />
        </mesh>
      ),
      ref: ref,
    };
  }

  const cubes = [
    makeCube(geometry, 0x44aa88, 0),
    makeCube(geometry, 0x8844aa, -4),
    makeCube(geometry, 0xaa8844, 4),
  ];

  useFrame(() => {
    cubes.forEach(({ ref }) => {
      const speed = 0.01;
      ref.current.rotation.x += speed;
      ref.current.rotation.y += speed;
    });
  });

  return <group>{cubes.map(({ obj }) => obj)}</group>;
};

export default RenderTarget;
