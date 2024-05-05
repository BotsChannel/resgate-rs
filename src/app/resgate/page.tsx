'use client';
import React, { useState } from 'react';
import PersonCardList from '@/components/PersonCardList';

interface Person {
  id: string;
  name: string;
  age: number;
  status: string;
  photoUrl: string;
  cidade: string;
  endereco: string;
}

const Resgate: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [minAge, setMinAge] = useState<number>(0);
  const [maxAge, setMaxAge] = useState<number>(100);
  const [statusFilter, setStatusFilter] = useState<string>('');

  // const people = await getPeople();
  const people: Person[] = [
    {
      id: '1',
      name: 'Ana Silva',
      age: 32,
      status: 'Desaparecido',
      photoUrl: 'https://mhlvqqjzhwsfunzjwdxs.supabase.co/storage/v1/object/public/images/default.png',
      cidade: 'Porto Alegre',
      endereco: 'Rua das Flores, 123',
    },
    {
      id: '2',
      name: 'Pedro Santos',
      age: 28,
      status: 'Resgatado',
      photoUrl: 'https://mhlvqqjzhwsfunzjwdxs.supabase.co/storage/v1/object/public/images/default.png',
      cidade: 'Guaíba',
      endereco: 'Avenida Principal, 456',
    },
    {
      id: '3',
      name: 'Mariana Oliveira',
      age: 41,
      status: 'Desaparecido',
      photoUrl: 'https://mhlvqqjzhwsfunzjwdxs.supabase.co/storage/v1/object/public/images/default.png',
      cidade: 'Porto Alegre',
      endereco: 'Rua das Margaridas, 789',
    },
    {
      id: '4',
      name: 'Lucas Costa',
      age: 25,
      status: 'Resgatado',
      photoUrl: 'https://mhlvqqjzhwsfunzjwdxs.supabase.co/storage/v1/object/public/images/default.png',
      cidade: 'Canoas',
      endereco: 'Travessa dos Pinheiros, 567',
    },
    {
      id: '5',
      name: 'Camila Ferreira',
      age: 36,
      status: 'Desaparecido',
      photoUrl: 'https://mhlvqqjzhwsfunzjwdxs.supabase.co/storage/v1/object/public/images/default.png',
      cidade: 'Novo Hamburgo',
      endereco: 'Rua dos Lírios, 890',
    },
    {
      id: '6',
      name: 'Rafaela Souza',
      age: 29,
      status: 'Desaparecido',
      photoUrl: 'https://mhlvqqjzhwsfunzjwdxs.supabase.co/storage/v1/object/public/images/default.png',
      cidade: 'Porto Alegre',
      endereco: 'Avenida das Palmeiras, 234',
    },
    {
      id: '7',
      name: 'Gustavo Martins',
      age: 47,
      status: 'Resgatado',
      photoUrl: 'https://mhlvqqjzhwsfunzjwdxs.supabase.co/storage/v1/object/public/images/default.png',
      cidade: 'Cachoeirinha',
      endereco: 'Rua dos Girassóis, 678',
    },
    {
      id: '8',
      name: 'Isabela Lima',
      age: 34,
      status: 'Desaparecido',
      photoUrl: 'https://mhlvqqjzhwsfunzjwdxs.supabase.co/storage/v1/object/public/images/default.png',
      cidade: 'Gravataí',
      endereco: 'Avenida das Acácias, 345',
    },
    {
      id: '9',
      name: 'Felipe Almeida',
      age: 22,
      status: 'Resgatado',
      photoUrl: 'https://mhlvqqjzhwsfunzjwdxs.supabase.co/storage/v1/object/public/images/default.png',
      cidade: 'São Leopoldo',
      endereco: 'Rua das Violetas, 123',
    },
    {
      id: '10',
      name: 'Carolina Santos',
      age: 39,
      status: 'Desaparecido',
      photoUrl: 'https://mhlvqqjzhwsfunzjwdxs.supabase.co/storage/v1/object/public/images/default.png',
      cidade: 'Porto Alegre',
      endereco: 'Avenida das Hortênsias, 890',
    },
    {
      id: '11',
      name: 'Thiago Oliveira',
      age: 31,
      status: 'Resgatado',
      photoUrl: 'https://mhlvqqjzhwsfunzjwdxs.supabase.co/storage/v1/object/public/images/default.png',
      cidade: 'Canoas',
      endereco: 'Rua dos Cravos, 456',
    },
    {
      id: '12',
      name: 'Amanda Rodrigues',
      age: 27,
      status: 'Desaparecido',
      photoUrl: 'https://mhlvqqjzhwsfunzjwdxs.supabase.co/storage/v1/object/public/images/default.png',
      cidade: 'Novo Hamburgo',
      endereco: 'Avenida das Azaleias, 789',
    },
    {
      id: '13',
      name: 'Bruno Oliveira',
      age: 43,
      status: 'Resgatado',
      photoUrl: 'https://mhlvqqjzhwsfunzjwdxs.supabase.co/storage/v1/object/public/images/default.png',
      cidade: 'Guaíba',
      endereco: 'Rua das Orquídeas, 234',
    },
    {
      id: '14',
      name: 'Juliana Mendes',
      age: 26,
      status: 'Desaparecido',
      photoUrl: 'https://mhlvqqjzhwsfunzjwdxs.supabase.co/storage/v1/object/public/images/default.png',
      cidade: 'Porto Alegre',
      endereco: 'Travessa das Bromélias, 567',
    },
    {
      id: '15',
      name: 'Marcos Fernandes',
      age: 37,
      status: 'Desaparecido',
      photoUrl: 'https://mhlvqqjzhwsfunzjwdxs.supabase.co/storage/v1/object/public/images/default.png',
      cidade: 'Canoas',
      endereco: 'Avenida dos Jasmins, 890',
    },
    {
      id: '16',
      name: 'Carla Santos',
      age: 33,
      status: 'Resgatado',
      photoUrl: 'https://mhlvqqjzhwsfunzjwdxs.supabase.co/storage/v1/object/public/images/default.png',
      cidade: 'Gravataí',
      endereco: 'Rua das Camélias, 123',
    },
    {
      id: '17',
      name: 'Renato Costa',
      age: 44,
      status: 'Desaparecido',
      photoUrl: 'https://mhlvqqjzhwsfunzjwdxs.supabase.co/storage/v1/object/public/images/default.png',
      cidade: 'Novo Hamburgo',
      endereco: 'Avenida das Magnólias, 456',
    },
    {
      id: '18',
      name: 'Fernanda Lima',
      age: 30,
      status: 'Resgatado',
      photoUrl: 'https://mhlvqqjzhwsfunzjwdxs.supabase.co/storage/v1/object/public/images/default.png',
      cidade: 'Cachoeirinha',
      endereco: 'Rua das Tulipas, 789',
    },
    {
      id: '19',
      name: 'Diego Pereira',
      age: 29,
      status: 'Desaparecido',
      photoUrl: 'https://mhlvqqjzhwsfunzjwdxs.supabase.co/storage/v1/object/public/images/default.png',
      cidade: 'São Leopoldo',
      endereco: 'Avenida das Begônias, 234',
    },
    {
      id: '20',
      name: 'Tatiana Souza',
      age: 35,
      status: 'Resgatado',
      photoUrl: 'https://mhlvqqjzhwsfunzjwdxs.supabase.co/storage/v1/object/public/images/default.png',
      cidade: 'Guaíba',
      endereco: 'Travessa das Margaridas, 567',
    },
  ];

  const cities = Array.from(new Set(people.map((person) => person.cidade)));

  // Function to filter people based on search text, city, age, and status
  const filteredPeople = people.filter((person) => {
    const matchesSearchText = person.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesCity = selectedCity ? person.cidade === selectedCity : true;
    const isInAgeRange = person.age >= minAge && person.age <= maxAge;
    const matchesStatus = statusFilter ? person.status === statusFilter : true;

    return matchesSearchText && matchesCity && isInAgeRange && matchesStatus;
  });

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-4">Pessoas Desaparecidas ou Encontradas</h1>

      {/* Search input */}
      <input
        type="text"
        placeholder="Buscar por nome..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 mb-4"
      />

      {/* City filter dropdown */}
      <select
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 mb-4"
      >
        <option value="">Todas as cidades</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      {/* Age range filter */}
      <div className="flex items-center mb-4">
        <label className="mr-2">Idade:</label>
        <input
          type="number"
          placeholder="Mínimo"
          value={minAge}
          onChange={(e) => setMinAge(parseInt(e.target.value))}
          className="border border-gray-300 rounded px-2 py-1 mr-2 w-20 text-center"
        />
        -
        <input
          type="number"
          placeholder="Máximo"
          value={maxAge}
          onChange={(e) => setMaxAge(parseInt(e.target.value))}
          className="border border-gray-300 rounded px-2 py-1 ml-2 w-20 text-center"
        />
      </div>

      {/* Status filter */}
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 mb-4"
      >
        <option value="">Todos os status</option>
        <option value="Desaparecido">Desaparecido</option>
        <option value="Resgatado">Resgatado</option>
      </select>

      {/* Display filtered person cards */}
      <PersonCardList people={filteredPeople} />
    </div>
  );
};

export default Resgate;