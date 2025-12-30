import React from 'react';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { Environment } from '@react-three/drei';
import { LoadedModel } from '../components/LoadedModel';
import { Character } from '../components/Character';

export const MainScene: React.FC = () => {
  return (
    <>
      {/* Lighting Setup */}
      <ambientLight intensity={0.7} />
      <hemisphereLight intensity={0.5} groundColor="#777777" />
      <directionalLight position={[5, 10, 5]} intensity={1.0} castShadow />
      
      {/* Environment Map */}
      <Environment preset="city" />

      {/* 3D Model */}
      <LoadedModel position={[0, 0, 0]} />

      {/* Character */}
      <Character position={[-8.535, -1.426 + 0.25, -1.835]} />
      
      {/* Post Processing - Temporarily Disabled for Debugging */}
      {/* <EffectComposer>
        <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} intensity={0.5} />
        <Vignette eskil={false} offset={0.1} darkness={0.3} />
      </EffectComposer> */}
    </>
  );
};
