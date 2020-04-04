import ReactDOM from "react-dom";
import React from "react";

import BaseCanvas from "Canvas/Base";
import Cube from "Mesh/Cube";

ReactDOM.render(
  <BaseCanvas>
    <Cube position={[-1.2, 0, 0]} />
    <Cube position={[1.2, 0, 0]} />
  </BaseCanvas>,
  document.getElementById("root")
);
