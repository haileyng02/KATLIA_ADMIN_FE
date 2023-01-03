import React from "react";
import { Modal } from "antd";
import getModalFooter from "../utils/getModalFooter";
import warningIcon from "../images/warning.svg";

const WarningModal = ({ handleOk, handleCancel, open, text }) => {
  const onOk = () => {
    handleOk();
    handleCancel();
  }
  return (
    <Modal
      title={
        <div className="row gap-x-3">
          <img src={warningIcon} alt="Warning" />
          <h3 className="font-medium font-inter text-25 mb-0">Warning</h3>
        </div>
      }
      open={open}
      onCancel={handleCancel}
      centered
      width={450}
      footer={getModalFooter({ handleCancel, handleOk:onOk })}
    >
      <p className="text-center text-20 mb-5">{text}</p>
    </Modal>
  );
};

export default WarningModal;
