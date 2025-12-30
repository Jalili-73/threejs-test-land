import React, { useState, useEffect, useRef } from 'react';
import '@google/model-viewer';

export const ModelViewer: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const modelViewerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const modelViewer = modelViewerRef.current;
    if (modelViewer) {
      const handleLoad = () => setLoading(false);
      modelViewer.addEventListener('load', handleLoad);
      return () => {
        modelViewer.removeEventListener('load', handleLoad);
      };
    }
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
      {loading && (
        <div style={{
          position: 'absolute',
          zIndex: 10,
          color: 'white',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          letterSpacing: '1px'
        }}>
          Loading Model...
        </div>
      )}
      {/* @ts-ignore */}
      <model-viewer
        ref={modelViewerRef}
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
