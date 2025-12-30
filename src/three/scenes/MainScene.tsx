import React from 'react';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { LoadedModel } from '../components/LoadedModel';

export const MainScene: React.FC = () => {
  return (
    <>
      {/* Lighting Setup */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
      <hemisphereLight args={['#b1e1ff', '#000000', 0.5]} />
      
      {/* 3D Model */}
      <LoadedModel position={[-1.1, 0.0, 0.950]} />
      
      {/* Post Processing */}
      <EffectComposer>
        <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} intensity={0.5} />
        <Vignette eskil={false} offset={0.1} darkness={0.5} />
      </EffectComposer>
    </>
  );
};
