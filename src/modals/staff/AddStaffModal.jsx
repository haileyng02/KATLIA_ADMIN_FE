import React from "react";
import { Modal, Form, Input, Select, DatePicker } from "antd";
import dayjs from "dayjs";
import ModalTitle from "../../components/ModalTitle";
import getModalFooter from "../../utils/getModalFooter";
import roles from "../../utils/roles";

const { Option } = Select;

const AddStaffModal = ({ open, handleCancel }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      console.log(values);
    });
  };

  return (
    <Modal
      title={<ModalTitle text="Add New Staff" />}
      open={open}
      onCancel={handleCancel}
      centered
      width={"40%"}
      footer={getModalFooter({ handleCancel, handleOk })}
    >
      <Form form={form}>
        <table className="modal-table">
          <tbody>
            <tr>
              <th className="required">Email:</th>
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
                  <Input className="input" />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="required">Role:</th>
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
                  <Select size="large" className="w-full">
                    {roles.map((role, i) => (
                      <Option key={i} value={role.value}>
                        <p
                          style={{ color: role.labelColor }}
                          className="select-option"
                        >
                          {role.title}
                        </p>
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th>Start At:</th>
              <td>
                <Form.Item name="start" initialValue={dayjs()}>
                  <DatePicker className="input w-full" format="DD-MM-YYYY" />
                </Form.Item>
              </td>
            </tr>
          </tbody>
        </table>
      </Form>
    </Modal>
  );
};

export default AddStaffModal;
