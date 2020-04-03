import ReactDOM from "react-dom";
import React from "react";

import BaseScene from "Scene/Base";
import Cube from "Mesh/Cube";

ReactDOM.render(
  <BaseScene>
    <Cube position={[-1.2, 0, 0]} />
    <Cube position={[1.2, 0, 0]} />
  </BaseScene>,
  document.getElementById("root")
);
