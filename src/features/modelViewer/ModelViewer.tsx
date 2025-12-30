import React from 'react';
import '@google/model-viewer';

export const ModelViewer: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {/* @ts-ignore */}
      <model-viewer
        src="/models/model1.glb"
        alt="A 3D model"
        camera-controls
        auto-rotate
        shadow-intensity="1"
        style={{ width: '100%', height: '100%' }}
      >
      {/* @ts-ignore */}
      </model-viewer>
    </div>
  );
};
