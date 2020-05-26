import React, { useRef, useMemo } from 'react';
import { useFrame } from 'react-three-fiber';
import { Vector3, CatmullRomCurve3, Color } from '@three';

const Bark = ({
  x: startX,
  y: startY,
  z: startZ,
  amplitude = 1,
  period = 1,
  noisePeriod = 1,
  height,
  detail = 1000,
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
      y++;

      const v = noiseGen.gen(x * noisePeriod, y * noisePeriod, z * noisePeriod);
      const a = v * 2 * Math.PI;

      x += amplitude * Math.sin(period * a);
      z += amplitude * Math.cos(period * a);

      curvePositions.push(new Vector3(x, y, z));
    }

    const positionVectors = new CatmullRomCurve3(curvePositions).getPoints(
      detail
    );

    positionVectors.forEach(({ x, y, z }) => {
      positions.push(x, y, z);
      colors.push(new Color(0xff0000));
      colors.push(new Color(0xff0000));
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
          itemSize={3}
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
