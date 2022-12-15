import React from "react";
import { Modal, Form, Input } from "antd";
import ModalTitle from "../../components/ModalTitle";
import getModalFooter from "../../utils/getModalFooter";
import DollarPrefix from "../../components/DollarPrefix";
import Quantity from "../../components/Quantity";
import ReadOnlySuffix from "../../components/ReadOnlySuffix";
import ColorIcon from "../../components/ColorIcon";

const data = {
  id: "123456",
  name: "Product Name",
  price: 54,
  colorName: "Black",
  colorHex: "#000000",
  size: "XS",
  quantity: 10,
};

const EditItemModal = ({ open, handleCancel }) => {
  return (
    <Modal
      title={<ModalTitle text={"Edit item"} />}
      open={open}
      onCancel={handleCancel}
      centered
      width={"35%"}
      footer={getModalFooter({ handleCancel })}
    >
      <Form>
        <table className="modal-table">
          <tbody>
            <tr>
              <th>Product:</th>
              <td>
                <Input
                  readOnly
                  suffix={<ReadOnlySuffix />}
                  className="input"
                  defaultValue={`${data.id} | ${data.name}`}
                />
              </td>
            </tr>
            <tr>
              <th className="required">Unit price:</th>
              <td>
                <Form.Item
                  name={"price"}
                  rules={[
                    {
                      required: true,
                      message: "Please enter unit price",
                    },
                  ]}
                  initialValue={data.price}
                >
                  <Input className="input" prefix={<DollarPrefix />} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th>Color:</th>
              <td>
                <Input
                  readOnly
                  suffix={<ReadOnlySuffix />}
                  prefix={
                    <ColorIcon
                      color={data.colorHex}
                      size={"w-[14px] h-[14px]"}
                    />
                  }
                  defaultValue={data.colorName}
                  className="input"
                />
              </td>
            </tr>
            <tr>
              <th>Size:</th>
              <td>{data.size}</td>
            </tr>
            <tr>
              <th>Quantity:</th>
              <td>
                <Quantity quantity={data.quantity} />
              </td>
            </tr>
          </tbody>
        </table>
      </Form>
    </Modal>
  );
};

export default EditItemModal;
