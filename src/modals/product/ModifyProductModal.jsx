import React from "react";
import { Modal, Form, Input, Select } from "antd";
import ModalTitle from "../../components/ModalTitle";
import ImagesUploader from "../../components/ImagesUploader";
import ColorIcon from "../../components/ColorIcon";

const { Option } = Select;

const categories = [
  {
    value: "sweater",
    label: "Sweater",
  },
  {
    value: "dress",
    label: "Dress",
  },
  {
    value: "Shirt",
    label: "shirt",
  },
];

const colors = [
  {
    name: "Black",
    hex: "#000000",
  },
  {
    name: "Mint",
    hex: "#8FD9C4",
  },
  {
    name: "Green",
    hex: "#32CD32",
  },
  {
    name: "Be",
    hex: "#EDD3AB",
  },
  {
    name: "Red",
    hex: "#F81515",
  },
  {
    name: "Gray",
    hex: "#696969",
  },
];

const ModifyProductModal = ({ edit, open, handleCancel }) => {
  return (
    <Modal
      title={<ModalTitle text={edit ? "Edit Product" : "Add Product"} />}
      open={open}
      onCancel={handleCancel}
      centered
      width={800}
      footer={null}
    >
      <Form className="overflow-y-auto h-[75vh]">
        <table className="modal-table table-auto w-full">
          <tbody>
            <tr>
              <th className="required">Product ID:</th>
              <td>
                <Form.Item className="form-item">
                  <Input className="input" />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="required">Name:</th>
              <td>
                <Form.Item className="form-item">
                  <Input className="input" />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th>Description:</th>
              <td>
                <Form.Item className="form-item">
                  <Input className="input" />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th>Category:</th>
              <td>
                <Select
                  options={categories}
                  defaultValue={categories[0]}
                  size="large"
                  // suffixIcon={<img src={selectIcon} alt='Select' className="h-2"/>}
                  className="w-full"
                />
              </td>
            </tr>
            <tr>
              <th>Size:</th>
              <td>
                <Form.Item className="form-item">
                  <Input className="input" />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="required">Price:</th>
              <td>
                <Form.Item className="form-item">
                  <Input className="input" />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="required">Color:</th>
              <td>
                <Select
                  defaultValue={colors[0].name}
                  size="large"
                  // suffixIcon={<img src={selectIcon} alt='Select' className="h-2"/>}
                  className="w-full"
                >
                  {colors.map((color, i) => (
                    <Option key={i} value={color.name}>
                      <div className="row gap-x-[10px] font-inter font-[16px]">
                        <ColorIcon color={color.hex}/>
                        <p className="mb-0">{color.name}</p>
                      </div>
                    </Option>
                  ))}
                </Select>
              </td>
            </tr>
            <tr>
              <th>Images:</th>
              <td>
                <ImagesUploader />
              </td>
            </tr>
            <tr>
              <th><button className="w-[90px] h-[34px] border-1 border-black50 text-15 text-black50 rounded-5">Add Color</button></th>
              <td>
              </td>
            </tr>
          </tbody>
        </table>
      </Form>
    </Modal>
  );
};

export default ModifyProductModal;
