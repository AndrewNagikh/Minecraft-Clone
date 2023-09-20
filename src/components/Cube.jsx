/* eslint-disable no-useless-return */
/* eslint-disable prefer-template */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
import { React, useState } from 'react';
import { useBox } from '@react-three/cannon';
import * as textures from '../images/textures';
import { useStore } from '../hooks/useStore';

export function Cube({ position, texture }) {
  const [isHovered, setIsHovered] = useState(false);
  const [addCube, removeCube] = useStore((state) => [state.addCube, state.removeCube]);
  const [ref] = useBox(() => ({
    type: 'Static',
    position,
  }));
  const activeTexture = textures[texture + 'Texture'];
  return (
    <mesh
      onPointerMove={(e) => {
        e.stopPropagation();
        setIsHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setIsHovered(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        const clickedFace = Math.floor(e.faceIndex / 2);
        const [x, y, z] = ref.current.position;
        console.log(e)
        if (e.altKey) {
          removeCube(x, y, z);
          return;
        }
        if (clickedFace === 0) {
          addCube(x + 1, y, z);
          return;
        }
        if (clickedFace === 1) {
          addCube(x - 1, y, z);
          return;
        }
        if (clickedFace === 2) {
          addCube(x, y + 1, z);
          return;
        }
        if (clickedFace === 3) {
          addCube(x, y - 1, z);
          return;
        }
        if (clickedFace === 4) {
          addCube(x, y, z + 1);
          return;
        }
        if (clickedFace === 5) {
          addCube(x, y, z - 1);
          return;
        }
      }}
      ref={ref}
    >
      <boxGeometry attach="geometry" />
      <meshStandardMaterial
        color={isHovered ? 'grey' : 'white'}
        map={activeTexture}
        transparent
        opacity={texture === 'glass' ? 0.6 : 1}
        attach="material"
      />
    </mesh>
  );
}
