import React, { useRef, useMemo } from 'react';
import { useFrame } from 'react-three-fiber';
import { Vector3, CatmullRomCurve3, Color } from '@three';

const Bark = ({
  x: startX,
  y: startY,
  z: startZ,
  height,
  detail = 1000,
  displacement = 4,
  dampness = 0.05,
  period = 0.2,
  noiseGen,
}) => {
  const mesh = useRef();

  const [positions, colors] = useMemo(() => {
    let positions = [];
    let colors = [];

    let x = startX,
      y = startY,
      z = startZ;

    let curvePositions = [new Vector3(x, y, z)];

    while (y < height) {
      y += 0.1;

      const v = noiseGen.gen(x * period, y * period, z * period);
      const a =
        v * 2 * Math.PI + Math.PI / Math.ceil(Math.random() * displacement);

      x += Math.cos(a) * dampness;
      z += Math.sin(a) * dampness;

      curvePositions.push(new Vector3(x, y, z));
    }

    const positionVectors = new CatmullRomCurve3(curvePositions).getPoints(
      detail
    );

    positionVectors.forEach(({ x, y, z }) => {
      positions.push(x, y, z);
      colors.push(new Color(0xff0000));
    });

    return [new Float32Array(positions), new Float32Array(colors)];
  }, []);

  return (
    <line ref={mesh}>
      <bufferGeometry attach='geometry'>
        <bufferAttribute
          attachObject={['attributes', 'position']}
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attachObject={['attributes', 'color']}
          count={colors.length}
          array={colors}
          itemSize={1}
        />
      </bufferGeometry>
      <lineBasicMaterial
        attach='material'
        size={10}
        sizeAttentuation={false}
        vertexColors
      />
    </line>
  );
};

export default Bark;
