import { PersonType } from "@/types/person";
import { Modal } from "antd";
import ImageCard from "./ImageCard";
import formatDate from "@/utils/formatDate";
import ChatComponent from "./Chat/Chat";

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
          </p>{" "}
        </div>
        <p className="text-sm">
          ID:
          {person.id}
        </p>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{person.name}</h2>
        <div className="flex gap-4 flex-col md:flex-row text-lg">
          <div className="w-[300px] h-[300px] relative">
            <ImageCard photoUrl={person.photoUrl as string} />
            <p className="mt-2">Cidade: {person.cidade}</p>
            {person.endereco && <p>Endereço: {person.endereco}</p>}
            {person.status === "Resgatado" && (
              <>
                {person.abrigo && <p>Abrigo: {person.abrigo}</p>}
                {person.entrada && <p>Data de entrada: {formatDate(person.entrada)}</p>}
              </>
            )}
            {person.age && <p>Idade: {person.age}</p>}
          </div>
          <div className="min-w-[500px]">
            <ChatComponent
              botName={`Informações sobre ${person.name}`}
              width="100%"
              placeholder="Compartilhe informações sobre esta pessoa..."
            />
          </div>
          <div></div>
        </div>
      </div>
    </Modal>
  );
};

export default PersonModal;
