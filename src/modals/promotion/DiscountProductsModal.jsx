import React, { useState } from "react";
import { ConfigProvider, Modal, Table } from "antd";
import WarningModal from "../WarningModal";
import appApi from "../../api/appApi";
import * as routes from "../../api/apiRoutes";
import getModalFooter from "../../utils/getModalFooter";

const columns = [
  {
    title: "Product ID",
    dataIndex: "id",
    render: (text) => <p className="">{"#" + text}</p>,
  },
  {
    title: "Product’s Name",
    dataIndex: "name",
    // render: (text) => <p className="">{text}</p>,
  },
  {
    title: "Price",
    dataIndex: "price",
    render: (text) => <p className="">{"$" + text}</p>,
  },
];
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
};

const DiscountProductsModal = ({ open, handleCancel, id, currentUser }) => {
  const [warningOpen, setWarningOpen] = useState(false);
  const [data, setData] = useState();

  //Edit list products for discount
  const editListProductsForDiscount = async () => {
    try {
      const token = currentUser.token;
      const result = await appApi.put(
        routes.EDIT_LIST_PRODUCTS_FOR_DISCOUNT(id),
        [694575, 611643],
        {
          ...routes.getAccessTokenHeader(token),
          ...routes.getEditListProductsForDiscountIdPrams(id),
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
  };

  //Get all products
  const getAllProducts = async () => {
    try {
      const token = currentUser.token;
      const result = await appApi.get(
        routes.GET_ALL_PRODUCTS,
        routes.getAccessTokenHeader(token)
      );
      result.data.pop();
      setData(
        result.data.map((d, i) => {
          return { ...d, key: i };
        })
      );
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(err.message);
      }
    }
  };

  const handleOk = () => {
    setWarningOpen(true);
  };

  return (
    <Modal
      title={
        <h2 className="modal-title">
          List products for discount{" "}
          <span className="modal-title text-secondary">{id}</span>
        </h2>
      }
      open={open}
      onCancel={handleCancel}
      centered
      footer={getModalFooter({ handleCancel, handleOk })}
      width={"50%"}
    >
      <div className="overflow-modal">
        <ConfigProvider theme={{ token: { colorPrimary: "#F9AF5EE5" } }}>
          <Table
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            columns={columns}
            dataSource={data}
            className="mt-5 pagination-active table-header"
          />
        </ConfigProvider>
        <WarningModal
          text={
            "Current discount for all selection products will be changed! Confirm?"
          }
          open={warningOpen}
          handleCancel={() => setWarningOpen(false)}
        />
      </div>
    </Modal>
  );
};

export default DiscountProductsModal;
