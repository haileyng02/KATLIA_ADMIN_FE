import React,{useState} from "react";
import { Modal } from "antd";
import CountingTextArea from "../../components/CountingTextArea";
import ModalTitle from "../../components/ModalTitle";
import WarningModal from "../WarningModal";
import getModalFooter from "../../utils/getModalFooter";

const CancelOrderModal = ({ open, handleCancel }) => {
  const [confirm,setConfirm] = useState(false);
  const handleOk = () => {
    setConfirm(true);
  }
  return (
    <Modal
      title={<ModalTitle text={'Cancel Order'}/>}
      open={open}
      onCancel={handleCancel}
      centered
      width={700}
      footer={getModalFooter({handleCancel,handleOk})}
    >
      <h2 className="font-medium text-[20px]">Cancel Reason</h2>
      <CountingTextArea maxLength={1500} />
      <WarningModal text='Are you sure you want to cancel this order?' open={confirm} handleCancel={()=>setConfirm(false)}/>
    </Modal>
  );
};

export default CancelOrderModal;
