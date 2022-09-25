/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { React, useEffect, useState } from 'react';
import { useStore } from '../hooks/useStore';
import { useKeyBoard } from '../hooks/useKeyboard';
import {
  dirtImg, grassImg, glassImg, logImg, woodImg,
} from '../images/images';

const images = {
  dirt: dirtImg,
  grass: grassImg,
  glass: glassImg,
  wood: woodImg,
  log: logImg,
};

export function TextureSelector() {
  const [visible, setVisible] = useState(false);
  const [activeTexture, setTexture] = useStore((state) => [state.texture, state.setTexture]);
  const {
    dirt,
    grass,
    glass,
    wood,
    log,
  } = useKeyBoard();

  useEffect(() => {
    const textures = {
      dirt,
      grass,
      glass,
      wood,
      log,
    };
    const pressedTexture = Object.entries(textures).find(([k, v]) => v);
    if (pressedTexture) {
      setTexture(pressedTexture[0]);
    }
  }, [setTexture, dirt, grass, glass, wood, log]);

  useEffect(() => {
    const visibilityTimeout = setTimeout(() => {
      setVisible(false);
    }, 1000);
    setVisible(true);
    return () => {
      clearTimeout(visibilityTimeout);
    };
  }, [activeTexture]);

  return visible && (
  <div className="absolute centered texture-selector">
    {Object.entries(images).map(([k, src]) => (
      <img
        key={k}
        src={src}
        alt={k}
        className={`${k === activeTexture ? 'active' : ''}`}
      />
    ))}
  </div>
  );
}
