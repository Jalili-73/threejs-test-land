import React, { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CharacterProps {
  position: [number, number, number];
  path?: THREE.Vector3[];
  isMoving?: boolean;
  onFinish?: () => void;
}

export const Character: React.FC<CharacterProps> = ({ position, path = [], isMoving = false, onFinish }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();
  
  // State to track progress along the path
  const [currentPathIndex, setCurrentPathIndex] = useState(0);
  const SPEED = 2.5;
  const CAMERA_LERP_FACTOR = 0.05; // Smooth camera follow

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    // Movement Logic
    if (isMoving && path.length > 0) {
      if (currentPathIndex < path.length) {
        const target = path[currentPathIndex];
        const currentPos = meshRef.current.position;
        
        const direction = new THREE.Vector3().subVectors(target, currentPos);
        const distance = direction.length();
  
        if (distance > 0.1) {
          direction.normalize();
          
          // Move character
          const moveAmount = Math.min(SPEED * delta, distance);
          meshRef.current.position.add(direction.multiplyScalar(moveAmount));
          
          // Face target
          meshRef.current.lookAt(target);
          
          // Camera Follow Logic (Only when moving)
          const characterPos = meshRef.current.position;
          
          // Calculate ideal camera position (behind character)
          const forward = new THREE.Vector3(0, 0, 1);
          forward.applyQuaternion(meshRef.current.quaternion);
          forward.normalize();
          
          // Place camera behind: Position - (Forward * Distance) + Height
          const idealOffset = forward.clone().multiplyScalar(-5).add(new THREE.Vector3(0, 3, 0));
          const idealCameraPos = characterPos.clone().add(idealOffset);
  
          // Smoothly interpolate camera position
          camera.position.lerp(idealCameraPos, CAMERA_LERP_FACTOR);
          
          // Smoothly look at the character
          const lookAtTarget = characterPos.clone().add(new THREE.Vector3(0, 1, 0)); 
          camera.lookAt(lookAtTarget);
        } else {
          // Reached waypoint, move to next
          setCurrentPathIndex(prev => prev + 1);
        }
      } else {
        // Path finished
        if (onFinish) onFinish();
      }
    }
  });

  return (
    <mesh ref={meshRef} position={position} castShadow receiveShadow>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color="#ff4444" />
    </mesh>
  );
};
