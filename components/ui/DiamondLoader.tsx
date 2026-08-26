'use client';

import React from 'react';

export const DiamondLoader: React.FC = () => {
  return (
    <div className="diamond-loader-wrapper">
      <div className="diamond"></div>
      
      <style jsx>{`
        .diamond-loader-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          min-height: 200px;
        }

        .diamond {
          width: 24px;
          height: 24px;
          border: 1px solid var(--text-main, #333);
          transform: rotate(45deg);
          animation: diamond-pulse 1.8s infinite ease-in-out;
          position: relative;
        }

        .diamond::after {
          content: '';
          position: absolute;
          top: 4px;
          left: 4px;
          right: 4px;
          bottom: 4px;
          border: 1px solid rgba(0, 0, 0, 0.2);
          animation: diamond-pulse-inner 1.8s infinite ease-in-out;
        }

        @keyframes diamond-pulse {
          0% {
            transform: rotate(45deg) scale(0.8);
            opacity: 0.3;
          }
          50% {
            transform: rotate(45deg) scale(1.1);
            opacity: 1;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
          }
          100% {
            transform: rotate(45deg) scale(0.8);
            opacity: 0.3;
          }
        }

        @keyframes diamond-pulse-inner {
          0% {
            transform: scale(0.8);
            opacity: 0.3;
          }
          50% {
            transform: scale(1);
            opacity: 0.8;
          }
          100% {
            transform: scale(0.8);
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
};
