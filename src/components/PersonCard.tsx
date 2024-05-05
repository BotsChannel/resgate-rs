import React from "react";
import Image from "next/image";
import { Button, Card } from "antd";
import { PersonType } from "@/types/person";
import ImageCard from "./ImageCard";
import formatDate from "@/utils/formatDate";

interface PersonCardProps {
  person: PersonType;
  showButton?: boolean;
  setSelectedPerson: (person: PersonType | null) => void;
}

const PersonCard: React.FC<PersonCardProps> = ({ person, setSelectedPerson, showButton }) => {
  return (
    <Card
      className="text-lg shadow-lg"
      title={
        <p
          className={`font-bold text-center ${
            person.status === "Resgatado" ? "text-green-500" : "text-red-500"
          }`}
        >
          {person.status === "Resgatado" ? "🟢" : "⚠️"} {person.status}
        </p>
      }
      style={{ width: 300, padding: 0, margin: 0 }}
      styles={{
        body: { padding: showButton ? "0 0 50px 0" : "0", minHeight: "300px" },
      }}
    >
      <div className="w-[300px] h-[300px] relative">
        <ImageCard photoUrl={person.photoUrl as string} />
      </div>
      <div className="flex justify-between flex-col p-2 h-full">
        <h3 className="font-bold text-2xl my-2">
          {person.name}, {person.age && person.age}
        </h3>
        <p>Cidade: {person.cidade}</p>
        {person.endereco && <p>Endereço: {person.endereco}</p>}
        {person.status === "Resgatado" && (
          <>
            {person.abrigo && <p>Abrigo: {person.abrigo}</p>}
            {person.entrada && <p>Data de entrada: {formatDate(person.entrada)}</p>}
          </>
        )}
      </div>
      <div className="flex justify-center p-2 absolute bottom-0 w-full">
        {showButton ? (
          <Button
            type="primary"
            className="w-full"
            onClick={() => setSelectedPerson(person)}
          >
            Ver detalhes
          </Button>
        ) : (
          <Button
            type="primary"
            className="w-full"
            onClick={() => setSelectedPerson(person)}
          >
            Editar
          </Button>
        )}
      </div>
    </Card>
  );
};

export default PersonCard;
