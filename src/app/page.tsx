"use client";
import React, { useState } from "react";
import PersonCardList from "@/components/PersonCardList";
import { Button, Collapse, Form, Input, Modal, Select, Slider, Upload } from "antd";
import { PersonType } from "../../types/person";
import { UploadOutlined } from "@ant-design/icons";

const people: PersonType[] = [
  {
    id: "1",
    name: "Ana Silva",
    age: 32,
    status: "Desaparecido",
    cidade: "Porto Alegre",
    endereco: "Rua das Flores, 123",
  },
  {
    id: "2",
    name: "Pedro Santos",
    age: 28,
    status: "Resgatado",
    photoUrl:
      "https://mhlvqqjzhwsfunzjwdxs.supabase.co/storage/v1/object/public/images/default.png",
    cidade: "Guaíba",
    endereco: "Avenida Principal, 456",
  },
  {
    id: "3",
    name: "Mariana Oliveira",
    age: 41,
    status: "Desaparecido",
    photoUrl:
      "https://mhlvqqjzhwsfunzjwdxs.supabase.co/storage/v1/object/public/images/default.png",
    cidade: "Porto Alegre",
    endereco: "Rua das Margaridas, 789",
  },
  {
    id: "4",
    name: "Lucas Costa",
    age: 25,
    status: "Resgatado",
    photoUrl:
      "https://mhlvqqjzhwsfunzjwdxs.supabase.co/storage/v1/object/public/images/default.png",
    cidade: "Canoas",
    endereco: "Travessa dos Pinheiros, 567",
  },
  {
    id: "5",
    name: "Camila Ferreira",
    age: 36,
    status: "Desaparecido",
    photoUrl:
      "https://mhlvqqjzhwsfunzjwdxs.supabase.co/storage/v1/object/public/images/default.png",
    cidade: "Novo Hamburgo",
    endereco: "Rua dos Lírios, 890",
  },
  {
    id: "6",
    name: "Rafaela Souza",
    age: 29,
    status: "Desaparecido",
    photoUrl:
      "https://mhlvqqjzhwsfunzjwdxs.supabase.co/storage/v1/object/public/images/default.png",
    cidade: "Porto Alegre",
    endereco: "Avenida das Palmeiras, 234",
  },
  {
    id: "7",
    name: "Gustavo Martins",
    age: 47,
    status: "Resgatado",
    photoUrl:
      "https://mhlvqqjzhwsfunzjwdxs.supabase.co/storage/v1/object/public/images/default.png",
    cidade: "Cachoeirinha",
    endereco: "Rua dos Girassóis, 678",
  },
  {
    id: "8",
    name: "Isabela Lima",
    age: 34,
    status: "Desaparecido",
    photoUrl:
      "https://mhlvqqjzhwsfunzjwdxs.supabase.co/storage/v1/object/public/images/default.png",
    cidade: "Gravataí",
    endereco: "Avenida das Acácias, 345",
  },
  {
    id: "9",
    name: "Felipe Almeida",
    age: 22,
    status: "Resgatado",
    photoUrl:
      "https://mhlvqqjzhwsfunzjwdxs.supabase.co/storage/v1/object/public/images/default.png",
    cidade: "São Leopoldo",
    endereco: "Rua das Violetas, 123",
  },
  {
    id: "10",
    name: "Carolina Santos",
    age: 39,
    status: "Desaparecido",
    photoUrl:
      "https://mhlvqqjzhwsfunzjwdxs.supabase.co/storage/v1/object/public/images/default.png",
    cidade: "Porto Alegre",
    endereco: "Avenida das Hortênsias, 890",
  },
  {
    id: "11",
    name: "Thiago Oliveira",
    age: 31,
    status: "Resgatado",
    photoUrl:
      "https://mhlvqqjzhwsfunzjwdxs.supabase.co/storage/v1/object/public/images/default.png",
    cidade: "Canoas",
    endereco: "Rua dos Cravos, 456",
  },
  {
    id: "12",
    name: "Amanda Rodrigues",
    age: 27,
    status: "Desaparecido",
    photoUrl:
      "https://mhlvqqjzhwsfunzjwdxs.supabase.co/storage/v1/object/public/images/default.png",
    cidade: "Novo Hamburgo",
    endereco: "Avenida das Azaleias, 789",
  },
  {
    id: "13",
    name: "Bruno Oliveira",
    age: 43,
    status: "Resgatado",
    photoUrl:
      "https://mhlvqqjzhwsfunzjwdxs.supabase.co/storage/v1/object/public/images/default.png",
    cidade: "Guaíba",
    endereco: "Rua das Orquídeas, 234",
  },
  {
    id: "14",
    name: "Juliana Mendes",
    age: 26,
    status: "Desaparecido",
    photoUrl:
      "https://mhlvqqjzhwsfunzjwdxs.supabase.co/storage/v1/object/public/images/default.png",
    cidade: "Porto Alegre",
    endereco: "Travessa das Bromélias, 567",
  },
  {
    id: "15",
    name: "Marcos Fernandes",
    age: 37,
    status: "Desaparecido",
    photoUrl:
      "https://mhlvqqjzhwsfunzjwdxs.supabase.co/storage/v1/object/public/images/default.png",
    cidade: "Canoas",
    endereco: "Avenida dos Jasmins, 890",
  },
  {
    id: "16",
    name: "Carla Santos",
    age: 33,
    status: "Resgatado",
    photoUrl:
      "https://mhlvqqjzhwsfunzjwdxs.supabase.co/storage/v1/object/public/images/default.png",
    cidade: "Gravataí",
    endereco: "Rua das Camélias, 123",
  },
  {
    id: "17",
    name: "Renato Costa",
    age: 44,
    status: "Desaparecido",
    photoUrl:
      "https://mhlvqqjzhwsfunzjwdxs.supabase.co/storage/v1/object/public/images/default.png",
    cidade: "Novo Hamburgo",
    endereco: "Avenida das Magnólias, 456",
  },
  {
    id: "18",
    name: "Fernanda Lima",
    age: 30,
    status: "Resgatado",
    photoUrl:
      "https://mhlvqqjzhwsfunzjwdxs.supabase.co/storage/v1/object/public/images/default.png",
    cidade: "Cachoeirinha",
    endereco: "Rua das Tulipas, 789",
  },
  {
    id: "19",
    name: "Diego Pereira",
    age: 29,
    status: "Desaparecido",
    photoUrl:
      "https://mhlvqqjzhwsfunzjwdxs.supabase.co/storage/v1/object/public/images/default.png",
    cidade: "São Leopoldo",
    endereco: "Avenida das Begônias, 234",
  },
  {
    id: "20",
    name: "Tatiana Souza",
    age: 35,
    status: "Resgatado",
    photoUrl:
      "https://mhlvqqjzhwsfunzjwdxs.supabase.co/storage/v1/object/public/images/default.png",
    cidade: "Guaíba",
    endereco: "Travessa das Margaridas, 567",
  },
];

