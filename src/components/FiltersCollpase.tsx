import { Form, Select, Slider, Button, Input } from "antd";
import fakePeople from "../../data/fakePeople";

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
  const cities = Array.from(new Set(fakePeople.map((person) => person.cidade)));

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
      <Button
        onClick={() => {
          form.resetFields();
          setSearchText("");
          setMinAge(0);
          setMaxAge(120);
          setSelectedCity("");
        }}
      >
        Limpar filtros
      </Button>
    </Form>
  );
};

export default Filtros;
