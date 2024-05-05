"use client";
import React, { createContext, useState } from "react";
import { ChatMessage } from "./widget-types";

export const ChatContext = createContext({
  messages: [] as ChatMessage[],
  setMessages: (messages: ChatMessage[]) => {},
  sendMessage: (message: string, isUser?: boolean) => {},
  chatError: false,
  lastMessage: null as string | null,
});

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [lastMessage, setLastMessage] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [chatError, setChatError] = useState<boolean>(false);

  function playAudio() {
    const audioCtx = new AudioContext();
    fetch("https://s3.sa-east-1.amazonaws.com/botschannel.public/sounds/notification.mp3", {
      cache: "force-cache",
    })
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => audioCtx.decodeAudioData(arrayBuffer))
      .then((decodedAudio) => {
        const audioSource = audioCtx.createBufferSource();
        audioSource.buffer = decodedAudio;
        audioSource.connect(audioCtx.destination);
        audioSource.start();
      })
      .catch((error) => console.error("Error loading audio:", error));
  }

  const sendMessage = React.useCallback((message: string, isUser?: boolean) => {
    const newMessage: ChatMessage = {
      text: message,
      isUser: isUser ?? false,
      timestamp: new Date().getTime(),
    };
    setMessages((messages) => [...messages, newMessage]);
    setLastMessage(newMessage.text);

    if (isUser === false || isUser === undefined) {
      playAudio();
    }
  }, []);

  return (
    <ChatContext.Provider
      value={{
        messages,
        setMessages,
        lastMessage,

        chatError,

        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
