import React from "react";
import { ConfigProvider, Modal, Table } from "antd";
import getModalFooter from "../../utils/getModalFooter";

const data = [
  {
    key: "1",
    id: 1,
    name: "Premium Striped Oxford Shirt",
    price: 199.99,
  },
  {
    key: "2",
    id: 2,
    name: "Premium Striped Oxford Shirt",
    price: 199.99,
  },
  {
    key: "3",
    id: 3,
    name: "Premium Striped Oxford Shirt",
    price: 199.99,
  },
  {
    key: "4",
    id: 4,
    name: "Premium Striped Oxford Shirt",
    price: 199.99,
  },
  {
    key: "5",
    id: 5,
    name: "Premium Striped Oxford Shirt",
    price: 199.99,
  },
  {
    key: "6",
    id: 6,
    name: "Premium Striped Oxford Shirt",
    price: 199.99,
  },
  {
    key: "7",
    id: 7,
    name: "Premium Striped Oxford Shirt",
    price: 199.99,
  },
  {
    key: "8",
    id: 8,
    name: "Premium Striped Oxford Shirt",
    price: 199.99,
  },
  {
    key: "9",
    id: 9,
    name: "Premium Striped Oxford Shirt",
    price: 199.99,
  },
  {
    key: "10",
    id: 10,
    name: "Premium Striped Oxford Shirt",
    price: 199.99,
  },
  {
    key: "11",
    id: 11,
    name: "Premium Striped Oxford Shirt",
    price: 199.99,
  },
];

const DiscountProductsModal = ({ open, handleCancel, id }) => {
  const columns = [
    {
      title: "Product ID",
      dataIndex: "id",
      render: (text) => <p className="mb-0">{"#" + text}</p>,
    },
    {
      title: "Product’s Name",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (text) => <p className="mb-0">{"$" + text}</p>,
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
      footer={getModalFooter({ handleCancel })}
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
      </div>
    </Modal>
  );
};

export default DiscountProductsModal;
