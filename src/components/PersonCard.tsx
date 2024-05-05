import React from "react";
import Image from "next/image";
import { Button, Card } from "antd";
import { PersonType } from "@/types/person";
import ImageCard from "./ImageCard";

interface PersonCardProps {
  person: PersonType;
}

const PersonCard: React.FC<PersonCardProps> = ({ person }) => {
  function formatDate(milliseconds: string) {
    const date = new Date(parseInt(milliseconds));
    const day = String(date.getDate()).padStart(2, '0'); // Garante que o dia tenha dois dígitos
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Garante que o mês tenha dois dígitos
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  
  return (
    <Card
      className="text-lg shadow-lg"
      actions={[
        <Button 
          key="auxiliar-button"
          className="bg-orange-300/50 hover:bg-orange-400 border-orange-300 hover:border-orange-400"
          onClick={() => console.log("Editar")}
        >
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
            {person.entrada && (
              <p>Data de entrada: {formatDate(person.entrada)}</p>
            )}
          </>
        )}
      </div>
    </Card>
  );
};

export default PersonCard;
