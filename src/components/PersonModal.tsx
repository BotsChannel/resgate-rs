"use client";
import { PersonType } from "@/types/person";
import { Modal } from "antd";
import ChatComponent from "./Chat/Chat";
import { ChatProvider } from "./Chat/ChatProvider";
import PersonCard from "./PersonCard";

interface PersonModalProps {
  person: PersonType;
  setSelectedPerson: (person: PersonType | null) => void;
}

const PersonModal = ({ person, setSelectedPerson }: PersonModalProps) => {
  if (!person) {
    return null;
  }
  return (
    <Modal
      open={!!person}
      onCancel={() => setSelectedPerson(null)}
      footer={null}
      centered
      maskClosable
      width="fit-content"
      classNames={{
        body: "p-4 w-full",
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
            <p className="absolute top-1 left-1 text-xs text-gray-500">ID PESSOA: {person.id}</p>
          </p>
        </div>
        <div className="flex gap-4 flex-col md:flex-row text-lg">
          <PersonCard
            person={person}
            setSelectedPerson={setSelectedPerson}
          />

          <div className="w-full h-[600px] flex">
            <ChatProvider>
              <ChatComponent
                botName={`Informações sobre ${person.name}`}
                width="100%"
                height="100%"
                placeholder="Compartilhe informações sobre esta pessoa..."
              />
            </ChatProvider>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PersonModal;
