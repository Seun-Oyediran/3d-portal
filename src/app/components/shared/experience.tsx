"use client";
import {
  Environment,
  MeshPortalMaterial,
  RoundedBox,
  Sphere,
  useTexture,
  CameraControls,
  useCursor,
} from "@react-three/drei";
import React, { Fragment, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  AnneCharacter,
  BarbarossaCharacter,
  HenryCharacter,
  MakoCharacter,
} from "../models";
import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";

const allCharacters = [
  {
    id: 1,
    name: "Anne",
    texture: "/assets/bg2.jpg",
    character: AnneCharacter,
    positionX: 2.0,
    positionY: 2.0,
    rotationY: -Math.PI / 10,
  },
  {
    id: 2,
    name: "Barbarossa",
    texture: "/assets/bg.jpg",
    character: BarbarossaCharacter,
    positionX: 2.0,
    positionY: -2.0,
    rotationY: -Math.PI / 10,
  },

  {
    id: 3,
    name: "Henry",
    texture: "/assets/bg3.jpg",
    character: HenryCharacter,
    positionX: -2.0,
    positionY: 2.0,
    rotationY: Math.PI / 10,
  },
  {
    id: 4,
    name: "Marko",
    texture: "/assets/bg4.jpg",
    character: MakoCharacter,
    positionX: -2.0,
    positionY: -2.0,
    rotationY: Math.PI / 10,
  },
];

interface ICharacter {
  texture: string;
  character: (props: any) => React.JSX.Element;
  positionX: number;
  positionY: number;
  rotationY: number;
  active: boolean;
  handleClick: () => void;
  // onPointerLeave: ()=> void
  // onPointerEnter: ()=> void
  name: string;
}

const Character = (props: ICharacter) => {
  const {
    character,
    positionX = 0,
    texture,
    positionY = 0,
    rotationY = 0,
    active,
    handleClick,
    name,
    // onPointerEnter,
    // onPointerLeave
  } = props;

  const map = useTexture(texture);
  const portalMaterialRef = useRef<any>();
  const [activeHover, setActiveHover] = useState(false);

  useCursor(activeHover);

  useFrame((_state, delta) => {
    easing.damp(
      portalMaterialRef.current,
      "blend",
      active ? 1 : 0,
      0.25,
      delta
    );
  });

  return (
    <group position-x={positionX} position-y={positionY} rotation-y={rotationY}>
      {/* <TextComponent /> */}
      <RoundedBox
        args={[2, 3, 0.1]}
        onClick={handleClick}
        name={name}
        onPointerEnter={() => {
          setActiveHover(true);
        }}
        onPointerLeave={() => {
          setActiveHover(false);
        }}
      >
        <MeshPortalMaterial side={THREE.DoubleSide} ref={portalMaterialRef}>
          <ambientLight intensity={0.7} />
          <Environment preset="sunset" />
          {character({ "position-y": -1, activeHover })}
          {/* <BarbarossaCharacter position-y={-1} /> */}

          <Sphere args={[5, 64, 64]}>
            <meshStandardMaterial
              map={map}
              attach="material"
              side={THREE.BackSide}
            />
          </Sphere>
        </MeshPortalMaterial>
      </RoundedBox>
    </group>
  );
};

const Experience = () => {
  const scene = useThree((state) => state.scene);
  const [active, setActive] = useState("");
  const cameraRef = useRef<any>();

  useEffect(() => {
    const targetPosition = new THREE.Vector3();
    scene.getObjectByName(active)?.getWorldPosition(targetPosition);

    if (active) {
      cameraRef.current.setLookAt(
        0,
        targetPosition.y === 2 ? 1.5 : -1.5,
        4,
        targetPosition.x,
        targetPosition.y,
        targetPosition.z,
        true
      );
    } else {
      cameraRef.current.setLookAt(0, 0, 10, 0, 0, 0, true);
    }
    // eslint-disable-next-line
  }, [active]);

  return (
    <Fragment>
      <CameraControls
        ref={cameraRef}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 8}
        maxDistance={active ? 5 : undefined}
        minDistance={active ? 1 : undefined}
      />

      {allCharacters.map((item) => (
        <Character
          key={item.id}
          character={item.character}
          texture={item.texture}
          positionX={item.positionX}
          positionY={item.positionY}
          rotationY={item.rotationY}
          active={active === item.name}
          handleClick={() => {
            setActive(item.name === active ? "" : item.name);
          }}
          name={item.name}
          // onPointerEnter={}
          // onPointerLeave={}
        />
      ))}
    </Fragment>
  );
};

export default Experience;
