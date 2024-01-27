import React from "react";

const Lights = () => {
  return (
    <mesh>
      <ambientLight />
      <directionalLight
        position={[-5, 5, 5]}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
    </mesh>
  );
};

export default Lights;
