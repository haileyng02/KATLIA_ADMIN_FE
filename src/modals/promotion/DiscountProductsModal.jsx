import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ConfigProvider, Modal, Table, Input, Space, Button, Segmented } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import WarningModal from "../WarningModal";
import appApi from "../../api/appApi";
import * as routes from "../../api/apiRoutes";
import { getProducts } from "../../actions/products";
import getModalFooter from "../../utils/getModalFooter";

const DiscountProductsModal = ({ open, handleCancel, id, currentUser }) => {
  const [warningOpen, setWarningOpen] = useState(false);
  const [data, setData] = useState();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [filteredInfo, setFilteredInfo] = useState({});
  const searchInput = useRef(null);
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

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
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Product ID",
      dataIndex: "productId",
      render: (text) => <p className="">{"#" + text}</p>,
    },
    {
      title: "Product’s Name",
      dataIndex: "name",
      ...getColumnSearchProps("name"),
      // render: (text) => <p className="">{text}</p>,
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (text) => <p className="">{"$" + text}</p>,
    },
    {
      dataIndex: "discountId",
      className: "hidden",
      filteredValue: filteredInfo.discountId || null,
      onFilter: (value, record) => record.discountId === value,
    },
  ];
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(selectedRowKeys);
      setSelectedRowKeys(selectedRowKeys);
    },
  };

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
  const getProductsForDiscount = async () => {
    try {
      const token = currentUser.token;
      const result = await appApi.get(
        routes.GET_PRODUCTS_FOR_DISCOUNT,
        routes.getAccessTokenHeader(token)
      );
      result.data.pop();
      const productsData = result.data.map((d, i) => {
        return { ...d, key: i };
      });
      console.log(productsData);
      setData(productsData);
      dispatch(getProducts(productsData));
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

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const handleOk = () => {
    setWarningOpen(true);
  };

  const onCancel = () => {
    handleCancel();
    setSelectedRowKeys([]);
  };

  useEffect(() => {
    if (currentUser) {
      if (products) {
        setData(products);
      } else {
        getProductsForDiscount();
      }
    }
  }, [currentUser]);

  useEffect(() => {
    if (data) {
      const discountIndexes = data
        .map((e, i) => (e.discountId === id ? i : undefined))
        .filter((x) => x);
      setSelectedRowKeys(discountIndexes);
    }
  }, [id, data]);

  return (
    <Modal
      title={
        <h2 className="modal-title">
          List products for discount{" "}
          <span className="modal-title text-secondary">{id}</span>
        </h2>
      }
      open={open}
      onCancel={onCancel}
      centered
      footer={getModalFooter({ onCancel, handleOk })}
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
