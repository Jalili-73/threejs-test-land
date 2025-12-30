import React from 'react';
import { Html } from '@react-three/drei';

interface InvisibleTriggerProps {
  position: [number, number, number];
  radius?: number;
  onActivate: () => void;
}

export const InvisibleTrigger: React.FC<InvisibleTriggerProps> = ({ 
  position, 
  radius = 1, 
  onActivate 
}) => {
  return (
    <group position={position}>
      <mesh onClick={onActivate} visible={false}>
        <sphereGeometry args={[radius, 16, 16]} />
        <meshBasicMaterial color="yellow" wireframe />
      </mesh>
      
      {/* Visual indicator (optional, remove if strictly invisible) */}
      <Html position={[0, 1.5, 0]} center>
        <div style={{
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '20px',
          fontSize: '14px',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          border: '1px solid rgba(255,255,255,0.2)',
          cursor: 'pointer'
        }}>
          Click to Move
        </div>
      </Html>
      
      {/* Pulsing ring effect for visibility */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
        <ringGeometry args={[radius * 0.8, radius, 32]} />
        <meshBasicMaterial color="#44ff44" transparent opacity={0.3} />
      </mesh>
    </group>
  );
};
