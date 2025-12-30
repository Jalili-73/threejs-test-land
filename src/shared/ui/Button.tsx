import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, style, ...props }) => {
  return (
    <button
      style={{
        padding: '12px 24px',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        backgroundColor: '#ff0055',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        boxShadow: '0 4px 15px rgba(255, 0, 85, 0.4)',
        transition: 'transform 0.1s, box-shadow 0.1s',
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 0, 85, 0.6)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 0, 85, 0.4)';
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'scale(0.95)';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
      }}
      {...props}
    >
      {children}
    </button>
  );
};
