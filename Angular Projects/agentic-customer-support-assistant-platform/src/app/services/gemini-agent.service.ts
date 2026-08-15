import { Injectable, signal } from '@angular/core';
import { GoogleGenAI } from '@google/genai';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeminiAgentService {
  private readonly customApiKey = signal<string | null>(null);

  constructor() {
    if (typeof window !== 'undefined') {
      const savedKey = localStorage.getItem('gemini_api_key');
      if (savedKey) {
        this.customApiKey.set(savedKey);
      }
    }
  }

  hasApiKey(): boolean {
    const key = this.getApiKey();
    return !!key && key !== 'YOUR_GEMINI_API_KEY' && key.trim() !== '';
  }

  setApiKey(key: string): void {
    this.customApiKey.set(key);
    if (typeof window !== 'undefined') {
      localStorage.setItem('gemini_api_key', key);
    }
  }

  getApiKey(): string {
    const envKey = environment.apiKey;
    if (envKey && envKey !== 'YOUR_GEMINI_API_KEY') {
      return envKey;
    }
    return this.customApiKey() || '';
  }

  clearApiKey(): void {
    this.customApiKey.set(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('gemini_api_key');
    }
  }

  async sendMessage(userPrompt: string): Promise<string> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('API key is not configured. Please set it in your environment or enter it in the settings.');
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: userPrompt,
      });

      if (response && response.text) {
        return response.text;
      }
      return 'No response text received from the agent.';
    } catch (error: any) {
      console.error('Error generating content from Gemini:', error);
      throw new Error(error?.message || 'Failed to generate response from Gemini API.');
    }
  }
}