const Filtros = ({
  searchText,
  setSearchText,
  setMinAge,
  setMaxAge,
  selectedCity,
  setSelectedCity,
}: {
  searchText: string;
  setSearchText: (value: string) => void;
  setMinAge: (value: number) => void;
  setMaxAge: (value: number) => void;
  selectedCity: string;
  setSelectedCity: (value: string) => void;
}) => {
  const [form] = Form.useForm();
  const cities = Array.from(new Set(people.map((person) => person.cidade)));

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={() => {}}
    >
      <Form.Item label="Nome">
        <Input
          type="text"
          placeholder="Buscar por nome..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 mb-4"
        />
      </Form.Item>
      <Form.Item label="Sexo">
        <Select
          placeholder="Selecione o sexo"
          className="min-h-[40px]"
          options={[
            { label: "Masculino", value: "masculino" },
            { label: "Feminino", value: "feminino" },
            { label: "Animal", value: "animal" },
          ]}
        />
      </Form.Item>
      <Form.Item label="Idade">
        <Slider
          range
          min={0}
          max={120}
          defaultValue={[0, 100]}
          onChange={(value) => {
            setMinAge(value[0]);
            setMaxAge(value[1]);
          }}
        />
      </Form.Item>
      <Form.Item label="Cidade">
        <Select
          placeholder="Selecione a cidade"
          className="min-h-[40px]"
          options={cities.map((city) => ({ label: city, value: city }))}
          onChange={(value) => setSelectedCity(value)}
          value={selectedCity}
        />
      </Form.Item>
      <Form.Item label="Ultimo endereço conhecido">
        <Input
          type="text"
          placeholder="Buscar por endereço..."
          className="border border-gray-300 rounded px-3 py-2 mb-4"
        />
      </Form.Item>
      {/* <div className="flex justify-end">
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          className="px-8 min-h-12"
        >
          Filtrar
        </Button>
      </div> */}
    </Form>
  );
};

const CreatePersonModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string>("Desaparecido");
  const [form] = Form.useForm();

  function submitPerson() {
    const values = form.getFieldsValue();
    console.log(values);
  }

  return (
    <Modal
      title={<h2 className="text-xl font-bold text-gray-800 mb-4">Adicionar pessoa</h2>}
      open={isOpen}
      closable
      closeIcon
      onCancel={() => setIsOpen(false)}
      centered
      destroyOnClose
      footer={null}
    >
      <Form
        layout="vertical"
        form={form}
        initialValues={{ remember: true }}
        onFinish={submitPerson}
      >
        <Form.Item
          label="Nome"
          required
          name="name"
          rules={[{ required: true, message: "Por favor, insira o nome da pessoa" }]}
        >
          <Input
            type="text"
            placeholder="Nome da pessoa"
          />
        </Form.Item>
        <Form.Item
          label="Idade"
          name="age"
        >
          <Input
            type="number"
            placeholder="Idade da pessoa"
          />
        </Form.Item>
        <Form.Item
          label="Cidade"
          required
          name="cidade"
          rules={[{ required: true, message: "Por favor, insira a cidade da pessoa" }]}
        >
          <Input
            type="text"
            placeholder="Cidade da pessoa"
          />
        </Form.Item>
        <Form.Item
          label="Endereço"
          name="endereco"
        >
          <Input
            type="text"
            placeholder="Endereço da pessoa"
          />
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
        >
          <Select
            placeholder="Selecione o status"
            onChange={(value) => setSelectedStatus(value)}
            options={[
              { label: "Desaparecido", value: "Desaparecido" },
              { label: "Resgatado", value: "Resgatado" },
            ]}
          />
        </Form.Item>

        {selectedStatus === "Resgatado" && (
          <>
            <Form.Item
              label="Abrigo"
              name="abrigo"
            >
              <Input
                type="text"
                placeholder="Abrigo onde a pessoa foi resgatada"
              />
            </Form.Item>
            <Form.Item
              label="Data de entrada"
              name="dataEntrada"
            >
              <Input
                type="date"
                placeholder="Data de entrada no abrigo"
              />
            </Form.Item>
          </>
        )}

        <Form.Item
          label="Foto"
          name="photoUrl"
        >
          <Upload
            name="arquivo"
            // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
          >
            <Button icon={<UploadOutlined />}>Clique para enviar uma foto</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name="info"
          label="Informações adicionais"
        >
          <Input.TextArea placeholder="Informações adicionais sobre a pessoa" />
        </Form.Item>
        <div className="flex justify-end">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
          >
            Adicionar pessoa
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

const Resgate: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [minAge, setMinAge] = useState<number>(0);
  const [maxAge, setMaxAge] = useState<number>(120);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  // const people = await getPeople();

  // Function to filter people based on search text, city, age, and status
  const filteredPeople = people.filter((person) => {
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
          Resgate RS
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
