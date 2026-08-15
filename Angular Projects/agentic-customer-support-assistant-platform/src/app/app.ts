import { Component, signal } from '@angular/core';
import { SupportAgentChat } from './components/support-agent-chat/support-agent-chat';

@Component({
  selector: 'app-root',
  imports: [SupportAgentChat],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('agentic-customer-support-assistant-platform');
}
