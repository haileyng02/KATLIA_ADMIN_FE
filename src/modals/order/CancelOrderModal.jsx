import React, { useState } from "react";
import { Modal } from "antd";
import CountingTextArea from "../../components/CountingTextArea";

const CancelOrderModal = ({ open, handleCancel }) => {
  return (
    <Modal
      title={<h2 className="font-semibold text-[25px] mb-0">Cancel Order</h2>}
      open={open}
      onCancel={handleCancel}
      centered
      width={700}
      footer={[
        <button onClick={handleCancel} className="h-[34px] border-1 border-black rounded-5 px-[10px] text-15">
          Cancel
        </button>,
        <button className="h-[34px] bg-[#F9AF5EE5] rounded-5 px-[10px] text-15 text-white ml-5">
          Confirm
        </button>,
      ]}
    >
      <h2 className="font-medium text-[20px]">Cancel Reason</h2>
      <CountingTextArea maxLength={1500} />
    </Modal>
  );
};

export default CancelOrderModal;
