import React, { useState,useRef } from "react";
import { Table, Tooltip, Input, Space, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import appApi from "../../api/appApi";
import * as routes from "../../api/apiRoutes";
import { editIcon, deleteIcon } from "../../images/actions";
import EditItemModal from "../../modals/import/EditItemModal";

const ImportTable = ({
  data,
  loading,
  setLoading,
  getItemsInExistingForm,
  currentUser,
}) => {
  const searchInput = useRef(null);
  const [editOpen, setEditOpen] = useState(false);
  const [currItem, setCurrItem] = useState();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [filteredInfo, setFilteredInfo] = useState({});

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
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
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
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
            onClick={() => clearFilters && handleReset(clearFilters,dataIndex)}
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
          color: filtered ? '#1890ff' : undefined,
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
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

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
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.name?.localeCompare(b.name),
      defaultSortOrder: "descend",
      render: (value) => <p className="table-cell">{value}</p>,
    },
    {
      title: "Color",
      dataIndex: "color",
      align: "center",
      ...getColumnSearchProps("color"),
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
      ...getColumnSearchProps("size"),
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
          <Tooltip title="Delete item">
            <button
              className="action-button"
              style={{ backgroundColor: "#FD3838E5" }}
              onClick={()=>deleteAnItem(value.id)}
            >
              <center>
                <img src={deleteIcon} alt="Delete" />
              </center>
            </button>
          </Tooltip>
        </div>
      ),
    },
  ];

  //Delete an item
  const deleteAnItem = async (id) => {
    setLoading(true);
    try {
      const token = currentUser.token;
      const result = await appApi.delete(
        routes.DELETE_AN_ITEM(id),
        {
          ...routes.getAccessTokenHeader(token),
          ...routes.getDeleteAnItemIdParams(id),
        }
      );
      console.log(result.data);
      getItemsInExistingForm();
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(err.message);
      }
    }
    setLoading(false);
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
    var temp = filteredInfo;
    temp[dataIndex] = [selectedKeys[0]]
    setFilteredInfo(temp);
  };
  const handleReset = (clearFilters,dataIndex) => {
    clearFilters();
    setSearchText('');
    var temp = filteredInfo;
    temp[dataIndex] = null;
    setFilteredInfo(temp);
  };

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
