import React, { useRef, useMemo } from 'react';
import { useThree, useLoader, useFrame } from 'react-three-fiber';
import {
  Vector3,
  Object3D,
  TextureLoader,
  BufferGeometry,
  BufferAttribute,
  DynamicDrawUsage,
  MeshPhongMaterial,
  DoubleSide,
  Mesh,
} from '@three';

import lerp from 'lerp';

const textureUrl =
  'https://raw.githubusercontent.com/flowers1225/threejs-earth/master/src/img/earth4.jpg';

export default () => {
  const ref = useRef();
  const texture = useLoader(TextureLoader, textureUrl);

  const makeSpherePositions = (segmentsAround, segmentsDown) => {
    const numVertices = segmentsAround * segmentsDown * 6;

    const numComponents = 3;
    const positions = new Float32Array(numVertices * numComponents);
    const indices = [];

    const longHelper = new Object3D();
    const latHelper = new Object3D();
    const pointHelper = new Object3D();

    longHelper.add(latHelper);
    latHelper.add(pointHelper);
    pointHelper.position.z = 1;

    const temp = new Vector3();

    const getPoint = (lat, long) => {
      latHelper.rotation.x = lat;
      longHelper.rotation.y = long;
      longHelper.updateMatrixWorld(true);

      return pointHelper.getWorldPosition(temp).toArray();
    };

    let posNdx = 0;
    let ndx = 0;

    for (let down = 0; down < segmentsDown; ++down) {
      const v0 = down / segmentsDown;
      const v1 = (down + 1) / segmentsDown;
      const lat0 = (v0 - 0.5) * Math.PI;
      const lat1 = (v1 - 0.5) * Math.PI;

      for (let across = 0; across < segmentsAround; ++across) {
        const u0 = across / segmentsAround;
        const u1 = (across + 1) / segmentsAround;
        const long0 = u0 * Math.PI * 2;
        const long1 = u1 * Math.PI * 2;

        positions.set(getPoint(lat0, long0), posNdx);
        posNdx += numComponents;
        positions.set(getPoint(lat1, long0), posNdx);
        posNdx += numComponents;
        positions.set(getPoint(lat0, long1), posNdx);
        posNdx += numComponents;
        positions.set(getPoint(lat1, long1), posNdx);
        posNdx += numComponents;

        indices.push(ndx, ndx + 1, ndx + 2, ndx + 2, ndx + 1, ndx + 3);
        ndx += 4;
      }
    }
    return { positions, indices };
  };

  const segmentsAround = 24;
  const segmentsDown = 16;

  const [geometry, positions, normals, positionAttribute] = useMemo(() => {
    const { positions, indices } = makeSpherePositions(
      segmentsAround,
      segmentsDown
    );

    const normals = positions.slice();

    const geometry = new BufferGeometry();
    const positionNumComponents = 3;
    const normalNumComponents = 3;

    const positionAttribute = new BufferAttribute(
      positions,
      positionNumComponents
    );
    positionAttribute.setUsage(DynamicDrawUsage);
    geometry.setAttribute('position', positionAttribute);
    geometry.setAttribute(
      'normal',
      new BufferAttribute(normals, normalNumComponents)
    );
    geometry.setIndex(indices);

    return [geometry, positions, normals, positionAttribute];
  }, []);

  useFrame(() => {
    const time = Date.now() * 0.002;
    const temp = new Vector3();

    for (let i = 0; i < positions.length; i += 3) {
      const quad = (i / 12) | 0;
      const ringId = (quad / segmentsAround) | 0;
      const ringQuadId = quad % segmentsAround;
      const ringU = ringQuadId / segmentsAround;
      const angle = ringU * Math.PI * 2;
      temp.fromArray(normals, i);
      temp.multiplyScalar(
        lerp(1, 1.4, Math.sin(time + ringId + angle) * 0.5 + 0.5)
      );
      temp.toArray(positions, i);
    }
    positionAttribute.needsUpdate = true;

    ref.current.rotation.y += 0.001;
  });

  return (
    <mesh ref={ref} geometry={geometry}>
      <meshPhongMaterial
        attach='material'
        color={0x000000}
        side={DoubleSide}
        shininess={40}
      />
    </mesh>
  );
};
