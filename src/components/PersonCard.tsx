import { PersonType } from "@/types/person";
import { Button, Card } from "antd";
import React from "react";
import ImageCard from "./ImageCard";
import formatDate from "@/utils/formatDate";
import moment from 'moment';
import 'moment/locale/pt-br'

moment.locale('pt-br')

interface PersonCardProps {
  person: PersonType;
  showButton?: boolean;
  setSelectedPerson: (person: PersonType | null) => void;
  setIsModalOpen?: (value: boolean) => void;
  hideTitle?: boolean;
}

const PersonCard: React.FC<PersonCardProps> = ({
  person,
  setSelectedPerson,
  showButton,
  setIsModalOpen,
  hideTitle,
}) => {
  if (!person) return null;
  return (
    <div className="flex flex-col items-center">
      {person.timestamp && (
        console.log(person.timestamp),
        <p className="text-gray-500 text-sm m-2">
          {moment(person.timestamp).fromNow()}
        </p>
      )}
      <Card
        className="text-lg shadow-lg h-full rounded-lg"
        title={
          hideTitle ? null : (  
            <p
              className={`font-bold text-center ${
                person.status === "Resgatado" ? "text-green-500" : "text-red-500"
              }`}
            >
              {person.status === "Resgatado" ? "🟢" : "⚠️"} {person.status}
            </p>
          )
        }
        style={{ width: 300, padding: 0, margin: 0, borderRadius: "10px" }}
        styles={{
          body: {
            padding: showButton ? "0 0 50px 0" : "0",
            minHeight: "300px",
            borderRadius: "10px",
          },
        }}
      >
        <div className={`w-[300px] h-[300px] relative ${hideTitle ? "rounded-t-lg" : ""}`}>
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
        <div className="flex justify-center mt-[35px] absolute bottom-0 w-full">
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
              onClick={() => {
                setSelectedPerson(person);
                setIsModalOpen && setIsModalOpen(true);
              }}
            >
              Editar
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default PersonCard;
