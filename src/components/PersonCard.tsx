import React from 'react';
import Image from 'next/image';

interface Person {
  id: string;
  name: string;
  age: number;
  cidade: string;
  endereco: string;
  status: string;
  photoUrl: string;
}

interface PersonCardProps {
  person: Person;
}

const PersonCard: React.FC<PersonCardProps> = ({ person }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-64">
      <p 
        className={`text-md font-bold text-center ${person.status === 'Desaparecido' ? 'text-red-500' : 'text-green-500'}`}>
          {person.status === 'Desaparecido' ? '🚨' : '✅'}
          {person.status}
      </p>
      <Image 
        src={person.photoUrl} 
        alt={person.name} 
        width={256}
        height={256}
        className="w-full h-auto rounded-md mt-4"
      />
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-black">
          {person.name.length > 15 ? `${person.name.slice(0, 15)}...` : person.name}, <span className="text-md font-normal">{person.age}</span>
        </h3>
        <p className="font-normal text-black">
          {person.cidade}
        </p>
      </div>
    </div>
  );
};

export default PersonCard;