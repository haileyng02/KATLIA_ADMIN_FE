import React from "react";
import { Modal, Input } from "antd";
import ModalTitle from "../../components/ModalTitle";
import ReadOnlySuffix from "../../components/ReadOnlySuffix";
import RoleTag from "../../components/RoleTag";
import getModalFooter from '../../utils/getModalFooter'
import defaultAvatar from "../../images/default-ava.svg";

const data = {
  name: "Tien",
  role: "Admin",
  email: "a@gmail.com",
  phone: "123456789",
  image: null,
};

const ProfileModal = ({ open, handleCancel }) => {
  return (
    <Modal
      title={<ModalTitle text={"Profile"} />}
      open={open}
      onCancel={handleCancel}
      centered
      width={'35%'}
      footer={getModalFooter({handleCancel,handleOk:handleCancel})}
    >
      <center>
        <img src={data.image ?? defaultAvatar} alt="Avatar" className="w-[170px] h-[170px] object-cover object-center rounded-full"/>
      </center>
      <table className="modal-table">
        <tbody>
          <tr>
            <th>Name:</th>
            <td>
              <Input defaultValue={data.name} readOnly suffix={<ReadOnlySuffix />} className="input" />
            </td>
          </tr>
          <tr>
            <th>Role:</th>
            <td>
              <RoleTag />
            </td>
          </tr>
          <tr>
            <th>Email:</th>
            <td>
              <Input defaultValue={data.email} readOnly suffix={<ReadOnlySuffix />} className="input" />
            </td>
          </tr>
          <tr>
            <th>Phone:</th>
            <td>
              <Input defaultValue={data.phone} readOnly suffix={<ReadOnlySuffix />} className="input" />
            </td>
          </tr>
        </tbody>
      </table>
    </Modal>
  );
};

export default ProfileModal;
