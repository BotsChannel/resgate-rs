"use client";
import CreatePersonModal from "@/components/CreatePersonModal";
import Filtros from "@/components/FiltersCollpase";
import PersonCardList from "@/components/PersonCardList";
import { Button, Collapse, Select } from "antd";
import React, { useState, useEffect } from "react";

const Resgate: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [minAge, setMinAge] = useState<number>(0);
  const [maxAge, setMaxAge] = useState<number>(120);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [people, setPeople] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedPeople = await fetch("/api/people").then((res) => res.json());
      console.log(fetchedPeople);

      const formattedPeople = fetchedPeople.map((person: { name: string; age: number; status: string; photoUrl: string; cidade: string; endereco: string; abrigo: string; entrada: string; }) => ({
        name: person.name,
        age: person.age,
        status: person.status,
        photoUrl: person.photoUrl,
        cidade: person.cidade,
        endereco: person.endereco,
        abrigo: person.abrigo,
        entrada: person.entrada,
      }));

      setPeople(formattedPeople);
    };

    fetchData();
  }, []);

  // Function to filter people based on search text, city, age, and status
  const filteredPeople = people.filter((person: { name: string; cidade: string; age: number; status: string; }) => {
    const matchesSearchText = person.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesCity = selectedCity ? person.cidade === selectedCity : true;
    const isInAgeRange = person.age ? person.age >= minAge && person.age <= maxAge : true;
    const matchesStatus = statusFilter !== null ? person.status === statusFilter : true;

    return matchesSearchText && matchesCity && isInAgeRange && matchesStatus;
  });

  return (
    <>
      <CreatePersonModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />
      <div className="container mx-auto px-4 py-8 space-y-8 max-w-5xl">
        <h1 className="text-4xl lg:text-7xl font-bold text-center text-gray-800 mb-4 lg:mb-12">
          RS Resgate
        </h1>
        <Collapse
          size="large"
          defaultActiveKey={["1"]}
          items={[
            {
              key: "1",
              label: "Pesquisar por pessoa",
              children: (
                <Filtros
                  people={people}
                  searchText={searchText}
                  setSearchText={setSearchText}
                  setMinAge={setMinAge}
                  setMaxAge={setMaxAge}
                  selectedCity={selectedCity}
                  setSelectedCity={setSelectedCity}
                />
              ),
            },
          ]}
        />

        <div className="flex justify-between items-center flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 ">
          <Select
            onChange={(value) => setStatusFilter(value)}
            placeholder="Selecione a cidade"
            className="min-h-[40px] min-w-[150px]"
            value={statusFilter}
            options={[
              { label: "Todos", value: null },
              { label: "Desaparecido", value: "Desaparecido" },
              { label: "Resgatado", value: "Resgatado" },
            ]}
          />
          <Button
            type="primary"
            size="large"
            className="px-8 min-h-12"
            onClick={() => setIsModalOpen(true)}
          >
            Adicionar pessoa
          </Button>
        </div>
        {/* Exibir lista de cartões de pessoas filtradas */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4  border-b border-gray-300 pb-4">
            {filteredPeople.length} pessoas encontradas
          </h2>
        </div>
        <PersonCardList people={filteredPeople} />
        {filteredPeople.length === 0 && (
          <p className="text-lg text-gray-800 text-center">
            Nenhuma pessoa encontrada com os filtros selecionados.
          </p>
        )}
      </div>
    </>
  );
};

export default Resgate;
