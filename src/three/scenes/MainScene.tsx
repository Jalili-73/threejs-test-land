import React, { useMemo, useState } from 'react';
import { Environment, OrbitControls } from '@react-three/drei';
import { LoadedModel } from '../components/LoadedModel';
import { Character } from '../components/Character';
import { InvisibleTrigger } from '../components/InvisibleTrigger';
import * as THREE from 'three';

export const MainScene: React.FC = () => {
  const [isCharacterMoving, setIsCharacterMoving] = useState(false);
  const [hasFinishedPath, setHasFinishedPath] = useState(false);

  const characterPath = useMemo(() => [
    new THREE.Vector3(-6.061, -1.426 + 0.25, -1.732),
    new THREE.Vector3(-6.076, -1.426 + 0.25, 0.795),
    new THREE.Vector3(-1.974, -1.426 + 0.25, 0.909)
  ], []);

  const handleFinishPath = () => {
    setIsCharacterMoving(false);
    setHasFinishedPath(true);
  };

  return (
    <>
      {/* Lighting Setup */}
      <ambientLight intensity={0.7} />
      <hemisphereLight intensity={0.5} groundColor="#777777" />
      <directionalLight position={[5, 10, 5]} intensity={1.0} castShadow />
      
      {/* Environment Map */}
      <Environment preset="city" />

      {/* Camera Controls */}
      {/* Enable controls if character is NOT moving (i.e., at start OR after finish) */}
      {!isCharacterMoving && (
        <OrbitControls 
          enablePan={true} 
          enableZoom={true} 
          enableRotate={true}
          minDistance={2}
          maxDistance={20}
          target={hasFinishedPath ? [-1.974, -1.426 + 0.25, 0.909] : [0, 0, 0]}
        />
      )}

      {/* 3D Model */}
      <LoadedModel position={[0, 0, 0]} />

      {/* Start Trigger */}
      {!isCharacterMoving && !hasFinishedPath && (
        <InvisibleTrigger 
          position={[-2.153, -1.127, 0.521]} 
          radius={0.8}
          onActivate={() => setIsCharacterMoving(true)}
        />
      )}

      {/* Character */}
      <Character 
        position={[-8.535, -1.426 + 0.25, -1.835]} 
        path={characterPath}
        isMoving={isCharacterMoving}
        onFinish={handleFinishPath}
      />
      
      {/* Post Processing - Temporarily Disabled for Debugging */}
      {/* <EffectComposer>
        <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} intensity={0.5} />
        <Vignette eskil={false} offset={0.1} darkness={0.3} />
      </EffectComposer> */}
    </>
  );
};
