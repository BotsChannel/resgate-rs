"use client";
import { PersonType } from "@/types/person";
import { InfoCircleOutlined, MessageOutlined } from "@ant-design/icons";
import { Menu, Modal } from "antd";
import { MenuProps } from "antd/lib/menu";
import React, { useEffect, useState } from "react";
import ChatComponent from "./Chat/Chat";
import playAudio from "./Chat/playAudio";
import { ChatMessage } from "./Chat/widget-types";
import PersonCard from "./PersonCard";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: "Chat",
    key: "chat",
    icon: <MessageOutlined />,
  },
  {
    label: "Informações",
    key: "info",
    icon: <InfoCircleOutlined />,
  },
];

interface PersonModalProps {
  person: PersonType;
  setSelectedPerson: (person: PersonType | null) => void;
  setCreatePersonModal: (value: boolean) => void;
}

const PersonModal = ({ person, setSelectedPerson, setCreatePersonModal }: PersonModalProps) => {
  const [current, setCurrent] = useState("chat");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatError, setChatError] = useState<boolean>(false);

  const getInitialMessages = async (userId: number) => {
    console.log("Getting initial messages");
    try {
      const response = await fetch(`/api/comments/${userId}`);
      const data = await response.json().then((data) => {
        console.log(data);
        return data;
      });
      console.log(data);
      setMessages(data);
      return data;
    } catch (error) {
      console.log("Error fetching messages", error);
      setChatError(true);
    }
  };

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

  useEffect(() => {
    if (person?.id) {
      console.log(`Person: ${JSON.stringify(person)}`);
      getInitialMessages(person.id);
    }
  }, [person, setChatError]);

  const onClick = (e: any) => {
    setCurrent(e.key);
  };

  if (!person) return null;

  return (
    <Modal
      open={!!person}
      onCancel={() => setSelectedPerson(null)}
      closable
      afterClose={() => setSelectedPerson(null)}
      footer={null}
      centered
      maskClosable
      destroyOnClose
      width="fit-content"
      classNames={{
        body: "p-2 w-full",
      }}
    >
      <div className="flex flex-col">
        <div className="mb-4 border-b border-gray-300 pb-4">
          <p
            className={`font-bold text-center text-3xl ${
              person.status === "Resgatado" ? "text-green-500" : "text-red-500"
            }`}
          >
            {person.status === "Resgatado" ? "🟢" : "⚠️"} {person.status}
            <p className="absolute top-1 left-2 text-xs text-gray-500">ID PESSOA: {person.id}</p>
          </p>

          <div className="justify-center w-full flex md:hidden">
            <Menu
              mode="horizontal"
              className="mb-4"
              onClick={onClick}
              selectedKeys={[current]}
              items={items}
            />
          </div>
        </div>
        <div className="gap-4 flex-col md:flex-row text-lg flex">
          <div className="hidden md:block">
            <PersonCard
              person={person}
              setSelectedPerson={setSelectedPerson}
              setIsModalOpen={setCreatePersonModal}
              hideTitle
            />
          </div>

          {current === "info" && (
            <div className="block md:hidden">
              <PersonCard
                person={person}
                setSelectedPerson={setSelectedPerson}
                setIsModalOpen={setCreatePersonModal}
                hideTitle
              />
            </div>
          )}

          {current === "chat" && (
            <div className="w-full h-[500px] flex">
              <ChatComponent
                botName={`Informações sobre ${person.name}`}
                width="100%"
                height="100%"
                placeholder="Compartilhe informações sobre esta pessoa..."
                personID={person.id}
                messages={messages}
                chatError={chatError}
                sendMessage={sendMessage}
              />
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default PersonModal;
