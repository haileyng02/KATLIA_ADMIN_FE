import React from "react";
import { Divider, Modal } from "antd";
import ModalTitle from "../../components/ModalTitle";
import OrderDetailTable from "../../components/tables/OrderDetailTable";
import dayjs from "dayjs";
import { getOrderStatusTextAndColor } from "../../utils/getStatus";

const OrderDetailModal = ({ open, handleCancel, currentUser, currItem }) => {
  return (
    <Modal
      title={<ModalTitle text={"Order Detail"} />}
      open={open}
      onCancel={handleCancel}
      centered
      footer={null}
    >
      <div className="overflow-modal">
        <table className="modal-table">
          <tbody>
            <tr>
              <th>Order ID:</th>
              <td>{currItem?.orderId}</td>
            </tr>
            <tr>
              <th>Customer’s Name:</th>
              <td>{currItem?.customerName}</td>
            </tr>
            <tr>
              <th>Address:</th>
              <td>{currItem?.address}</td>
            </tr>
            <tr>
              <th>Date:</th>
              <td>{dayjs(currItem?.createDate).format("DD/MM/YYYY")}</td>
            </tr>
            <tr>
              <th>Note:</th>
              <td>{currItem?.note}</td>
            </tr>
            <tr>
              <th>Total:</th>
              <td>{"$" + currItem?.total}</td>
            </tr>
            <tr>
              <th>Status:</th>
              <td
                className={`text-[${
                  getOrderStatusTextAndColor(currItem?.status)?.color
                }]`}
              >
                {getOrderStatusTextAndColor(currItem?.status)?.text}
              </td>
            </tr>
          </tbody>
        </table>
        <Divider />
        <OrderDetailTable currentUser={currentUser} id={currItem?.orderId}/>
      </div>
    </Modal>
  );
};

export default OrderDetailModal;
