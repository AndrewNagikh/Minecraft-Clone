/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import { useStore } from '../hooks/useStore';

export function Menu() {
  const [saveWorld, resetWorld] = useStore((state) => [state.saveWorld, state.resetWorld]);

  return (
    <div className="menu absolute">
      <button
        onClick={() => resetWorld()}
      >
        Reset
      </button>
    </div>
  );
}
