
import React from 'react';

interface HeaderProps {
    onLogoClick: () => void;
    isResultPage: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onLogoClick, isResultPage }) => {
  return (
    <header className="w-full p-4 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-700">
      <div className="max-w-7xl mx-auto flex items-center">
        <div 
          className={`flex items-center space-x-3 ${isResultPage ? 'cursor-pointer' : ''}`}
          onClick={isResultPage ? onLogoClick : undefined}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v1h-1.5a.5.5 0 00-.5.5v1.5a.5.5 0 00.5.5H15v4h-1.5a.5.5 0 00-.5.5v1.5a.5.5 0 00.5.5H15v1a2 2 0 01-2 2H7a2 2 0 01-2-2v-1h1.5a.5.5 0 00.5-.5V10a.5.5 0 00-.5-.5H3V5h1.5a.5.5 0 00.5-.5V3a.5.5 0 00-.5-.5H3V4a2 2 0 012-2z" />
            <path d="M0 6.5A1.5 1.5 0 011.5 5h1A1.5 1.5 0 014 6.5v7A1.5 1.5 0 012.5 15h-1A1.5 1.5 0 010 13.5v-7zm16 0A1.5 1.5 0 0117.5 5h1A1.5 1.5 0 0120 6.5v7A1.5 1.5 0 0118.5 15h-1A1.5 1.5 0 0116 13.5v-7z" />
          </svg>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Prompt<span className="text-indigo-400">Forge</span>
          </h1>
        </div>
      </div>
    </header>
  );
};
