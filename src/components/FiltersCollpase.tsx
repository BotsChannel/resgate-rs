import { Form, Select, Slider, Button, Input } from "antd";
import cidades from "@/data/cidades";
import { useForm } from "antd/es/form/Form";

const Filtros = ({
  people,
  searchText,
  setSearchText,
  setMinAge,
  setMaxAge,
  selectedCity,
  setSelectedCity,
}: {
  people: any[];
  searchText: string;
  setSearchText: (value: string) => void;
  setMinAge: (value: number) => void;
  setMaxAge: (value: number) => void;
  selectedCity: string;
  setSelectedCity: (value: string) => void;
}) => {
  const [form] = useForm();
  const { Item } = Form;

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={() => {}}
    >
      <Item
        label="Sexo"
        name="sexo"
      >
        <Select
          placeholder="Selecione o sexo"
          className="min-h-[40px]"
          options={[
            { label: "Masculino", value: "masculino" },
            { label: "Feminino", value: "feminino" },
            { label: "Animal", value: "animal" },
          ]}
        />
      </Item>
      <Item
        label="Idade"
        name="age"
      >
        <Slider
          range
          min={0}
          max={120}
          defaultValue={[0, 120]}
          onChange={(value) => {
            setMinAge(value[0]);
            setMaxAge(value[1]);
          }}
        />
      </Item>
      <Item
        label="Cidade"
        name="cidade"
      >
        <Select
          placeholder="Selecione a cidade"
          className="min-h-[40px]"
          options={cidades.map((city) => ({ label: city, value: city }))}
          onChange={(value) => setSelectedCity(value)}
          value={selectedCity}
        />
      </Item>
      <Item
        label="Ultimo endereço conhecido"
        name="endereco"
      >
        <Input
          type="text"
          placeholder="Buscar por endereço..."
          className="border border-gray-300 rounded px-3 py-2 mb-4"
        />
      </Item>
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
