import React from "react";
import { Modal, Form, Input, Select } from "antd";
import ModalTitle from "../../components/ModalTitle";
import ColorList from "../../components/ColorList";

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

const ModifyProductModal = ({ edit, open, handleCancel }) => {
  return (
    <Modal
      title={<ModalTitle text={edit ? "Edit Product" : "Add Product"} />}
      open={open}
      onCancel={handleCancel}
      centered
      width={"45%"}
      footer={null}
      className="width-modal"
    >
      <Form className="overflow-y-auto max-h-[75vh]">
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
            <ColorList/>
          </tbody>
        </table>
      </Form>
    </Modal>
  );
};

export default ModifyProductModal;
