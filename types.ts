
// FIX: Import ReactElement to resolve JSX type error in a .ts file.
import type { ReactElement } from 'react';

export interface GeneratedPrompt {
  prompt: string;
  negative_prompt: string;
  style_tags: string[];
  camera: string;
  lighting: string;
  color_palette: string;
  composition: string;
  seed?: number;
}

export interface Template {
  id: 'simple' | 'detailed' | 'cinematic' | 'portrait' | 'cartoon';
  name: string;
  // FIX: Changed type from JSX.Element to ReactElement.
  icon: ReactElement;
}
