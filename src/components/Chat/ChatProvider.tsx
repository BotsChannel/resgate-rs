"use client";
import React, { createContext, useEffect, useState } from "react";
import { ChatMessage } from "./widget-types";

export const ChatContext = createContext({
  messages: [] as ChatMessage[],
  setMessages: (messages: ChatMessage[]) => {},
  sendMessage: (message: string, author: string, personId: number) => {},
  chatError: false,
  lastMessage: null as string | null,
  setChatError: (error: boolean) => {},
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

  const sendMessage = React.useCallback(
    async (message: string, author: string, personId: number) => {
      const newMessage: ChatMessage = {
        message,
        author,
        timestamp: new Date().getTime(),
      };
      if (author === "" || author === null) {
        newMessage.author = "Anônimo";
      }
      setMessages((messages) => [...messages, newMessage]);
      setLastMessage(newMessage?.message);
      try {
        await fetch(`/api/comments/${personId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMessage),
        });
      } catch (error) {
        console.error("Error sending message", error);
        setChatError(true);
      } finally {
        playAudio();
      }
    },
    []
  );

  return (
    <ChatContext.Provider
      value={{
        messages,
        setMessages,
        lastMessage,

        chatError,
        setChatError,

        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
