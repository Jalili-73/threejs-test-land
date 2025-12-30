import React from 'react';
import { ModelViewer } from '../../features/modelViewer/ModelViewer';
import { Button } from '../../shared/ui/Button';

export const HomePage: React.FC = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: '#121212',
      backgroundImage: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ flex: 1, width: '100%', position: 'relative' }}>
         <ModelViewer />
         <div style={{
           position: 'absolute',
           bottom: '40px',
           left: '50%',
           transform: 'translateX(-50%)',
           zIndex: 10,
           width: 'max-content'
         }}>
           <Button onClick={() => console.log('Start Game')}>Start Game</Button>
         </div>
      </div>
    </div>
  );
};
