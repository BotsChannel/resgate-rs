import React from "react";
import PersonCard from "./PersonCard";
import { PersonType } from "../../types/person";

interface PersonCardListProps {
  people: PersonType[];
}

const PersonCardList: React.FC<PersonCardListProps> = ({ people }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
      {people.map((person) => (
        <PersonCard
          key={person.id}
          person={person}
        />
      ))}
    </div>
  );
};

export default PersonCardList;
