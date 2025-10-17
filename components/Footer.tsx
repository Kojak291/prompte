
import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full text-center p-4 mt-8">
      <p className="text-sm text-gray-500">&copy; {currentYear} PromptForge. All rights reserved.</p>
    </footer>
  );
};
