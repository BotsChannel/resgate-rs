export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

export interface ChatProps {
  botName?: string;
  initialMessages?: ChatMessage[];
  height?: string;
  width?: string;
  placeholder?: string;
  onScroll?: (event: React.UIEvent<HTMLDivElement>) => void;
  onMessageSend?: (message: string) => void;
  containerId?: string;
}
