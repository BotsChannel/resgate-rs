import React from "react";
import Image from "next/image";
import { Button, Card } from "antd";
import { PersonType } from "../../types/person";
import silhuetas from "../../public/silhuetas.png";

interface PersonCardProps {
  person: PersonType;
}

const PersonCard: React.FC<PersonCardProps> = ({ person }) => {
  return (
    <Card
      className="text-lg shadow-lg"
      actions={[
        <Button className="bg-orange-300/50 hover:bg-orange-400 border-orange-300 hover:border-orange-400">
          Auxiliar
        </Button>,
      ]}
      title={
        <p
          className={`font-bold text-center ${
            person.status === "Resgatado" ? "text-green-500" : "text-red-500"
          }`}
        >
          {person.status === "Resgatado" ? "🟢" : "⚠️"} {person.status}
        </p>
      }
      style={{ width: 300, padding: 0, margin: 10 }}
      styles={{ body: { padding: "0", minHeight: "350px" } }}
    >
      <div className="w-[300px] h-[300px] relative">
        <Image
          src={person.photoUrl || silhuetas}
          alt={person.name}
          fill
          className="object-cover"
          sizes="300px"
        />
      </div>
      <div className="flex justify-between flex-col p-2 h-full">
        <h3 className="font-bold text-2xl my-2">
          {person.name}, {person.age && person.age}
        </h3>
        <p>Cidade: {person.cidade}</p>
        {person.endereco && <p>Endereço: {person.endereco}</p>}
        {person.abrigo && <p>Abrigo: {person.abrigo}</p>}
        {person.dataEntrada && (
          <p>Data de entrada: {new Date(person.dataEntrada).toLocaleDateString()}</p>
        )}
        {person.info && <p>Informações adicionais: {person.info}</p>}
      </div>
    </Card>
  );
};

export default PersonCard;
