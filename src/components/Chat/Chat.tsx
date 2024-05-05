"use client";
import React, { useContext } from "react";
import styles from "./Chat.module.css";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import { ChatContext } from "./ChatProvider";
import { ErrorIcon } from "./Icons";
import WaitingMessageBubble from "./WaitingMessageBubble";
import { ChatMessage, ChatProps } from "./widget-types";
import moment from 'moment';
import 'moment/locale/pt-br'

moment.locale('pt-br')

const ChatComponent: React.FC<ChatProps> = ({
  botName,
  initialMessages,
  height,
  width,
  placeholder,
  onMessageSend,
  onScroll,
  containerId,
}) => {
  const ChatBotName = botName ?? "RESGATE RS";
  const { sendMessage, messages, chatError } = useContext(ChatContext);
  const [waitingForResponse, setWaitingForResponse] = React.useState<boolean>(false);

  const [isTyping, setIsTyping] = React.useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState<string>("");

  const messagesContainer = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = React.useCallback(() => {
    setTimeout(() => {
      if (messagesContainer.current) {
        messagesContainer.current.scroll({
          top: messagesContainer.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 100);
  }, [messagesContainer]);

  function executeOnMessageSend(message: string) {
    try {
      console.log("Executing onMessageSend callback");

      if (onMessageSend) {
        onMessageSend(message);
      }
    } catch (error) {
      console.error("Error executing onMessageSend callback", error);
    } finally {
      setIsTyping(false);
      setWaitingForResponse(false);
      scrollToBottom();
    }
  }

  const handleSendMessage = () => {
    if (inputValue) {
      const message = inputValue;
      if (message.length > 0) {
        sendMessage(message, true);
        setInputValue("");
        setWaitingForResponse(true);
      }
    }
    executeOnMessageSend(inputValue);
  };

  return (
    <div className={styles.chatContainer}>
      <div
        className={styles.chatBox}
        style={{
          width: width ?? "21rem",
          height: height ?? "30rem",
        }}
      >
        <ChatHeader ChatBotName={ChatBotName} />

        <div
          className={styles.chatMessages}
          id={containerId ?? "journal-scroll"}
          onScroll={onScroll}
          ref={messagesContainer}
        >
          {chatError ? (
            <>
              {chatError && (
                <div className={styles.errorBubble}>
                  <ErrorIcon />
                  <div>
                    <p>Problema ao se conectar com o servidor</p>
                    <button
                      onClick={() => {
                        location.reload();
                      }}
                      className={styles.errorButton}
                    >
                      Reiniciar
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {messages.map((message: any) => (
                <div
                  key={message.id}
                  id={message.id}
                  className={`${message.isUser ? styles.userMessage : styles.botMessage}`}
                >
                  <div className={styles.messageBubble}>
                    <p className="mt-1">{message.text}</p>
                    <span className={styles.timestamp}>
                      {moment(message.timestamp).fromNow()}
                    </span>
                  </div>
                </div>
              ))}

              <WaitingMessageBubble
                waitingForResponse={waitingForResponse}
                isTyping={isTyping}
              />
            </>
          )}
        </div>
        <ChatInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSendMessage={handleSendMessage}
          placeholder={placeholder}
          setIsTyping={setIsTyping}
        />
      </div>
    </div>
  );
};

export default ChatComponent;
