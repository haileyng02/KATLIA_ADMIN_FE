import React from "react";
import { Form, Modal, Select } from "antd";
import ModalTitle from "../../components/ModalTitle";
import getModalFooter from "../../utils/getModalFooter";
import roles from "../../utils/roles";
import status from "../../utils/staffStatus";

const { Option } = Select;

const data = {
  role: "admin",
  status: "working",
};

const ActionModal = ({ open, handleCancel }) => {
  return (
    <Modal
      title={<ModalTitle text="Action" />}
      open={open}
      onCancel={handleCancel}
      centered
      width={"40%"}
      footer={getModalFooter({ handleCancel })}
    >
      <Form>
        <table className="modal-table">
          <tbody>
            <tr>
              <th>Change Role:</th>
              <td>
                <Form.Item name={"role"} initialValue={data.role}>
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
              <th>Change Status:</th>
              <td>
                <Form.Item name={"status"} initialValue={data.status}>
                  <Select size="large" className="w-full">
                    {status.map((status, i) => (
                      <Option key={i} value={status.value}>
                        <p
                          style={{ color: status.labelColor }}
                          className="select-option"
                        >
                          {status.title}
                        </p>
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </td>
            </tr>
          </tbody>
        </table>
      </Form>
    </Modal>
  );
};

export default ActionModal;
