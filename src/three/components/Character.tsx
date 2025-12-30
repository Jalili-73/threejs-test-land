import React from 'react';

interface CharacterProps {
  position: [number, number, number];
}

export const Character: React.FC<CharacterProps> = ({ position }) => {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color="#ff4444" />
    </mesh>
  );
};
