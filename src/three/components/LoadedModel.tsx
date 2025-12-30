import React, { useEffect } from 'react';
import { useGltf } from '../loaders/useGltf';
import * as THREE from 'three';

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

  useEffect(() => {
    // Center the model geometry
    const box = new THREE.Box3().setFromObject(gltf.scene);
    const center = box.getCenter(new THREE.Vector3());
    
    gltf.scene.position.x += (gltf.scene.position.x - center.x);
    gltf.scene.position.y += (gltf.scene.position.y - center.y);
    gltf.scene.position.z += (gltf.scene.position.z - center.z);

    gltf.scene.traverse((o) => {
      if (!((o as any).isMesh)) return;
      const mesh = o as THREE.Mesh;
  
      // Enable shadows
      mesh.castShadow = true;
      mesh.receiveShadow = true;
  
      const m = mesh.material as THREE.MeshStandardMaterial;
      if (!m) return;
  
      // If model uses vertex colors, this MUST be enabled
      if ("vertexColors" in m) m.vertexColors = true;
  
      // Force a light-reactive material if it’s unlit/basic
      // (some exporters set MeshBasicMaterial or unlit extensions)
      const isUnlit = (m.type === "MeshBasicMaterial") || (m.userData && m.userData.gltfExtensions?.KHR_materials_unlit);
      if (isUnlit) { 
        mesh.material = new THREE.MeshStandardMaterial({ 
          color: m.color ?? new THREE.Color("white"), 
          map: m.map ?? null, 
          vertexColors: true,
          roughness: 1,
          metalness: 0,
        }); 
      } else { 
        // For non-PBR stylized, ensure roughness/metalness are correct
        m.roughness = 1;
        m.metalness = 0;
        
        // Remove emissive boost that was causing whiteout
        if ("emissive" in m) { 
          m.emissiveIntensity = 0; 
        } 
        
        m.needsUpdate = true; 
      }
    });
  }, [gltf]);

  return (
    <primitive 
      object={gltf.scene} 
      position={position} 
      scale={scale} 
      onClick={(e: any) => {
        e.stopPropagation();
        const { x, y, z } = e.point;
        console.log(`%c Clicked Position: [${x.toFixed(3)}, ${y.toFixed(3)}, ${z.toFixed(3)}]`, 'background: #222; color: #bada55; padding: 4px; border-radius: 2px');
      }}
    />
  );
};
