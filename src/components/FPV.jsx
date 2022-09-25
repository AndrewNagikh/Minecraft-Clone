import React from 'react';
import { PointerLockControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

/* eslint-disable import/prefer-default-export */
export function FPV() {
  const { camera, gl } = useThree();
  return (<PointerLockControls args={[camera, gl.domElement]} />);
}
