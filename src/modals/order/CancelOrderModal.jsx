import React, { useState } from "react";
import { Modal, Form, Spin } from "antd";
import { useSnackbar } from "notistack";
import appApi from "../../api/appApi";
import * as routes from "../../api/apiRoutes";
import CountingTextArea from "../../components/CountingTextArea";
import ModalTitle from "../../components/ModalTitle";
import WarningModal from "../WarningModal";
import getModalFooter from "../../utils/getModalFooter";

const CancelOrderModal = ({
  open,
  handleCancel,
  id,
  currentUser,
  getAllOrder,
}) => {
  const [form] = Form.useForm();
  const { enqueueSnackbar } = useSnackbar();
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOk = () => {
    form.validateFields().then((_) => {
      setConfirm(true);
    });
  };

  const onCancel = () => {
    handleCancel();
    form.resetFields();
  }

  //Cancel order
  const cancelOrder = async (cancelReason) => {
    setLoading(true);
    try {
      const token = currentUser.token;
      const result = await appApi.put(
        routes.CANCEL_ORDER(id),
        routes.getCancelOrderBody(cancelReason),
        {
          ...routes.getAccessTokenHeader(token),
          ...routes.getCancelOrderParams(id),
        }
      );
      console.log(result);
      enqueueSnackbar("The order has been cancelled!", { variant: "success" });
      getAllOrder();
    } catch (err) {
      if (err.response) {
        enqueueSnackbar(err.response.data.message, { variant: "error" });
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(err.message);
      }
    }
    setLoading(false);
  };

  const onOk = async () => {
    await cancelOrder(form.getFieldValue("textarea")).then(()=>handleCancel());
  };

  return (
    <Modal
      title={<ModalTitle text={"Cancel Order"} />}
      open={open}
      onCancel={onCancel}
      centered
      width={700}
      footer={getModalFooter({ handleCancel: onCancel, handleOk })}
    >
      <Spin spinning={loading}>
        <h2 className="font-medium text-[20px]">Cancel Reason</h2>
        <Form form={form}>
          <CountingTextArea maxLength={1500} />
        </Form>
        <WarningModal
          text="Are you sure you want to cancel this order?"
          open={confirm}
          handleCancel={() => setConfirm(false)}
          handleOk={onOk}
        />
      </Spin>
    </Modal>
  );
};

export default CancelOrderModal;
