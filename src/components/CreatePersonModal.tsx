import { Form, Modal, Select, Upload, Button, Input } from "antd";
import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";

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

export default CreatePersonModal;
