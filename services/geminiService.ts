import { GoogleGenAI, Type } from '@google/genai';
import type { GeneratedPrompt } from '../types';

// NOTE: The @google/genai library is used directly on the client-side here
// based on project requirements. In a typical production application, API calls
// would be handled by a secure backend server to protect the API key.
// The API key is sourced from 'process.env.API_KEY' as per instructions,
// assuming it's made available in the build environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });


/**
 * Generates a caption for an image using the Gemini API.
 * @param {string} imageBase64 - The base64 encoded image string.
 * @param {string} mimeType - The mime type of the image.
 * @returns {Promise<string>} A promise that resolves to a descriptive caption.
 */
export const generateCaption = async (imageBase64: string, mimeType: string): Promise<string> => {
  const imagePart = {
    inlineData: {
      data: imageBase64,
      mimeType: mimeType,
    },
  };

  const textPart = {
    text: 'Describe this image in a single, detailed sentence. This description will be used to generate a prompt for an AI image generator.',
  };
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: { parts: [imagePart, textPart] },
  });

  return response.text.trim();
};

/**
 * Expands a caption into a detailed prompt using a specific template with the Gemini API.
 * @param {string} caption - The input caption.
 * @param {string} templateId - The ID of the template to use.
 * @returns {Promise<GeneratedPrompt>} A promise that resolves to a structured prompt object.
 */
export const expandPrompt = async (caption: string, templateId: string): Promise<GeneratedPrompt> => {
  const promptText = `
    Based on the following image description, generate a detailed prompt for an AI image generator.
    The desired style is "${templateId}".

    Image description: "${caption}"

    Generate the prompt in the following JSON format. Ensure all fields are populated with creative and relevant details that fit the "${templateId}" style.
    The main 'prompt' field should be a rich, descriptive paragraph. The other fields should be specific details that refine the image generation.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: promptText,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          prompt: { type: Type.STRING, description: 'The main, detailed descriptive prompt for the AI image generator.' },
          negative_prompt: { type: Type.STRING, description: 'A comma-separated list of things to avoid in the image (e.g., blurry, low quality, text).' },
          style_tags: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'An array of keywords describing the artistic style.' },
          camera: { type: Type.STRING, description: 'Details about the camera lens, angle, and shot type (e.g., 50mm lens, eye-level shot).' },
          lighting: { type: Type.STRING, description: 'A description of the lighting (e.g., soft natural sunlight, cinematic lighting).' },
          color_palette: { type: Type.STRING, description: 'A description of the color palette (e.g., vibrant greens and blues, warm tones).' },
          composition: { type: Type.STRING, description: 'How the scene is framed (e.g., rule of thirds, centered subject).' },
          seed: { type: Type.INTEGER, description: 'A random integer for reproducibility.' },
        },
        required: ['prompt', 'negative_prompt', 'style_tags', 'camera', 'lighting', 'color_palette', 'composition', 'seed'],
      },
    },
  });
  
  const jsonStr = response.text.trim();
  return JSON.parse(jsonStr);
};

/**
 * Applies the style from a previous prompt to a new image caption.
 * @param {string} newCaption - The caption for the new image.
 * @param {GeneratedPrompt} stylePrompt - The prompt containing the style to apply.
 * @returns {Promise<GeneratedPrompt>} A promise that resolves to a new structured prompt.
 */
export const applyStyleToCaption = async (newCaption: string, stylePrompt: GeneratedPrompt): Promise<GeneratedPrompt> => {
  const promptText = `
    You are a prompt engineering expert. Your task is to merge the SUBJECT of a new image description with the artistic STYLE of an existing detailed prompt.

    1.  **New Image Subject Description**: "${newCaption}"
    2.  **Existing Style Guide (JSON)**:
        \`\`\`json
        ${JSON.stringify({
            style_tags: stylePrompt.style_tags,
            camera: stylePrompt.camera,
            lighting: stylePrompt.lighting,
            color_palette: stylePrompt.color_palette,
            composition: stylePrompt.composition,
        }, null, 2)}
        \`\`\`

    **Instructions**:
    - Create a new, cohesive prompt that describes the subject from (1) using the detailed artistic style from (2).
    - The main "prompt" field should be a single, flowing paragraph that beautifully integrates the subject and the style. Do not just list keywords.
    - Preserve the stylistic details from the style guide (camera, lighting, etc.) in the new JSON output.
    - Generate a new, relevant "negative_prompt".
    - Generate a new random "seed".

    Output the result in the specified JSON format.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: promptText,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
            prompt: { type: Type.STRING, description: 'The main, detailed descriptive prompt for the AI image generator, merging the new subject with the old style.' },
            negative_prompt: { type: Type.STRING, description: 'A comma-separated list of things to avoid in the image (e.g., blurry, low quality, text).' },
            style_tags: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'An array of keywords describing the artistic style, based on the provided style guide.' },
            camera: { type: Type.STRING, description: 'Details about the camera lens, angle, and shot type, based on the style guide.' },
            lighting: { type: Type.STRING, description: 'A description of the lighting, based on the style guide.' },
            color_palette: { type: Type.STRING, description: 'A description of the color palette, based on the style guide.' },
            composition: { type: Type.STRING, description: 'How the scene is framed, based on the style guide.' },
            seed: { type: Type.INTEGER, description: 'A new random integer for reproducibility.' },
        },
        required: ['prompt', 'negative_prompt', 'style_tags', 'camera', 'lighting', 'color_palette', 'composition', 'seed'],
      },
    },
  });

  const jsonStr = response.text.trim();
  return JSON.parse(jsonStr);
};
