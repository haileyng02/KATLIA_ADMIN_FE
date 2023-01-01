import React, { useEffect } from "react";
import { Modal, Input, Form } from "antd";
import ModalTitle from "../../components/ModalTitle";
import ReadOnlySuffix from "../../components/ReadOnlySuffix";
import RoleTag from "../../components/RoleTag";
import getModalFooter from "../../utils/getModalFooter";
import defaultAvatar from "../../images/default-ava.svg";

const ProfileModal = ({ open, handleCancel, currItem }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (currItem) {
      form.setFieldsValue({
        name: currItem.fullName,
        email: currItem.email,
        phoneNumber: currItem.phoneNumber,
      });
      console.log(currItem.role);
    }
  }, [currItem]);

  return (
    <Modal
      title={<ModalTitle text={"Profile"} />}
      open={open}
      onCancel={handleCancel}
      centered
      width={"35%"}
      footer={getModalFooter({ handleCancel, handleOk: handleCancel })}
    >
      <center>
        <img
          src={defaultAvatar}
          alt="Avatar"
          className="w-[170px] h-[170px] object-cover object-center rounded-full"
        />
      </center>
      <Form form={form}>
        <table className="modal-table">
          <tbody>
            <tr>
              <th>Name:</th>
              <td>
                <Form.Item name={"name"}>
                  <Input
                    readOnly
                    suffix={<ReadOnlySuffix />}
                    className="input"
                  />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th>Role:</th>
              <td>
                <RoleTag role={currItem?.role} />
              </td>
            </tr>
            <tr>
              <th>Email:</th>
              <td>
                <Form.Item name={"email"}>
                  <Input
                    readOnly
                    suffix={<ReadOnlySuffix />}
                    className="input"
                  />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th>Phone:</th>
              <td>
                <Form.Item name={"phoneNumber"}>
                  <Input
                    readOnly
                    suffix={<ReadOnlySuffix />}
                    className="input"
                  />
                </Form.Item>
              </td>
            </tr>
          </tbody>
        </table>
      </Form>
    </Modal>
  );
};

export default ProfileModal;
