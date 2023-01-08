import React from "react";
import { Modal } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

const ErrorModal = ({handleCancel, open, text }) => {
  return (
    <Modal
      title={
        <div className="row gap-x-3">
          <InfoCircleOutlined className="text-[#ff4d4f] text-[24px]" />
          <h3 className="font-medium font-inter text-25 mb-0">Error</h3>
        </div>
      }
      open={open}
      onCancel={handleCancel}
      centered
      width={450}
      footer={[
        <button key={"cancel"} onClick={handleCancel} className="error-cancel-button">
          Cancel
        </button>,
        <button key={"confirm"} onClick={handleCancel} className="error-confirm-button">
          OK
        </button>,
      ]}
    >
      <p className="text-center text-20 mb-5">{text}</p>
    </Modal>
  );
};

export default ErrorModal;
