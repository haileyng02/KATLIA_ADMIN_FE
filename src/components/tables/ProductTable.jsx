import React from "react";
import { Table, Tooltip } from "antd";
import useColumnSearchProps from "../../hooks/useColumnSearchProps";
import { viewIcon, editIcon, deleteIcon } from "../../images/actions";

const ProductTable = ({
  data,
  loading,
  handleViewDetail,
  handleEdit,
  handleDeleteProduct,
  filteredInfo,
  setFilteredInfo,
  currentUser,
  categories
}) => {
  const {getColumnSearchProps} = useColumnSearchProps({filteredInfo,setFilteredInfo});

  const columns = [
    {
      title: "Product ID",
      dataIndex: "id",
      ...getColumnSearchProps("id"),
      sorter: (a, b) => a.id - b.id,
      render: (value) => <p className="table-cell">{"#" + value}</p>,
    },
    {
      title: "Name",
      dataIndex: "name",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.name?.localeCompare(b.name),
    },
    {
      title: "Image",
      dataIndex: "image",
      align: "center",
      render: (value) => (
        <center>
          <img
            src={value}
            alt="Product"
            className="w-[47px] h-[53px] object-cover object-center"
          />
        </center>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      filters: categories,
      filteredValue: filteredInfo.category || null,
      onFilter: (value, record) => record.category?.indexOf(value) === 0,
      sorter: (a, b) => a.category?.localeCompare(b.category),
      render: (value) => <p className="table-cell">{value}</p>,
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      render: (value) => <p className="table-cell">{"$" + value}</p>,
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (value) => (
        <div className="flex gap-x-[20px] justify-center">
          <Tooltip title="Product detail">
            <button
              className="action-button"
              style={{ backgroundColor: "rgba(67, 204, 248, 0.9)" }}
              onClick={() => handleViewDetail(value)}
            >
              <center>
                <img src={viewIcon} alt="View" />
              </center>
            </button>
          </Tooltip>
          {currentUser?.role === "ADMIN" && (
            <>
              <Tooltip title="Edit product">
                <button
                  className="action-button"
                  style={{ backgroundColor: "rgba(249, 175, 94, 0.9)" }}
                  onClick={() => handleEdit(value)}
                >
                  <center>
                    <img src={editIcon} alt="Edit" />
                  </center>
                </button>
              </Tooltip>
              <Tooltip title="Delete this product">
                <button
                  className="action-button"
                  style={{ backgroundColor: "rgba(253, 56, 56, 0.9)" }}
                  onClick={() => handleDeleteProduct(value)}
                >
                  <center>
                    <img src={deleteIcon} alt="Delete" />
                  </center>
                </button>
              </Tooltip>
            </>
          )}
        </div>
      ),
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    setFilteredInfo(filters);
  };

  return (
    <Table
      columns={columns}
      dataSource={data}
      onChange={onChange}
      pagination={{ showSizeChanger: false }}
      loading={loading}
      className="mt-5 pagination-active table-header"
    />
  );
};

export default ProductTable;
