/* eslint-disable no-return-assign */
/* eslint-disable max-len */
/* eslint-disable react/no-unknown-property */
/* eslint-disable import/prefer-default-export */
import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useSphere } from '@react-three/cannon';
import { Vector3 } from 'three';
import { useKeyBoard } from '../hooks/useKeyboard';

const JUMP_FORCE = 3;
const SPEED = 4;

export function Player() {
  const {
    moveForward, moveBackward, moveRight, moveLeft, jump,
  } = useKeyBoard();
  const { camera } = useThree();
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: 'Dynamic',
    position: [0, 1, 0],
  }));

  const velocity = useRef([0, 0, 0]);
  useEffect(() => {
    api.velocity.subscribe((v) => velocity.current = v);
  }, [api.velocity]);

  const position = useRef([0, 0, 0]);
  useEffect(() => {
    api.position.subscribe((p) => position.current = p);
  }, [api.position]);

  useFrame(() => {
    camera.position.copy(new Vector3(position.current[0], position.current[1], position.current[2]));

    const direction = new Vector3();
    const frontVector = new Vector3(
      0,
      0,
      (moveBackward ? 1 : 0) - (moveForward ? 1 : 0),
    );
    const sideVector = new Vector3(
      (moveRight ? 1 : 0) - (moveLeft ? 1 : 0),
      0,
      0,
    );
    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED).applyEuler(camera.rotation);

    api.velocity.set(direction.x, velocity.current[1], direction.z);

    if (jump && Math.abs(velocity.current[1]) < 0.05) {
      api.velocity.set(velocity.current[0], JUMP_FORCE, velocity.current[2]);
    }
  });

  return (
    <mesh ref={ref} />
  );
}
