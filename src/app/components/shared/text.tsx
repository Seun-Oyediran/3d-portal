import { Text } from "@react-three/drei";
import React from "react";

const Text3D = () => {
  return (
    <Text
      font="/fonts/Unbounded-Regular.ttf"
      fontSize={0.5}
      anchorY="bottom"
      position={[0, -1, 0.051]}
    >
      Hey there
      <meshBasicMaterial color="red" toneMapped={false} />
    </Text>
  );
};

export default Text3D;
