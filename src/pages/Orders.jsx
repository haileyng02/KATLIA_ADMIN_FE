import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { DatePicker, Table, Segmented, Tooltip } from "antd";
import { useSnackbar } from "notistack";
import getStatus, { getOrderStatusText } from "../utils/getStatus";
import { viewIcon, checkIcon, cancelIcon } from "../images/actions";
import CancelOrderModal from "../modals/order/CancelOrderModal";
import OrderDetailModal from "../modals/order/OrderDetailModal";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";
import dayjs from "dayjs";

const options = [
  "All Order",
  "Ordered",
  "Confirmed",
  "Shipping",
  "Arrived",
  "Canceled",
];

const Orders = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { enqueueSnackbar } = useSnackbar();
  const [cancelModal, setCancelModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [currItem, setCurrItem] = useState();
  const [option, setOption] = useState();
  const [date, setDate] = useState();

  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      sorter: (a, b) => a.orderId?.localeCompare(b.orderId),
      render: (value) => <p className="table-cell">{"#" + value}</p>,
    },
    {
      title: "Customer's Name",
      dataIndex: "customerName",
      sorter: (a, b) => a.customerName?.localeCompare(b.customerName),
      render: (value) => <p className="table-cell">{value}</p>,
    },
    {
      title: "Address",
      dataIndex: "address",
      sorter: (a, b) => a.address?.localeCompare(b.address),
      render: (value) => <p className="table-cell">{value}</p>,
    },
    {
      title: "Date",
      dataIndex: "createDate",
      filteredValue: filteredInfo.createDate || null,
      onFilter: (value, record) =>
        dayjs(value).isSame(dayjs(record.createDate), "date"),
      sorter: (a, b) => a.createDate?.localeCompare(b.createDate),
      render: (value) => (
        <p className="table-cell">{dayjs(value).format("DD-MM-YYYY")}</p>
      ),
    },
    {
      title: "Total",
      dataIndex: "total",
      sorter: (a, b) => a.total - b.total,
      render: (value) => <p className="table-cell">{"$" + value}</p>,
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      filteredValue: filteredInfo.status || null,
      onFilter: (value, record) =>
        getOrderStatusText(record.status)?.indexOf(value) === 0,
      sorter: (a, b) =>
        getOrderStatusText(a.status)?.localeCompare(
          getOrderStatusText(b.status)
        ),
      render: (value) => getStatus(value),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (value) => (
        <div className="flex gap-x-[11px] justify-center">
          <Tooltip title="View order's detail">
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
          <Tooltip
            title={
              value.status < 4
                ? `Update to ${getOrderStatusText(value.status + 1)}`
                : null
            }
          >
            <button
              className={`action-button ${
                value.status >= 4 && "cursor-not-allowed"
              }`}
              style={{
                backgroundColor: value.status < 4 ? "#60BE80" : "#CDCDCD",
              }}
              onClick={
                value.status < 4
                  ? () => handleUpdateOrderStatus(value.orderId)
                  : null
              }
            >
              <center>
                <img src={checkIcon} alt="Check" />
              </center>
            </button>
          </Tooltip>
          <Tooltip title={value.status < 3 ? "Cancel order" : null}>
            <button
              className={`action-button ${
                value.status >= 3 && "cursor-not-allowed"
              }`}
              style={{
                backgroundColor:
                  value.status < 3 ? "rgba(253, 56, 56, 0.9)" : "#CDCDCD",
              }}
              onClick={value.status < 3 ? () => handleCancelOrder(value) : null}
            >
              <center>
                <img src={cancelIcon} alt="Cancel" />
              </center>
            </button>
          </Tooltip>
        </div>
      ),
    },
  ];

  //Update order status
  const updateOrderStatus = async (id) => {
    setLoading(true);
    try {
      const token = currentUser.token;
      const result = await appApi.put(routes.UPDATE_ORDER_STATUS(id), null, {
        ...routes.getAccessTokenHeader(token),
        ...routes.getUpdateOrderStatusBody(id),
      });
      console.log(result);
      enqueueSnackbar("Updated order status successfully!", {
        variant: "success",
      });
      getAllOrder();
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

  //Get all order
  const getAllOrder = async () => {
    setLoading(true);
    try {
      const token = currentUser.token;
      const result = await appApi.get(
        routes.GET_ALL_ORDER,
        routes.getAccessTokenHeader(token)
      );
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
    setLoading(false);
  };

  const onChange = (pagination, filters, sorter, extra) => {
    setFilteredInfo(filters);
  };

  const handleChooseStatus = (value) => {
    setOption(value);
  };

  const handleViewDetail = (value) => {
    setCurrItem(value);
    setDetailModal(true);
  };

  const handleCancelOrder = (value) => {
    setCancelModal(true);
    setCurrItem(value);
  };

  const handleUpdateOrderStatus = (id) => {
    updateOrderStatus(id);
  };

  const handleClearFilter = () => {
    setOption("All Order");
    setDate(null);
    setFilteredInfo({ ...filteredInfo, createDate: null });
  };

  useEffect(() => {
    if (currentUser) getAllOrder();
  }, [currentUser]);

  useEffect(() => {
    if (!option) return;
    if (option === "All Order")
      setFilteredInfo({ ...filteredInfo, status: null });
    else setFilteredInfo({ ...filteredInfo, status: [option] });
  }, [option]);

  useEffect(() => {
    if (!date) {
      return;
    }
    console.log(filteredInfo);
    setFilteredInfo({ ...filteredInfo, createDate: [date] });
  }, [date]);

  return (
    <div>
      <div className="between-row">
        <div className="row">
          <h1 onClick={getAllOrder} className="title">
            Order
          </h1>
          {data ? (
            <p className="subtitle">{data.length + " Orders found"}</p>
          ) : null}
        </div>
        <DatePicker
          value={date}
          onChange={setDate}
          className="bg-primary font-semibold"
        />
      </div>
      <div className="flex justify-between mt-[37px]">
        {/* <div className="flex">
          {options.map((b, i) => (
            <button
              key={i}
              className="bg-white w-[85px] h-[36px] rounded-5"
              style={{ color: "rgba(0, 0, 0, 0.5)" }}
            >
              <p className="font-inter font-semibold text-15 mb-0 hover:text-secondary">
                {b}
              </p>
            </button>
          ))}
        </div> */}
        <Segmented
          options={options}
          value={option}
          className="options"
          onChange={(value) => handleChooseStatus(value)}
        />
        <button onClick={handleClearFilter} className="clear-button">
          <p>Clear Filter</p>
        </button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        loading={loading}
        className="mt-5 pagination-active table-header"
      />
      <OrderDetailModal
        open={detailModal}
        handleCancel={() => setDetailModal(false)}
        currentUser={currentUser}
        currItem={currItem}
      />
      <CancelOrderModal
        open={cancelModal}
        handleCancel={() => setCancelModal(false)}
        id={currItem?.orderId}
        currentUser={currentUser}
        getAllOrder={getAllOrder}
      />
    </div>
  );
};

export default Orders;
