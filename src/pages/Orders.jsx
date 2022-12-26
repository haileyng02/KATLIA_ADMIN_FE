import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { DatePicker, Table, Segmented, Tooltip } from "antd";
import getStatus, { getOrderStatusText } from "../utils/getStatus";
import { viewIcon, checkIcon, cancelIcon } from "../images/actions";
import CancelOrderModal from "../modals/order/CancelOrderModal";
import OrderDetailModal from "../modals/order/OrderDetailModal";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";
import dayjs from "dayjs";

const options = [
  "All Order",
  "Cart",
  "Ordered",
  "Confirmed",
  "Shipping",
  "Arrived",
  "Canceled",
];

const Orders = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [cancelModal, setCancelModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [data, setData] = useState();
  const [filteredInfo, setFilteredInfo] = useState({});
  const [currItem, setCurrItem] = useState();

  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      sorter: (a, b) => a.orderId?.localeCompare(b.orderId),
      defaultSortOrder: "descend",
      render: (value) => <p className="table-cell">{"#" + value}</p>,
    },
    {
      title: "Customer's Name",
      dataIndex: "customerName",
      sorter: (a, b) => a.customerName?.localeCompare(b.customerName),
      defaultSortOrder: "descend",
      render: (value) => <p className="table-cell">{value}</p>,
    },
    {
      title: "Address",
      dataIndex: "address",
      sorter: (a, b) => a.address?.localeCompare(b.address),
      defaultSortOrder: "descend",
      render: (value) => <p className="table-cell">{value}</p>,
    },
    {
      title: "Date",
      dataIndex: "createDate",
      sorter: (a, b) => a.createDate?.localeCompare(b.createDate),
      defaultSortOrder: "descend",
      render: (value) => (
        <p className="table-cell">{dayjs(value).format("DD-MM-YYYY")}</p>
      ),
    },
    {
      title: "Total",
      dataIndex: "total",
      sorter: (a, b) => a.total - b.total,
      defaultSortOrder: "descend",
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
      defaultSortOrder: "descend",
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
          <Tooltip title="">
            <button
              className="action-button"
              style={{ backgroundColor: "#60BE80" }}
            >
              <center>
                <img src={checkIcon} alt="Check" />
              </center>
            </button>
          </Tooltip>
          <Tooltip title="Cancel order">
            <button
              className="action-button"
              style={{ backgroundColor: "rgba(253, 56, 56, 0.9)" }}
              onClick={() => {
                setCancelModal(true);
              }}
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
  const updateOrderStatus = async () => {
    try {
      const token = currentUser.token;
      const result = await appApi.put(
        `/staff-order/updateOrderStatus/638ff3bdb1a8e896eafcabe1`,
        null,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
          params: {
            id: "638ff3bdb1a8e896eafcabe1"
          }
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

  //Get all order
  const getAllOrder = async () => {
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
  };

  const onChange = (pagination, filters, sorter, extra) => {
    setFilteredInfo(filters);
  };

  const handleChooseStatus = (value) => {
    if (value === "All Order") setFilteredInfo({});
    else setFilteredInfo({ ...filteredInfo, status: [value] });
  };

  const handleViewDetail = (value) => {
    setCurrItem(value);
    setDetailModal(true);
  };

  useEffect(() => {
    if (currentUser) getAllOrder();
  }, [currentUser]);

  //Get price order
  const getPriceOrder = async () => {
    try {
      const token = currentUser.token;
      const result = await appApi.get(
        routes.GET_PRICE_ORDER("638ff3bdb1a8e896eafcabe1"),
        {
          ...routes.getAccessTokenHeader(token),
          ...routes.getPriceOrderBody("638ff3bdb1a8e896eafcabe1"),
        }
      );
      // console.log(result)
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
        <DatePicker className="bg-primary font-semibold" />
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
          className="options"
          onChange={(value) => handleChooseStatus(value)}
        />
        <button className="clear-button">
          <p>Clear Filter</p>
        </button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        loading={!data}
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
      />
    </div>
  );
};

export default Orders;
