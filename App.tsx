import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ImageUploader } from './components/ImageUploader';
import { ResultsDisplay } from './components/ResultsDisplay';
import { Loader } from './components/Loader';
import { generateCaption, expandPrompt, applyStyleToCaption } from './services/geminiService';
import type { GeneratedPrompt, Template } from './types';
import { TEMPLATES } from './constants';

type AppState = 'upload' | 'processing' | 'results';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('upload');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [caption, setCaption] = useState<string>('');
  const [generatedPrompt, setGeneratedPrompt] = useState<GeneratedPrompt | null>(null);
  const [promptToTransfer, setPromptToTransfer] = useState<GeneratedPrompt | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isExpanding, setIsExpanding] = useState(false);

  const handleImageUpload = useCallback(async (file: File) => {
    setImageFile(file);
    setImageUrl(URL.createObjectURL(file));
    setAppState('processing');
    setError(null);

    try {
      const base64Image = await fileToBase64(file);
      const newCaption = await generateCaption(base64Image, file.type);
      setCaption(newCaption);

      let finalPrompt;
      if (promptToTransfer) {
        finalPrompt = await applyStyleToCaption(newCaption, promptToTransfer);
        setPromptToTransfer(null); // Clear after use
      } else {
        const initialTemplate = TEMPLATES[1]; // 'Detailed'
        finalPrompt = await expandPrompt(newCaption, initialTemplate.id);
      }
      
      setGeneratedPrompt(finalPrompt);
      setAppState('results');
    } catch (err) {
      setError('An error occurred while processing the image. Please try again.');
      setAppState('upload');
      setPromptToTransfer(null); // Also clear on error
      console.error(err);
    }
  }, [promptToTransfer]);

  const handleTemplateChange = useCallback(async (template: Template) => {
    if (!caption) return;
    setIsExpanding(true);
    setError(null);
    try {
      const expandedPrompt = await expandPrompt(caption, template.id);
      setGeneratedPrompt(expandedPrompt);
    } catch (err) {
      setError('Failed to generate a new variation.');
      console.error(err);
    } finally {
      setIsExpanding(false);
    }
  }, [caption]);
  
  const handleReset = () => {
    setAppState('upload');
    setImageFile(null);
    setImageUrl('');
    setCaption('');
    setGeneratedPrompt(null);
    setPromptToTransfer(null);
    setError(null);
  };

  const handleApplyStyleToNewImage = () => {
    setPromptToTransfer(generatedPrompt);
    setAppState('upload');
    setImageFile(null);
    setImageUrl('');
    setCaption('');
    setGeneratedPrompt(null);
    setError(null);
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-200 font-sans">
      <Header onLogoClick={handleReset} isResultPage={appState === 'results'}/>
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        {appState === 'upload' && <ImageUploader onImageUpload={handleImageUpload} error={error} promptToTransfer={promptToTransfer} />}
        {appState === 'processing' && <Loader text={promptToTransfer ? "Applying style to new image..." : "Forging your prompt, please wait..."} />}
        {appState === 'results' && imageUrl && caption && generatedPrompt && (
          <ResultsDisplay
            imageUrl={imageUrl}
            caption={caption}
            prompt={generatedPrompt}
            onTemplateChange={handleTemplateChange}
            isExpanding={isExpanding}
            onReset={handleReset}
            onApplyStyle={handleApplyStyleToNewImage}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
