import React from 'react';
import Image from 'next/image';

interface Person {
  id: string;
  name: string;
  age: number;
  status: string;
  photoUrl: string;
}

interface PersonCardProps {
  person: Person;
}

const PersonCard: React.FC<PersonCardProps> = ({ person }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-64">
      <Image src={person.photoUrl} alt={person.name} className="w-full h-auto rounded-md" />
      <div className="mt-4">
        <h3 className="text-lg font-semibold">{person.name}</h3>
        <p className="text-sm text-gray-600">Idade: {person.age}</p>
        <p className="text-sm text-gray-600">Status: {person.status}</p>
      </div>
    </div>
  );
};

export default PersonCard;