"use client";
import { Form, Modal, Select, Upload, Button, Input } from "antd";
import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { addImage } from "@/lib/prisma/queries/images";
import { toast } from "react-toastify";
import cidades from "../data/cidades";
import unidecode from "unidecode";
import { PersonType } from "@/types/person";

const CreatePersonModal = ({
  isOpen,
  setIsOpen,
  person,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  person?: PersonType;
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string>("Desaparecido");
  const [submitForm, setSubmitForm] = useState<boolean>(true);
  const [form] = Form.useForm();
  const { Item } = Form;

  if (!isOpen) {
    return null;
  }

  if (person !== null && person !== undefined) {
    form.setFieldsValue({
      name: person.name,
      age: person.age,
      cidade: person.cidade,
      endereco: person.endereco,
      status: person.status,
      abrigo: person.abrigo,
      entrada: person.entrada,
      photoUrl: person.photoUrl,
    });
  } else {
    form.resetFields();
  }

  async function submitPerson() {
    setSubmitForm(false);

    const values = form.getFieldsValue();
    const newPerson = {
      name: values.name,
      age: Number(values.age) ?? 0,
      sex: values.sex,
      cidade: values.cidade,
      endereco: values.endereco,
      abrigo: "null",
      entrada: "null",
      status: selectedStatus,
      photoUrl: values.photoUrl
        ? await addImage(values.photoUrl.fileList[0]?.originFileObj ?? "")
        : "",
    };

    try {
      if (person !== null && person !== undefined) {
        //@TODO @GABE - Update person with newPersonValues id is person.id
        console.log("Update person");
        return;
      } else {
        if (values.status === "Resgatado") {
          newPerson.abrigo = values.abrigo;
          newPerson.entrada = new Date(values.entrada).getTime().toString();
        }

        await fetch("/api/people", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPerson),
        }).then((response) => {
          if (response.ok === true) {
            setIsOpen(false);
            form.resetFields();
            toast.success("Pessoa adicionada com sucesso!");
          } else {
            toast.error("Erro ao adicionar pessoa. Por favor, tente novamente.");
          }
        });
      }
    } catch (error) {
      console.error("Error adding person: ", error);
      toast.error("Erro ao adicionar pessoa. Por favor, tente novamente.");
    }
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
        onFinish={submitForm ? submitPerson : undefined}
      >
        <Form.Item
          label="Status"
          name="status"
        >
          <Select
            placeholder="Selecione o status"
            defaultValue="Desaparecido"
            onChange={(value) => setSelectedStatus(value)}
            options={[
              { label: "Desaparecido", value: "Desaparecido" },
              { label: "Resgatado", value: "Resgatado" },
            ]}
          />
        </Form.Item>

        <Item
          label="Nome"
          required
          name="name"
          rules={[{ required: true, message: "Por favor, insira o nome da pessoa" }]}
        >
          <Input
            type="text"
            placeholder="Nome da pessoa"
          />
        </Item>
        <Form.Item
          label="Idade"
          name="age"
        >
          <Input
            type="number"
            defaultValue={0}
            placeholder="Idade da pessoa"
          />
        </Form.Item>

        <Form.Item
          label="Sexo"
          name="sex"
        >
          <Select
            placeholder="Selecione o sexo"
            options={[
              { label: "Masculino", value: "m" },
              { label: "Feminino", value: "f" },
              { label: "Outro", value: "o" },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Cidade"
          name="cidade"
        >
          <Select
            showSearch
            placeholder="Selecione a cidade"
            filterOption={(input, option) => {
              const normalizedInput = unidecode(input).toLowerCase();
              const normalizedOption = unidecode(
                (option?.children as unknown as string) ?? ""
              ).toLowerCase();
              return normalizedOption.indexOf(normalizedInput) >= 0;
            }}
          >
            {cidades.map((cidade) => (
              <Select.Option
                key={cidade}
                value={cidade}
              >
                {cidade}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Item
          label="Endereço"
          name="endereco"
        >
          <Input
            type="text"
            placeholder="Endereço da pessoa"
          />
        </Item>

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
              name="entrada"
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
        <div className="flex justify-end">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
          >
            {person ? "Atualizar pessoa" : "Adicionar pessoa"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default CreatePersonModal;
