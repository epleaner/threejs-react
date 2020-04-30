import React, { useRef, useState } from "react";
import Extrusion from "Mesh/Extrusion";

export default props => (
  <Extrusion
    start={[2.5, 2.5]}
    paths={[
      [2.5, 2.5, 2, 0, 0, 0],
      [-3, 0, -3, 3.5, -3, 3.5],
      [-3, 5.5, -1, 7.7, 2.5, 9.5],
      [6, 7.7, 8, 5.5, 8, 3.5],
      [8, 3.5, 8, 0, 5, 0],
      [3.5, 0, 2.5, 2.5, 2.5, 2.5]
    ]}
    bevelEnabled
    bevelThickness={2}
    bevelSegments={2}
    depth={1}
    {...props}
  />
);
