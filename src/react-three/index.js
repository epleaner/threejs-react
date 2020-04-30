import ReactDOM from "react-dom";
import React from "react";

import BaseCanvas from "Canvas/Base";
import BasicScene from "Scene/Basic";

ReactDOM.render(
  <BaseCanvas>
    <BasicScene />
  </BaseCanvas>,
  document.getElementById("root")
);
