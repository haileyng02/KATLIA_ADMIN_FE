import React from "react";
import { Divider, Modal } from "antd";
import ModalTitle from "../../components/ModalTitle";
import OrderDetailTable from "../../components/OrderDetailTable";

const data = {
  id: "327842",
  name: "Nguyen Huu Trung Kien",
  address: "University Of Information Technology",
  date: "17/10/2022",
  total: 54,
  status: "Completed",
};

const OrderDetailModal = ({ open, handleCancel }) => {
  return (
    <Modal
      title={<ModalTitle text={"Order Detail"} />}
      open={open}
      onCancel={handleCancel}
      centered
      footer={null}
    >
      <div className="overflow-y-auto h-[75vh] px-4">
          <table className="modal-table">
            <tbody>
              <tr>
                <th>Order ID:</th>
                <td>{data.id}</td>
              </tr>
              <tr>
                <th>Customer’s Name:</th>
                <td>{data.name}</td>
              </tr>
              <tr>
                <th>Address:</th>
                <td>{data.address}</td>
              </tr>
              <tr>
                <th>Date:</th>
                <td>{data.date}</td>
              </tr>
              <tr>
                <th>Total:</th>
                <td>{'$'+data.total}</td>
              </tr>
              <tr>
                <th>Status:</th>
                <td className="text-[#60BE80]">{data.status}</td>
              </tr>
            </tbody>
          </table>
          <Divider/>
          <OrderDetailTable/>
      </div>
    </Modal>
  );
};

export default OrderDetailModal;
