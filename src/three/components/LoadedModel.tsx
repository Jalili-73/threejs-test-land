import React from 'react';
import { useGltf } from '../loaders/useGltf';

interface LoadedModelProps {
  path?: string;
  position?: [number, number, number];
  scale?: [number, number, number];
}

export const LoadedModel: React.FC<LoadedModelProps> = ({ 
  path = '/models/land.glb',
  position = [0, 0, 0],
  scale = [1, 1, 1]
}) => {
  const gltf = useGltf(path);

  return (
    <primitive 
      object={gltf.scene} 
      position={position} 
      scale={scale} 
    />
  );
};
