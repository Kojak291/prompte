
import React from 'react';
import type { Template } from './types';

const FilmIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm1 2a1 1 0 00-1 1v1a1 1 0 001 1h1a1 1 0 001-1V6a1 1 0 00-1-1H5zM5 12a1 1 0 00-1 1v1a1 1 0 001 1h1a1 1 0 001-1v-1a1 1 0 00-1-1H5zM8 6a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H9a1 1 0 01-1-1V6zm7-1a1 1 0 100 2h-1a1 1 0 100-2h1z" clipRule="evenodd" /></svg>;
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>;
const SparklesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 2a1 1 0 00-1 1v1.586l-1.293 1.293a1 1 0 001.414 1.414L5 6.414V8a1 1 0 002 0V6.414l.293.293a1 1 0 001.414-1.414L7 4.586V3a1 1 0 00-1-1H5zM2 10a1 1 0 011-1h1.586l1.293-1.293a1 1 0 111.414 1.414L6.414 10H8a1 1 0 110 2H6.414l-.293.293a1 1 0 11-1.414-1.414L5.414 11H3a1 1 0 01-1-1zm14 0a1 1 0 011-1h1.586l1.293-1.293a1 1 0 111.414 1.414L18.414 10h.586a1 1 0 110 2h-.586l-.293.293a1 1 0 11-1.414-1.414l1.293-1.293H17a1 1 0 01-1-1zM15 8a1 1 0 00-1-1v-1.586l-1.293-1.293a1 1 0 00-1.414 1.414L12 5.586V7a1 1 0 002 0v-.586l.293-.293a1 1 0 001.414 1.414L15 6.414V8zM10 15a1 1 0 011 1v1.586l1.293 1.293a1 1 0 11-1.414 1.414L10 18.414V20a1 1 0 11-2 0v-1.586l-.293.293a1 1 0 11-1.414-1.414l1.293-1.293V16a1 1 0 011-1z" clipRule="evenodd" /></svg>;
const DocumentTextIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 11-2 0V4H6a1 1 0 01-1-1z" clipRule="evenodd" /><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4a1 1 0 110 2H6a1 1 0 01-1-1zm0 2a1 1 0 011 1v10a2 2 0 002 2h8a2 2 0 002-2V7a1 1 0 112 0v8a4 4 0 01-4 4H7a4 4 0 01-4-4V7a1 1 0 011-1z" clipRule="evenodd" /></svg>;
const PencilIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>;


export const TEMPLATES: Template[] = [
  { id: 'simple', name: 'Simple', icon: <DocumentTextIcon /> },
  { id: 'detailed', name: 'Detailed', icon: <SparklesIcon /> },
  { id: 'cinematic', name: 'Cinematic', icon: <FilmIcon /> },
  { id: 'portrait', name: 'Portrait', icon: <UserIcon /> },
  { id: 'cartoon', name: 'Cartoon', icon: <PencilIcon /> }
];
