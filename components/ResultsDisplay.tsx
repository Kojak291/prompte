import React, { useState } from 'react';
import type { GeneratedPrompt, Template } from '../types';
import { TEMPLATES } from '../constants';
import { Loader } from './Loader';

interface ResultsDisplayProps {
  imageUrl: string;
  caption: string;
  prompt: GeneratedPrompt;
  onTemplateChange: (template: Template) => void;
  isExpanding: boolean;
  onReset: () => void;
  onApplyStyle: () => void;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  imageUrl,
  caption,
  prompt,
  onTemplateChange,
  isExpanding,
  onReset,
  onApplyStyle,
}) => {
  const [activeTemplate, setActiveTemplate] = useState<Template['id']>('detailed');
  const [copyPromptSuccess, setCopyPromptSuccess] = useState('');
  const [copyStyleSuccess, setCopyStyleSuccess] = useState('');

  const handleTemplateClick = (template: Template) => {
    setActiveTemplate(template.id);
    onTemplateChange(template);
  };
  
  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(prompt.prompt).then(() => {
        setCopyPromptSuccess('Copied!');
        setTimeout(() => setCopyPromptSuccess(''), 2000);
    }, () => {
        setCopyPromptSuccess('Failed to copy!');
        setTimeout(() => setCopyPromptSuccess(''), 2000);
    });
  };

  const handleCopyStyle = () => {
      const styleData = {
        style_tags: prompt.style_tags,
        camera: prompt.camera,
        lighting: prompt.lighting,
        color_palette: prompt.color_palette,
        composition: prompt.composition,
      };
      navigator.clipboard.writeText(JSON.stringify(styleData, null, 2)).then(() => {
        setCopyStyleSuccess('Style Copied!');
        setTimeout(() => setCopyStyleSuccess(''), 2000);
      }, () => {
        setCopyStyleSuccess('Failed to copy!');
        setTimeout(() => setCopyStyleSuccess(''), 2000);
      });
    };

  return (
    <div className="w-full max-w-7xl mx-auto animate-fade-in">
        <div className="mb-6 flex flex-wrap gap-4">
            <button onClick={onReset} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
                </svg>
                Start Over
            </button>
            <button onClick={onApplyStyle} className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
              </svg>
              Apply Style to New Image
            </button>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Image and Caption */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <img src={imageUrl} alt="Uploaded content" className="rounded-md w-full object-cover" />
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider mb-2">Generated Caption</h3>
            <p className="text-gray-300 italic">{caption}</p>
          </div>
        </div>

        {/* Right Column: Prompt Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider mb-3">Choose a Style</h3>
            <div className="flex flex-wrap gap-2">
              {TEMPLATES.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleTemplateClick(template)}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    activeTemplate === template.id
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                  }`}
                >
                  {template.icon}
                  {template.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="relative bg-gray-800 rounded-lg shadow-lg">
            {isExpanding && <div className="absolute inset-0 bg-gray-900/70 rounded-lg flex items-center justify-center z-10"><Loader text="Creating variation..." /></div>}
            <div className={`p-6 transition-opacity duration-300 ${isExpanding ? 'opacity-30' : 'opacity-100'}`}>
              <div className="flex justify-between items-center mb-4">
                 <h3 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider">Generated Prompt</h3>
                 <button onClick={handleCopyPrompt} className="relative bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                    {copyPromptSuccess || 'Copy Prompt'}
                 </button>
              </div>
              <div className="bg-gray-900/70 p-4 rounded-md font-mono text-sm text-gray-300 whitespace-pre-wrap break-words selection:bg-indigo-500 selection:text-white">
                {prompt.prompt}
              </div>
            </div>
          </div>

          {/* Reusable Style Details */}
          <div className={`bg-gray-800 p-6 rounded-lg shadow-lg transition-opacity duration-300 ${isExpanding ? 'opacity-30' : 'opacity-100'}`}>
             <div className="flex justify-between items-center mb-4">
                 <h3 className="text-sm font-semibold text-teal-400 uppercase tracking-wider">Reusable Style Template</h3>
                 <button onClick={handleCopyStyle} className="relative bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                    </svg>
                    {copyStyleSuccess || 'Copy Style'}
                 </button>
              </div>
              <div className="space-y-4">
                  <DetailItem label="Negative Prompt" value={prompt.negative_prompt} />
                  <DetailItem label="Style Tags" value={prompt.style_tags.join(', ')} />
                  <DetailItem label="Camera" value={prompt.camera} />
                  <DetailItem label="Lighting" value={prompt.lighting} />
                  <DetailItem label="Color Palette" value={prompt.color_palette} />
                  <DetailItem label="Composition" value={prompt.composition} />
                  {prompt.seed && <DetailItem label="Seed" value={prompt.seed.toString()} />}
              </div>
          </div>

        </div>
      </div>
    </div>
  );
};

interface DetailItemProps {
    label: string;
    value: string;
}

const DetailItem: React.FC<DetailItemProps> = ({ label, value }) => (
    <div>
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</h4>
        <p className="text-gray-300">{value}</p>
    </div>
);