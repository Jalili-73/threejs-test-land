import React, { useState } from 'react';
import { ModelViewer } from '../../features/modelViewer/ModelViewer';
import { Button } from '../../shared/ui/Button';
import { ThreeCanvas } from '../../three/canvas/ThreeCanvas';

export const HomePage: React.FC = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [opacity, setOpacity] = useState(1);

  const handleStartGame = () => {
    setOpacity(0);
    setTimeout(() => {
      setIsGameStarted(true);
      // Short delay to ensure unmount/mount then fade in
      setTimeout(() => setOpacity(1), 50);
    }, 500);
  };

  if (isGameStarted) {
    return (
      <div style={{ 
        opacity: opacity, 
        transition: 'opacity 0.5s ease-in-out',
        width: '100vw', 
        height: '100dvh' 
      }}>
        <ThreeCanvas />
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100dvh',
      backgroundColor: '#121212',
      backgroundImage: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: opacity,
      transition: 'opacity 0.5s ease-in-out'
    }}>
      <div style={{ flex: 1, width: '100%', position: 'relative' }}>
         <ModelViewer />
         <div style={{
           position: 'absolute',
           bottom: '15%',
           left: '50%',
           transform: 'translateX(-50%)',
           zIndex: 10,
           width: 'max-content'
         }}>
           <Button onClick={handleStartGame}>Start Game</Button>
         </div>
      </div>
    </div>
  );
};
