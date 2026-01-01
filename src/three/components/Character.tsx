import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useAnimations } from '@react-three/drei';
import { useGltf } from '../loaders/useGltf';
import * as THREE from 'three';

interface CharacterProps {
  position: [number, number, number];
  path?: THREE.Vector3[];
  isMoving?: boolean;
  onFinish?: () => void;
}

export const Character: React.FC<CharacterProps> = ({ position, path = [], isMoving = false, onFinish }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const { scene, animations } = useGltf('/models/character.glb');
  const { actions } = useAnimations(animations, groupRef);
  
  // State to track progress along the path
  const [currentPathIndex, setCurrentPathIndex] = useState(0);
  const SPEED = 2.5;
  const CAMERA_LERP_FACTOR = 0.05; // Smooth camera follow

  useEffect(() => {
    // Traverse and enable shadows on all meshes in the GLB
    scene.traverse((o) => {
      if ((o as any).isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });
    
    // Simple manual scale fallback
    // If the auto-scaler is breaking the rig, let's just use a fixed safe scale
    // Try 0.5 first, if it's too big/small we can adjust
    scene.scale.set(0.5, 0.5, 0.5);
    
    // Rotate the model 90 degrees around Y-axis if needed
    scene.rotation.y = Math.PI / 2;
    
  }, [scene]);

  useEffect(() => {
    // Animation logic
    // Log available animations to find the correct names
    console.log('Available animations:', Object.keys(actions));
    
    // Try to find animations even if names are slightly different (case-insensitive)
    const runKey = Object.keys(actions).find(key => key.toLowerCase().includes('run')) || 'Run';
    const idleKey = Object.keys(actions).find(key => key.toLowerCase().includes('idle')) || 'Idle';
    
    const runAction = actions[runKey];
    const idleAction = actions[idleKey];

    if (isMoving) {
      idleAction?.fadeOut(0.2);
      runAction?.reset().fadeIn(0.2).play();
    } else {
      runAction?.fadeOut(0.2);
      idleAction?.reset().fadeIn(0.2).play();
    }

    return () => {
      // Cleanup if needed, though fading handles transitions
    };
  }, [isMoving, actions]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Movement Logic
    if (isMoving && path.length > 0) {
      if (currentPathIndex < path.length) {
        const target = path[currentPathIndex];
        const currentPos = groupRef.current.position;
        
        const direction = new THREE.Vector3().subVectors(target, currentPos);
        const distance = direction.length();
  
        if (distance > 0.1) {
          direction.normalize();
          
          // Move character
          const moveAmount = Math.min(SPEED * delta, distance);
          groupRef.current.position.add(direction.multiplyScalar(moveAmount));
          
          // Face target
          groupRef.current.lookAt(target);
          
          // Camera Follow Logic (Only when moving)
          const characterPos = groupRef.current.position;
          
          // Calculate ideal camera position (behind character)
          const forward = new THREE.Vector3(0, 0, 1);
          forward.applyQuaternion(groupRef.current.quaternion);
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
    <group ref={groupRef} position={position} dispose={null}>
      <primitive object={scene} />
    </group>
  );
};
