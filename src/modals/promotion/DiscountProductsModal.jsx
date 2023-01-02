import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ConfigProvider, Modal, Table, Input, Space, Button, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { useSnackbar } from "notistack";
import WarningModal from "../WarningModal";
import appApi from "../../api/appApi";
import * as routes from "../../api/apiRoutes";
import { getPromotionProducts } from "../../actions/products";
import getModalFooter from "../../utils/getModalFooter";

const DiscountProductsModal = ({
  open,
  handleCancel,
  id,
  currentUser,
  getAllDiscountList,
}) => {
  const [warningOpen, setWarningOpen] = useState(false);
  const [data, setData] = useState();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [showSelected, setShowSelected] = useState(false);
  const [initKeys, setInitKeys] = useState();
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const searchInput = useRef(null);
  const { promoProducts } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

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
    filteredValue: filteredInfo[dataIndex] || null,
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
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (text) => <p className="">{"$" + text}</p>,
    },
    {
      dataIndex: "key",
      className: "hidden",
      filteredValue: filteredInfo.key || null,
      onFilter: (value, record) => record.key.toString() === value,
    },
  ];
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  //Edit list products for discount
  const editListProductsForDiscount = async (idList) => {
    setLoading(true);
    try {
      const token = currentUser.token;
      const result = await appApi.put(
        routes.EDIT_LIST_PRODUCTS_FOR_DISCOUNT(id),
        idList,
        {
          ...routes.getAccessTokenHeader(token),
          ...routes.getEditListProductsForDiscountIdPrams(id),
        }
      );
      enqueueSnackbar("Added products to discount!", { variant: "success" });
      onCancel();
      getAllDiscountList();
      getProductsForDiscount();
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

  //Get all products
  const getProductsForDiscount = async () => {
    setTableLoading(true);
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
      setData(productsData);
      dispatch(getPromotionProducts(productsData));
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(err.message);
      }
    }
    setTableLoading(false);
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

  const handleOk = () => {
    setWarningOpen(true);
  };

  const onCancel = () => {
    handleCancel();
    setFilteredInfo({ ...filteredInfo, key: null });
    if (initKeys) setSelectedRowKeys(initKeys);
    else selectedRowKeys([]);
    setShowSelected(false);
  };

  const handleShowSelected = () => {
    setShowSelected(true);
    setFilteredInfo({ ...filteredInfo, key: selectedRowKeys });
  };

  const handleShowAll = () => {
    setShowSelected(false);
    setFilteredInfo({ ...filteredInfo, key: null });
  };

  const handleWarningOk = () => {
    if (JSON.stringify(initKeys) !== JSON.stringify(selectedRowKeys)) {
      const idList = data
        .filter((value) => selectedRowKeys.includes(value.key))
        .map((value) => value.productId);
      editListProductsForDiscount(idList);
    }
  };

  useEffect(() => {
    if (currentUser) {
      if (promoProducts) {
        setData(promoProducts);
      } else {
        getProductsForDiscount();
      }
    }
  }, [currentUser]);

  useEffect(() => {
    if (data) {
      var discountIndexes = data.reduce(function (acc, curr, index) {
        if (curr.discountId === id) {
          acc.push(index);
        }
        return acc;
      }, []);
      if (discountIndexes) {
        setInitKeys(discountIndexes);
        setSelectedRowKeys(discountIndexes);
      }
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
      <div className="overflow-y-scroll h-[65vh] px-4">
        <Spin spinning={loading}>
          <div className="between-row mt-2">
            <p className="text-[16px]">
              {`Selected `}
              <span className="font-semibold">{selectedRowKeys.length}</span>
              {` products`}
            </p>
            {selectedRowKeys.length > 0 && (
              <Button
                onClick={showSelected ? handleShowAll : handleShowSelected}
              >
                {showSelected ? "Show all" : "Show selected"}
              </Button>
            )}
          </div>
          <ConfigProvider theme={{ token: { colorPrimary: "#F9AF5EE5" } }}>
            <Table
              rowSelection={{
                type: "checkbox",
                ...rowSelection,
              }}
              columns={columns}
              dataSource={data}
              loading={tableLoading}
              className="mt-5 pagination-active table-header"
            />
          </ConfigProvider>
          <WarningModal
            text={
              "Current discount for all selection products will be changed! Confirm?"
            }
            open={warningOpen}
            handleCancel={() => setWarningOpen(false)}
            handleOk={handleWarningOk}
          />
        </Spin>
      </div>
    </Modal>
  );
};

export default DiscountProductsModal;
