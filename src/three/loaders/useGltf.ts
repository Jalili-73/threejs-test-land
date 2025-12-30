import { useGLTF } from '@react-three/drei';
import type { GLTF } from 'three-stdlib';

export const useGltf = (path: string): GLTF => {
  const gltf = useGLTF(path);
  return gltf;
};

// Preload the model
useGltf.preload = (path: string) => useGLTF.preload(path);
