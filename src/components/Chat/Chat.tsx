"use client";
import React, { useContext } from "react";
import styles from "./Chat.module.css";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import { ChatContext } from "./ChatProvider";
import { ErrorIcon } from "./Icons";
import WaitingMessageBubble from "./WaitingMessageBubble";
import { ChatMessage, ChatProps } from "./widget-types";
import moment from "moment";
import "moment/locale/pt-br";

moment.locale("pt-br");

const ChatComponent: React.FC<ChatProps> = ({
  botName,
  initialMessages,
  height,
  width,
  placeholder,
  onMessageSend,
  onScroll,
  containerId,
  personID,
}) => {
  const ChatBotName = botName ?? "RESGATE RS";
  const { sendMessage, messages, chatError } = useContext(ChatContext);
  const [waitingForResponse, setWaitingForResponse] = React.useState<boolean>(false);

  const [isTyping, setIsTyping] = React.useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState<string>("");
  const [authorValue, setAuthorValue] = React.useState<string>("");

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
      if (inputValue.length > 0) {
        sendMessage(inputValue, authorValue, personID);
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
              {messages.length === 0 && (
                <div className={styles.message}>
                  <div className={styles.messageBubble}>
                    <p>
                      Ainda não foi recebido nenhuma informação sobre{" "}
                      <strong>{ChatBotName.replace("Informações sobre", "")}</strong>, se tiver
                      qualquer informação, por favor, envie uma mensagem.
                    </p>
                  </div>
                </div>
              )}

              {messages.map((message: ChatMessage) => (
                <div
                  key={message.timestamp + message.message}
                  id={message.timestamp + message.message}
                  className={styles.message}
                >
                  <div className={styles.messageHeader}>
                    <span className={styles.messageSender}>{message.author ?? "Anônimo"}</span>
                  </div>
                  <div className={styles.messageBubble}>
                    <p>{message.message}</p>
                    <span className={styles.timestamp}>{moment(message.timestamp).fromNow()}</span>
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
          authorValue={authorValue}
          setAuthorValue={setAuthorValue}
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSendMessage={handleSendMessage}
          placeholder={placeholder}
          setIsTyping={setIsTyping}
          setAutorValue={setAuthorValue}
          autorValue={authorValue}
        />
      </div>
    </div>
  );
};

export default ChatComponent;
