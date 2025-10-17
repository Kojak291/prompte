import React, { useState, useCallback } from 'react';
import type { GeneratedPrompt } from '../types';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  error: string | null;
  promptToTransfer: GeneratedPrompt | null;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, error, promptToTransfer }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0]);
    }
  };

  const handleDragEvents = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    handleDragEvents(e);
    setIsDragging(true);
  }, [handleDragEvents]);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    handleDragEvents(e);
    setIsDragging(false);
  }, [handleDragEvents]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    handleDragEvents(e);
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageUpload(e.dataTransfer.files[0]);
    }
  }, [handleDragEvents, onImageUpload]);

  return (
    <div className="w-full max-w-2xl text-center">
      {promptToTransfer && (
        <div className="bg-teal-900/50 border border-teal-700 text-teal-200 px-4 py-3 rounded-lg relative mb-8 animate-fade-in" role="alert">
            <strong className="font-bold">Style Transfer Mode!</strong>
            <span className="block sm:inline ml-2">Upload a new image to apply the previous prompt's style.</span>
        </div>
      )}

      <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
        {promptToTransfer ? "Apply a Masterpiece Style" : "Transform Your Image into a Masterpiece Prompt"}
      </h2>
      <p className="text-lg text-gray-400 mb-8">
        {promptToTransfer ? "The new image will be described using the style from your last creation." : "Upload a picture, and we'll craft the perfect, detailed prompt for any AI image generator."}
      </p>
      
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragEvents}
        onDrop={handleDrop}
        className={`relative flex flex-col items-center justify-center w-full p-10 sm:p-12 border-2 border-dashed rounded-lg transition-all duration-300 ${isDragging ? 'border-indigo-400 bg-gray-800/50 scale-105' : 'border-gray-600 bg-gray-800/30'}`}
      >
        <input
          type="file"
          id="file-upload"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileChange}
          accept="image/png, image/jpeg, image/webp"
        />
        <div className="flex flex-col items-center pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-16 w-16 mb-4 transition-colors ${isDragging ? 'text-indigo-400' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-lg text-gray-300 mb-2">
            <span className="font-semibold text-indigo-400">Click to upload</span> or drag and drop
          </p>
          <p className="text-sm text-gray-500">PNG, JPG, or WEBP</p>
        </div>
      </div>
      {error && <p className="mt-4 text-red-400 bg-red-900/50 px-4 py-2 rounded-md">{error}</p>}
    </div>
  );
};
