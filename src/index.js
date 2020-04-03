import ReactDOM from "react-dom";
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "react-three-fiber";

import Cube from "Mesh/Cube";

ReactDOM.render(
  <Canvas>
    <ambientLight />
    <pointLight position={[10, 10, 10]} />
    <Cube position={[-1.2, 0, 0]} />
    <Cube position={[1.2, 0, 0]} />
  </Canvas>,
  document.getElementById("root")
);
