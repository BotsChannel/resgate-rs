export interface ChatMessage {
  id: string
  text: string
  isUser: boolean
  timestamp: string
}

export type initialState = "open" | "closed"

export interface classnames {
  container?: string
  chatBox?: string
  chatNav?: string
  navContent?: string
  avatar?: string
  flexAlignCenter?: string
  closeButton?: string
  chatMessages?: string
  userMessage?: string
  botMessage?: string
  messageHeader?: string
  smallAvatar?: string
  messageSender?: string
  messageBubble?: string
  timestamp?: string
  inputArea?: string
  inputField?: string
  sendButton?: string
  sendIcon?: string
  closeIcon?: string
  dotTyping?: string
}

export interface ChatProps {
  botAvatar?: string
  botName?: string
  initialMessages?: ChatMessage[]
  hideCloseButton?: boolean
  dontAutoScrollToBottomOnOpen?: boolean
  disableSendButton?: boolean
  height?: string
  width?: string
  classnames?: classnames
  placeholder?: string
  containerStyle?: React.CSSProperties
  onScroll?: (event: React.UIEvent<HTMLDivElement>) => void
  onMessageSend?: (message: string) => void
  hideHints?: boolean
  containerId?: string
  initialState?: initialState
}
