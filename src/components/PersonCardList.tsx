import React from 'react';
import PersonCard from './PersonCard';

interface Person {
  id: string;
  name: string;
  age: number;
  cidade: string;
  endereco: string;
  status: string;
  photoUrl: string;
}

interface PersonCardListProps {
  people: Person[];
}

const PersonCardList: React.FC<PersonCardListProps> = ({ people }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
      {people.map(person => (
        <PersonCard key={person.id} person={person} />
      ))}
    </div>
  );
};

export default PersonCardList;