import React from "react";
import { Divider, Modal } from "antd";
import appApi from "../../api/appApi";
import * as routes from "../../api/apiRoutes";
import ModalTitle from "../../components/ModalTitle";
import OrderDetailTable from "../../components/tables/OrderDetailTable";

const data = {
  id: "327842",
  name: "Nguyen Huu Trung Kien",
  address: "University Of Information Technology",
  date: "17/10/2022",
  total: 54,
  status: "Completed",
};

const OrderDetailModal = ({ open, handleCancel,currentUser }) => {
   //Get detail order
   const getDetailOrder = async () => {
    try {
      const token = currentUser.token;
      const result =  await appApi.get(
        routes.GET_DETAIL_ORDER("638ff3bdb1a8e896eafcabe1"),
        {
          ...routes.getAccessTokenHeader(token),
          ...routes.getDetailOrderBody("638ff3bdb1a8e896eafcabe1")
        }
      );
      console.log(result);

    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(err.message);
      }
    }
  }
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
