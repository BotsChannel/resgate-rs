"use client";
import React, { createContext, useEffect, useState } from "react";
import { ChatMessage } from "./widget-types";

export const ChatContext = createContext({
  messages: [] as ChatMessage[],
  setMessages: (messages: ChatMessage[]) => {},
  sendMessage: (message: string, isUser?: boolean) => {},
  chatError: false,
  lastMessage: null as string | null,
});

export const ChatProvider = ({ children, personId }: { children: React.ReactNode, personId: number }) => {
  const [lastMessage, setLastMessage] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatError, setChatError] = useState<boolean>(false);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await fetch(`/api/comments/${personId}`);
        const data = await response.json();
        setMessages(data.messages);
      } catch (error) {
        setChatError(true);
      }
    }

    getMessages();
  }, []);

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

  const sendMessage = React.useCallback(async (message: string, author: string) => {
    const newMessage: ChatMessage = {
      message,
      author,
      timestamp: new Date().getTime(),
    };
    setMessages((messages) => [...messages, newMessage]);
    setLastMessage(newMessage.message);
    
    await fetch(`/api/comments/${personId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMessage),
    });

    playAudio();
  }, []);

  return (
    <ChatContext.Provider
      value={{
        messages,
        setMessages,
        lastMessage,

        chatError,

        sendMessage: (message: string, isUser?: boolean) => {}, // Fix: Change 'author' to 'isUser'
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
