import React, { useRef } from "react";
import { useThree } from "react-three-fiber";

export default props => {
  // const ref = useRef();
  // const { setDefaultCamera } = useThree();
  //
  // // Make the camera known to the system
  // useEffect(() => void setDefaultCamera(ref.current), []);
  //
  // // Update it every frame
  // useFrame(() => ref.current.updateMatrixWorld());

  return (
    <perspectiveCamera
      position-z={2}
      fov={75}
      aspect={2}
      near={0.1}
      far={5}
      {...props}
    />
  );
};
