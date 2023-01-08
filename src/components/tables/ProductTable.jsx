import React, { useState, useRef } from "react";
import { Table, Tooltip, Input, Space, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import categories from "../../utils/categories";
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
}) => {
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    filteredValue: filteredInfo[dataIndex] || null,
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
          className="table-cell"
        />
      ) : (
        <p className="table-cell">{text}</p>
      ),
  });
  const columns = [
    {
      title: "Product ID",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
      defaultSortOrder: "descend",
      render: (value) => <p className="table-cell">{"#" + value}</p>,
    },
    {
      title: "Name",
      dataIndex: "name",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.name?.localeCompare(b.name),
      defaultSortOrder: "descend",
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
      defaultSortOrder: "descend",
      render: (value) => <p className="table-cell">{value}</p>,
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      defaultSortOrder: "descend",
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

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
    setFilteredInfo({ ...filteredInfo, name: [selectedKeys[0]] });
  };

  const handleReset = (clearFilters) => {
    setSearchText("");
    setFilteredInfo({ ...filteredInfo, name: null });
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
