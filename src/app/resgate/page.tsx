import React from 'react';
import { GetStaticProps, NextPage } from 'next';
import PersonCardList from '@/components/PersonCardList';
import { getPeople } from '@/lib/prisma/queries/people';

interface Person {
  id: string;
  name: string;
  age: number;
  status: string;
  photoUrl: string;
}

interface HomeProps {
  people: Person[];
}

async function Resgate() {
    const people = await getPeople();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Pessoas Desaparecidas ou Encontradas</h1>
            <PersonCardList people={people} />
        </div>
    );
};

export default Resgate;