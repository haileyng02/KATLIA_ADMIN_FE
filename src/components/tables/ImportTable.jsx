import React, { useState } from "react";
import { Table, Tooltip } from "antd";
import { editIcon, deleteIcon } from "../../images/actions";
import EditItemModal from "../../modals/import/EditItemModal";

const data = [
  {
    key: "1",
    productId: "1",
    name: "Premium Striped Oxford Shirt",
    color: "blue",
    size: "s",
    price: "1.99",
    quantity: "100",
    total: "199",
  },
  {
    key: "2",
    productId: "2",
    name: "Premium Striped Oxford Shirt",
    color: "blue",
    size: "s",
    price: "1.99",
    quantity: "100",
    total: "199",
  },
  {
    key: "3",
    productId: "3",
    name: "Premium Striped Oxford Shirt",
    color: "blue",
    size: "s",
    price: "1.99",
    quantity: "100",
    total: "199",
  },
  {
    key: "4",
    productId: "4",
    name: "Premium Striped Oxford Shirt",
    color: "blue",
    size: "s",
    price: "1.99",
    quantity: "100",
    total: "199",
  },
  {
    key: "5",
    productId: "5",
    name: "Premium Striped Oxford Shirt",
    color: "blue",
    size: "s",
    price: "1.99",
    quantity: "100",
    total: "199",
  },
  {
    key: "6",
    productId: "6",
    name: "Premium Striped Oxford Shirt",
    color: "blue",
    size: "s",
    price: "1.99",
    quantity: "100",
    total: "199",
  },
  {
    key: "7",
    productId: "7",
    name: "Premium Striped Oxford Shirt",
    color: "blue",
    size: "s",
    price: "1.99",
    quantity: "100",
    total: "199",
  },
  {
    key: "8",
    productId: "8",
    name: "Premium Striped Oxford Shirt",
    color: "blue",
    size: "s",
    price: "1.99",
    quantity: "100",
    total: "199",
  },
  {
    key: "9",
    productId: "9",
    name: "Premium Striped Oxford Shirt",
    color: "blue",
    size: "s",
    price: "1.99",
    quantity: "100",
    total: "199",
  },
  {
    key: "10",
    productId: "10",
    name: "Premium Striped Oxford Shirt",
    color: "blue",
    size: "s",
    price: "1.99",
    quantity: "100",
    total: "199",
  },
  {
    key: "11",
    productId: "11",
    name: "Premium Striped Oxford Shirt",
    color: "blue",
    size: "s",
    price: "1.99",
    quantity: "100",
    total: "199",
  },
  {
    key: "12",
    productId: "12",
    name: "Premium Striped Oxford Shirt",
    color: "blue",
    size: "s",
    price: "1.99",
    quantity: "100",
    total: "199",
  },
];

const ImportTable = () => {
  const [editOpen, setEditOpen] = useState(false);

  const columns = [
    {
      title: "Product ID",
      dataIndex: "productId",
      sorter: (a, b) => a.productId.localeCompare(b.productId),
      defaultSortOrder: "descend",
      render: (value) => <p className="table-cell">{"#" + value}</p>,
    },
    {
      title: "Product's Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      defaultSortOrder: "descend",
      render: (value) => <p className="table-cell">{value}</p>,
    },
    {
      title: "Color",
      dataIndex: "color",
      align: "center",
      sorter: (a, b) => a.color.localeCompare(b.color),
      defaultSortOrder: "descend",
      render: (value) => (
        <center>
          <p className="table-cell uppercase text-center">{value}</p>
        </center>
      ),
    },
    {
      title: "Size",
      dataIndex: "size",
      align: "center",
      sorter: (a, b) => a.size.localeCompare(b.size),
      defaultSortOrder: "descend",
      render: (value) => (
        <center>
          <p className="table-cell uppercase text-center">{value}</p>
        </center>
      ),
    },
    {
      title: "Unit price",
      dataIndex: "price",
      align: "center",
      sorter: (a, b) => a.price.localeCompare(b.price),
      defaultSortOrder: "descend",
      render: (value) => (
        <center>
          <p className="table-cell">{"$" + value}</p>
        </center>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      align: "center",
      sorter: (a, b) => a.quantity.localeCompare(b.quantity),
      defaultSortOrder: "descend",
      render: (value) => (
        <center>
          <p className="table-cell">{value}</p>
        </center>
      ),
    },
    {
      title: "Total",
      dataIndex: "total",
      align: "center",
      sorter: (a, b) => a.total.localeCompare(b.total),
      defaultSortOrder: "descend",
      render: (value) => (
        <center>
          <p className="table-cell">{"$" + value}</p>
        </center>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_) => (
        <div className="flex gap-x-5 justify-center">
          <Tooltip title='Edit item'>
            <button
              className="action-button"
              style={{ backgroundColor: "#F9AF5EE5" }}
              onClick={()=>setEditOpen(true)}
            >
              <center>
                <img src={editIcon} alt="Edit" />
              </center>
            </button>
          </Tooltip>
          <button
            className="action-button"
            style={{ backgroundColor: "#FD3838E5" }}
          >
            <center>
              <img src={deleteIcon} alt="Delete" />
            </center>
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        className="mt-5 pagination-active table-header"
      />
      <EditItemModal open={editOpen} handleCancel={() => setEditOpen(false)} />
    </>
  );
};

export default ImportTable;
