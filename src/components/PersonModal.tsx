"use client";
import { PersonType } from "@/types/person";
import { Menu, Modal } from "antd";
import ChatComponent from "./Chat/Chat";
import { ChatContext, ChatProvider } from "./Chat/ChatProvider";
import PersonCard from "./PersonCard";
import { MessageOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { MenuProps } from "antd/lib/menu";
import { useContext, useEffect, useState } from "react";
import { ChatMessage } from "./Chat/widget-types";

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
  const [initialMessages, setInitialMessages] = useState<ChatMessage[]>([]);
  const { setChatError } = useContext(ChatContext);

  useEffect(() => {
    const getInitialMessages = async (userId: number) => {
      try {
        const response = await fetch(`/api/comments/${userId}`);
        const data = await response.json();
        console.log(data);
        setInitialMessages(data.messages);
        return data;
      } catch (error) {
        setChatError(true);
      }
    };

    if (person) {
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

          <ChatProvider>
            {current === "chat" && (
              <div className="w-full h-[500px] flex">
                <ChatComponent
                  botName={`Informações sobre ${person.name}`}
                  width="100%"
                  height="100%"
                  placeholder="Compartilhe informações sobre esta pessoa..."
                  personID={person.id}
                  initialMessages={initialMessages}
                />
              </div>
            )}
          </ChatProvider>
        </div>
      </div>
    </Modal>
  );
};

export default PersonModal;
