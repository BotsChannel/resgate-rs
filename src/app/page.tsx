"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button, Collapse, Input, Select, Spin } from "antd";
import CreatePersonModal from "@/components/CreatePersonModal";
import Filtros from "@/components/FiltersCollpase";
import PersonCard from "@/components/PersonCard";
import PersonModal from "@/components/PersonModal";

const Resgate: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [minAge, setMinAge] = useState<number>(0);
  const [maxAge, setMaxAge] = useState<number>(120);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [people, setPeople] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<any | null>(null);
  const [createPersonModalOpen, setCreatePersonModalOpen] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(9);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/people");
        const fetchedPeople = await response.json();

        setPeople(
          fetchedPeople.sort((a: { timestamp: number }, b: { timestamp: number }) => {
            return Number(new Date(b.timestamp)) - Number(new Date(a.timestamp));
          })
        );
        setLoading(false);
      } catch (error: any) {
        setError(error.message || "Erro ao buscar pessoas.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const indexOfLastItem = indexOfFirstItem + itemsPerPage;

  const filteredPeople = people.filter(
    (person: { name: string; cidade: string; age: number; status: string }) => {
      const matchesSearchText = person.name.toLowerCase().includes(searchText.toLowerCase());
      const matchesCity = selectedCity ? person.cidade === selectedCity : true;
      const isInAgeRange = person.age ? person.age >= minAge && person.age <= maxAge : true;
      const matchesStatus = statusFilter !== null ? person.status === statusFilter : true;

      return matchesSearchText && matchesCity && isInAgeRange && matchesStatus;
    }
  );

  const currentItems = filteredPeople.slice(indexOfFirstItem, indexOfLastItem);
  
  return (
    <>
      <CreatePersonModal
      isOpen={createPersonModalOpen}
      setIsOpen={setCreatePersonModalOpen}
      person={selectedPerson} /><PersonModal
        person={selectedPerson}
        setSelectedPerson={setSelectedPerson}
        setCreatePersonModal={setCreatePersonModalOpen} /><div className="container mx-auto px-4 py-8 space-y-8 max-w-5xl min-h-screen">
        <div className="flex flex-row items-start space-x-4 justify-center mt-4">
          <Image
            src="https://mhlvqqjzhwsfunzjwdxs.supabase.co/storage/v1/object/public/images/android-chrome-192x192.png"
            alt="Rio Grande do Sul Logo"
            width={100}
            height={100}
          />
          <h1 className="text-4xl lg:text-7xl font-bold text-center text-gray-800 lg:mb-12">
            RS Resgate
          </h1>
        </div>
        <p className="text-lg text-gray-800 text-center">
          Encontre pessoas resgatadas e desaparecidas em tempo real.
        </p>
        <div className="flex flex-col">
          <p className="ant-form-item-label mb-2 text-md">Nome</p>

          <Input
            type="text"
            placeholder="Buscar por nome..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="border border-gray-300 min-h-[40px]"
            style={{
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
              marginBottom: "0.75rem",
            }} />
          <Collapse
            size="large"
            items={[
              {
                key: "1",
                label: "Filtrar pessoas",
                children: (
                  <Filtros
                    people={people}
                    searchText={searchText}
                    setSearchText={setSearchText}
                    setMinAge={setMinAge}
                    setMaxAge={setMaxAge}
                    selectedCity={selectedCity}
                    setSelectedCity={setSelectedCity} />
                ),
              },
            ]} />
        </div>
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
            ]} />
          <Button
            type="primary"
            size="large"
            className="px-8 min-h-12"
            onClick={() => {
              setSelectedPerson(null);
              setCreatePersonModalOpen(true);
            } }
          >
            Adicionar pessoa
          </Button>
        </div>
        {/* Exibir lista de cartões de pessoas filtradas */}
        {/* Displaying filtered people with pagination */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-4">
            {filteredPeople.length} pessoas encontradas
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center bg-gray-200 p-4">
          {currentItems.map((person: any) => (
            <PersonCard key={person.id} person={person} showButton setSelectedPerson={setSelectedPerson} />
          ))}
          {filteredPeople.length === 0 && !loading && !error && (
            <p className="text-lg text-gray-800 text-center col-span-3">
              Nenhuma pessoa encontrada com os filtros selecionados.
            </p>
          )}
          {loading && (
            <div className="flex justify-center w-full col-span-3">
              <Spin size="large" />
            </div>
          )}
          {error && (
            <p className="text-lg text-red-500 text-center col-span-3 p-2">
              Ocorreu um erro ao buscar as pessoas. Por favor, tente novamente.
            </p>
          )}
        </div>

        {/* Pagination controls */}
        <div className="flex justify-center my-4">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="mx-2"
          >
            Anterior
          </Button>
          <span>
            Página {currentPage} de {Math.ceil(filteredPeople.length / itemsPerPage)}
          </span>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={indexOfLastItem >= filteredPeople.length}
            className="mx-2"
          >
            Próxima
          </Button>
        </div>
      </div>
    </>
  );
};

export default Resgate;
