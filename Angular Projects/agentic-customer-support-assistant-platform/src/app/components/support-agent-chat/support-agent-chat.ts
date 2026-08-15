import { Component, inject, signal, computed, OnInit, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GeminiAgentService } from '../../services/gemini-agent.service';

interface ChatMessage {
  id: string;
  sender: 'user' | 'agent' | 'system';
  content: string;
  timestamp: Date;
}

@Component({
  selector: 'app-support-agent-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './support-agent-chat.html',
  styleUrl: './support-agent-chat.css'
})
export class SupportAgentChat implements OnInit, AfterViewChecked {
  private readonly geminiService = inject(GeminiAgentService);

  @ViewChild('chatFeedContainer') private chatFeedContainer!: ElementRef;

  // Signal state
  readonly messages = signal<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'system',
      content: 'Agentic Support Session initialized. Gemini 3.5 Flash online.',
      timestamp: new Date()
    },
    {
      id: 'init-2',
      sender: 'agent',
      content: 'Hello! I am your AI support agent. I have access to your account details. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  
  readonly userInput = signal<string>('');
  readonly isLoading = signal<boolean>(false);
  readonly inputApiKey = signal<string>('');
  
  // Computed state
  readonly hasApiKey = computed(() => this.geminiService.hasApiKey());
  readonly apiError = signal<string | null>(null);

  // Quick Action Chips
  readonly actionChips = [
    { label: 'Check order status', prompt: 'Please check the status of my latest order.' },
    { label: 'Request refund policy', prompt: 'What is your refund policy for Enterprise customers?' },
    { label: 'Escalate ticket', prompt: 'I need to escalate this ticket to a human manager. How do I proceed?' },
    { label: 'Reset API credentials', prompt: 'How do I rotate my security credentials on the developer portal?' }
  ];

  ngOnInit(): void {
    // If there is an existing API key in local storage, read it into input fields if needed
    if (this.geminiService.hasApiKey()) {
      this.inputApiKey.set(this.geminiService.getApiKey());
    }
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  saveApiKey(): void {
    const key = this.inputApiKey().trim();
    if (key) {
      this.geminiService.setApiKey(key);
      this.apiError.set(null);
      this.messages.update(prev => [
        ...prev,
        {
          id: `sys-${Date.now()}`,
          sender: 'system',
          content: 'Gemini API Key configured successfully.',
          timestamp: new Date()
        }
      ]);
    }
  }

  clearApiKey(): void {
    this.geminiService.clearApiKey();
    this.inputApiKey.set('');
    this.messages.update(prev => [
      ...prev,
      {
        id: `sys-${Date.now()}`,
        sender: 'system',
        content: 'API Key cleared.',
        timestamp: new Date()
      }
    ]);
  }

  async selectChip(prompt: string): Promise<void> {
    if (this.isLoading()) return;
    this.userInput.set(prompt);
    await this.sendUserMessage();
  }

  async sendUserMessage(): Promise<void> {
    const prompt = this.userInput().trim();
    if (!prompt || this.isLoading()) return;

    if (!this.hasApiKey()) {
      this.apiError.set('Please configure your Gemini API Key first to chat.');
      return;
    }

    // Add user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: prompt,
      timestamp: new Date()
    };
    this.messages.update(prev => [...prev, userMsg]);
    this.userInput.set('');
    this.isLoading.set(true);
    this.apiError.set(null);

    try {
      const response = await this.geminiService.sendMessage(prompt);
      const agentMsg: ChatMessage = {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        content: response,
        timestamp: new Date()
      };
      this.messages.update(prev => [...prev, agentMsg]);
    } catch (err: any) {
      console.error(err);
      this.apiError.set(err.message || 'An error occurred while generating the agent response.');
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'system',
        content: `Error: ${err.message || 'Failed to get agent response.'}`,
        timestamp: new Date()
      };
      this.messages.update(prev => [...prev, errorMsg]);
    } finally {
      this.isLoading.set(false);
    }
  }

  private scrollToBottom(): void {
    try {
      const container = this.chatFeedContainer.nativeElement;
      container.scrollTop = container.scrollHeight;
    } catch (err) {
      // Ignore scroll errors
    }
  }
}
