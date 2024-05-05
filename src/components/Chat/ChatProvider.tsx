"use client"
import React, { createContext, useEffect, useState } from "react"
import { ChatMessage } from "./widget-types"

export const ChatContext = createContext({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => {},
  toggleOpen: () => {},
  messages: [] as ChatMessage[],
  setMessages: (messages: ChatMessage[]) => {},
  sendMessage: (message: string, isUser?: boolean) => {},
  chatEnded: false,
  chatError: false,
  clearChat: () => {},
  lastMessage: null as string | null,
  notificationNumber: 0,
  openChat: () => {},
})

// @TODO permitir trocar greetingMessage por uma mensagem customizada

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true)
  // const [isTyping, setIsTyping] = useState<boolean>(false)
  // const [waitingForResponse, setWaitingForResponse] = useState(false)
  const [greetingMessage] = useState<ChatMessage>({
    id: "greeting",
    text: "Olá! Como posso ajudar?",
    isUser: false,
    timestamp: new Date().toLocaleTimeString().slice(0, 5),
  })
  // const [userStartMessage] = useState<ChatMessage>({
  //   id: "user-start",
  //   text: "Olá! Gostaria de saber mais sobre seus produtos.",
  //   isUser: true,
  //   timestamp: new Date().toLocaleTimeString().slice(0, 5),
  // })

  const [lastMessage, setLastMessage] = useState<string | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([greetingMessage])
  const [isInteracting, setIsInteracting] = useState<boolean>(false)
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)

  const [chatEnded, setChatEnded] = useState<boolean>(false)
  const [chatError, setChatError] = useState<boolean>(false)
  const [notificationNumber, setNotificationNumber] = useState<number>(0)

  const toggleOpen = () => {
    setIsOpen((prevIsClosed) => !prevIsClosed)
    setNotificationNumber(0)
    console.log("Chat is open:", isOpen)
  }

  function playAudio() {
    const audioCtx = new AudioContext()
    fetch("https://s3.sa-east-1.amazonaws.com/botschannel.public/sounds/notification.mp3", {
      cache: "force-cache",
    })
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => audioCtx.decodeAudioData(arrayBuffer))
      .then((decodedAudio) => {
        const audioSource = audioCtx.createBufferSource()
        audioSource.buffer = decodedAudio
        audioSource.connect(audioCtx.destination)
        audioSource.start()
      })
      .catch((error) => console.error("Error loading audio:", error))
  }

  const sendMessage = React.useCallback(
    (message: string, isUser?: boolean) => {
      const newMessage: ChatMessage = {
        id: `message-${new Date().getHours()}-${new Date().getMinutes()}-${new Date().getSeconds()}-${new Date().getMilliseconds()}`,
        text: message,
        isUser: isUser ?? false,
        timestamp: new Date().toLocaleTimeString().slice(0, 5),
      }
      setMessages((messages) => [...messages, newMessage])
      setLastMessage(newMessage.text)

      if (isUser === false || isUser === undefined) {
        playAudio()
        console.log("Bot message:", newMessage.text, isOpen)
        if (isOpen === true) {
          setNotificationNumber((prev) => prev + 1)
        }
      }

      if (isUser && isInteracting === false) {
        setNotificationNumber(0)
        setIsInteracting(true)
      }
    },
    [isOpen, isInteracting]
  )

  const openChat = () => {
    setIsOpen(false)
  }

  // cancelar conversa se o usuário não interagir por 15 minutos
  useEffect(() => {
    if (isInteracting) {
      if (timer) {
        clearTimeout(timer)
      }
      setTimer(
        setTimeout(
          () => {
            setIsInteracting(false)
            setChatEnded(true)
          },
          1000 * 60 * 15
        )
      )
    }
  }, [isInteracting])

  const clearChat = () => {
    setMessages([greetingMessage])
    setChatEnded(false)
    setChatError(false)
    setNotificationNumber(0)
  }

  return (
    <ChatContext.Provider
      value={{
        isOpen,
        setIsOpen,
        messages,
        setMessages,
        lastMessage,
        notificationNumber,

        chatEnded,
        chatError,

        toggleOpen,
        sendMessage,
        clearChat,
        openChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
