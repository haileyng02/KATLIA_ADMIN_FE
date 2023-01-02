import React, { useState } from "react";
import { Table, Tooltip } from "antd";
import { editIcon, deleteIcon } from "../../images/actions";
import EditItemModal from "../../modals/import/EditItemModal";

const ImportTable = ({ data, loading, getItemsInExistingForm }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [currItem, setCurrItem] = useState();

  const columns = [
    {
      title: "Product ID",
      dataIndex: "productId",
      sorter: (a, b) => a.productId - b.productId,
      defaultSortOrder: "descend",
      render: (value) => <p className="table-cell">{"#" + value}</p>,
    },
    {
      title: "Product's Name",
      dataIndex: "name",
      sorter: (a, b) => a.name?.localeCompare(b.name),
      defaultSortOrder: "descend",
      render: (value) => <p className="table-cell">{value}</p>,
    },
    {
      title: "Color",
      dataIndex: "color",
      align: "center",
      sorter: (a, b) => a.color?.localeCompare(b.color),
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
      sorter: (a, b) => a.size?.localeCompare(b.size),
      defaultSortOrder: "descend",
      render: (value) => (
        <center>
          <p className="table-cell uppercase text-center">{value}</p>
        </center>
      ),
    },
    {
      title: "Unit price",
      dataIndex: "unitPrice",
      align: "center",
      sorter: (a, b) => a.unitPrice - b.unitPrice,
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
      sorter: (a, b) => a.quantity - b.quantity,
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
      sorter: (a, b) => a.total - b.total,
      defaultSortOrder: "descend",
      render: (value) => (
        <center>
          <p className="table-cell">{"$" + value.toFixed(2)}</p>
        </center>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (value) => (
        <div className="flex gap-x-5 justify-center">
          <Tooltip title="Edit item">
            <button
              className="action-button"
              style={{ backgroundColor: "#F9AF5EE5" }}
              onClick={() => handleEditItem(value)}
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

  const handleEditItem = (value) => {
    setEditOpen(true);
    setCurrItem(value);
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        className="mt-5 pagination-active table-header"
      />
      <EditItemModal
        open={editOpen}
        handleCancel={() => setEditOpen(false)}
        currItem={currItem}
        getItemsInExistingForm={getItemsInExistingForm}
      />
    </>
  );
};

export default ImportTable;
