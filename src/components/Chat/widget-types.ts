export interface ChatMessage {
  message: string;
  author: string;
  timestamp: number;
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
