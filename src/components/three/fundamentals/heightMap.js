import React, { useRef, useMemo } from 'react';
import {
  Mesh,
  MeshPhongMaterial,
  Geometry,
  Vector2,
  Vector3,
  Face3,
  ImageLoader,
  TextureLoader,
} from '@three';
import { useThree, useLoader } from 'react-three-fiber';
const textureUrl =
  'https://raw.githubusercontent.com/flowers1225/threejs-earth/master/src/img/earth4.jpg';
const imageUrl =
  'https://threejsfundamentals.org/threejs/resources/images/heightmap-96x64.png';

export default () => {
  const { scene } = useThree();

  const texture = useLoader(TextureLoader, textureUrl);

  const imgLoader = new ImageLoader();
  imgLoader.load(imageUrl, (image) => {
    const ctx = document.createElement('canvas').getContext('2d');

    const { width, height } = image;
    ctx.canvas.width = width;
    ctx.canvas.height = height;

    ctx.drawImage(image, 0, 0);
    const { data } = ctx.getImageData(0, 0, width, height);

    const geometry = new Geometry();

    const cellsAcross = width - 1;
    const cellsDeep = height - 1;

    for (let z = 0; z < cellsDeep; ++z) {
      for (let x = 0; x < cellsAcross; ++x) {
        // compute row offsets into the height data
        // we multiply by 4 because the data is R,G,B,A but we
        // only care about R
        const base0 = (z * width + x) * 4;
        const base1 = base0 + width * 4;

        // look up the height for the four points
        // around this cell
        const h00 = data[base0] / 32;
        const h01 = data[base0 + 4] / 32;
        const h10 = data[base1] / 32;
        const h11 = data[base1 + 4] / 32;
        // compute the average height
        const hm = (h00 + h01 + h10 + h11) / 4;

        // the corner positions
        const x0 = x;
        const x1 = x + 1;
        const z0 = z;
        const z1 = z + 1;

        // remember the first index of these 5 vertices
        const ndx = geometry.vertices.length;

        // add the 4 corners for this cell and the midpoint
        geometry.vertices.push(
          new Vector3(x0, h00, z0),
          new Vector3(x1, h01, z0),
          new Vector3(x0, h10, z1),
          new Vector3(x1, h11, z1),
          new Vector3((x0 + x1) / 2, hm, (z0 + z1) / 2)
        );

        // create 4 triangles
        geometry.faces.push(
          new Face3(ndx + 0, ndx + 4, ndx + 1),
          new Face3(ndx + 1, ndx + 4, ndx + 3),
          new Face3(ndx + 3, ndx + 4, ndx + 2),
          new Face3(ndx + 2, ndx + 4, ndx + 0)
        );

        // add the texture coordinates for each vertex of each face
        const u0 = x / cellsAcross;
        const v0 = z / cellsDeep;
        const u1 = (x + 1) / cellsAcross;
        const v1 = (z + 1) / cellsDeep;
        const um = (u0 + u1) / 2;
        const vm = (v0 + v1) / 2;

        geometry.faceVertexUvs[0].push(
          [new Vector2(u0, v0), new Vector2(um, vm), new Vector2(u1, v0)],
          [new Vector2(u1, v0), new Vector2(um, vm), new Vector2(u1, v1)],
          [new Vector2(u1, v1), new Vector2(um, vm), new Vector2(u0, v1)],
          [new Vector2(u0, v1), new Vector2(um, vm), new Vector2(u0, v0)]
        );
      }
    }

    geometry.computeFaceNormals();

    // center the geo
    geometry.translate(width / -2, 0, height / -2);

    const material = new MeshPhongMaterial({
      color: 'green',
      map: texture,
    });

    const cube = new Mesh(geometry, material);

    scene.add(cube);
  });

  return null;
};
