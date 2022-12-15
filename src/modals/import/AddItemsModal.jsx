import React from "react";
import { Modal, Form, Input, Select } from "antd";
import ModalTitle from "../../components/ModalTitle";
import getModalFooter from "../../utils/getModalFooter";
import DollarPrefix from "../../components/DollarPrefix";
import ColorIcon from "../../components/ColorIcon";
import Quantity from "../../components/Quantity";

const { Option } = Select;

const productList = [
  { id: "123456", name: "Product name" },
  { id: "345636", name: "Pink Shirt" },
  { id: "588", name: "Green Dress" },
  { id: "91232", name: "Some random shoes" },
  { id: "123", name: "Product name" },
  { id: "1434", name: "Pink Shirt" },
  { id: "141", name: "Green Dress" },
  { id: "1354", name: "Some random shoes" },
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

const sizes = [
  { name: "XS" },
  { name: "S" },
  { name: "M" },
  { name: "L" },
  { name: "XL" },
  { name: "XXL" },
  { name: "XXXL" },
];

const AddItemsModal = ({ open, handleCancel }) => {
  return (
    <Modal
      title={<ModalTitle text={"Add items"} />}
      open={open}
      onCancel={handleCancel}
      centered
      width={"35%"}
      footer={getModalFooter({ handleCancel })}
    >
      <table className="modal-table">
        <tbody>
          <tr>
            <th className="required">Product:</th>
            <td>
              <Form.Item
                name={"role"}
                rules={[
                  {
                    required: true,
                    message: "Please choose role",
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Select product"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase()) ||
                    (option?.value ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  size="large"
                  className="w-full"
                >
                  {productList.map((p, i) => (
                    <Option key={i} value={p.id} label={p.name}>
                      <p className="font-inter text-[16px] mb-0">{`${p.id} | ${p.name}`}</p>
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </td>
          </tr>
          <tr>
            <th className="required">Unit price:</th>
            <td>
              <Form.Item
                name={"email"}
                rules={[
                  {
                    required: true,
                    message: "Please enter email",
                  },
                  {
                    type: "email",
                    message: "This is not a valid email",
                  },
                ]}
              >
                <Input className="input" prefix={<DollarPrefix />} />
              </Form.Item>
            </td>
          </tr>
          <tr>
            <th className="required">Color:</th>
            <td>
              <Form.Item
                name={"role"}
                rules={[
                  {
                    required: true,
                    message: "Please choose role",
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Select color"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.value ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  size="large"
                  className="w-full"
                >
                  {colors.map((color, i) => (
                    <Option key={i} value={color.name}>
                      <div className="row gap-x-[10px] font-inter font-[16px]">
                        <ColorIcon color={color.hex} />
                        <p className="mb-0">{color.name}</p>
                      </div>
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </td>
          </tr>
          <tr>
            <th className="required align-top">Quantity:</th>
            <td className="end">
              <div className="grid grid-cols-2 gap-4">
                {sizes.map((size, i) => (
                  <div key={i} className="row gap-x-1">
                    <h5 className="mb-0 font-inter font-medium text-center w-[72px]">{size.name}</h5>
                    <Quantity />
                  </div>
                ))}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </Modal>
  );
};

export default AddItemsModal;
