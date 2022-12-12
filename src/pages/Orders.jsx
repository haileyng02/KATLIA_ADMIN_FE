import React, { useState } from "react";
import { DatePicker, Table, Segmented } from "antd";
import getStatus from '../utils/getStatus';
import { viewIcon, checkIcon, cancelIcon } from "../images/actions";
import CancelOrderModal from "../modals/order/CancelOrderModal";

const options = ["All Order", "Completed", "Pading", "Cancel"];

const data = [
  {
    key: "1",
    orderId: "2001",
    name: "Nguyen Huu Trung Kien",
    address: "University Of Information Technology",
    date: "17/10/2022",
    total: "54.00",
    status: "Completed",
  },
  {
    key: "2",
    orderId: "2002",
    name: "A",
    address: "University Of Information Technology",
    date: "17/10/2022",
    total: "52.00",
    status: "Pending",
  },
  {
    key: "3",
    orderId: "2003",
    name: "B",
    address: "University Of Information Technology",
    date: "18/10/2022",
    total: "54.00",
    status: "Canceled",
  },
  {
    key: "4",
    orderId: "2002",
    name: "AB",
    address: "University Of Information Technology",
    date: "17/10/2022",
    total: "53.00",
    status: "Completed",
  },
  {
    key: "5",
    orderId: "2002",
    name: "Nguyen Huu Trung Kien",
    address: "University Of Information Technology",
    date: "17/10/2022",
    total: "54.00",
    status: "Pending",
  },
  {
    key: "6",
    orderId: "2004",
    name: "Nguyen Huu Trung Kien",
    address: "University Of Information Technology",
    date: "10/10/2022",
    total: "54.00",
    status: "Canceled",
  },
  {
    key: "7",
    orderId: "2002",
    name: "Nguyen Huu Trung Kien",
    address: "University Of Information Technology",
    date: "19/10/2022",
    total: "54.00",
    status: "Completed",
  },
  {
    key: "8",
    orderId: "2002",
    name: "Nguyen Huu Trung Kien",
    address: "University Of Information Technology",
    date: "17/10/2022",
    total: "54.00",
    status: "Pending",
  },
  {
    key: "9",
    orderId: "2002",
    name: "Nguyen Huu Trung Kien",
    address: "University Of Information Technology",
    date: "17/10/2022",
    total: "54.00",
    status: "Canceled",
  },
  {
    key: "10",
    orderId: "2002",
    name: "Nguyen Huu Trung Kien",
    address: "University Of Information Technology",
    date: "17/10/2022",
    total: "54.00",
    status: "Canceled",
  },
  {
    key: "11",
    orderId: "2002",
    name: "Nguyen Huu Trung Kien",
    address: "University Of Information Technology",
    date: "17/10/2022",
    total: "54.00",
    status: "Canceled",
  },
];

const Orders = () => {
  const [cancelModal,setCancelModal] = useState(false);
  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      sorter: (a, b) => a.orderId.localeCompare(b.orderId),
      defaultSortOrder: 'descend',
      render: (value) => <p className="table-cell">{"#" + value}</p>,
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      defaultSortOrder: 'descend',
      render: (value) => <p className="table-cell">{value}</p>,
    },
    {
      title: "Address",
      dataIndex: "address",
      sorter: (a, b) => a.address.localeCompare(b.address),
      defaultSortOrder: 'descend',
      render: (value) => <p className="table-cell">{value}</p>,
    },
    {
      title: "Date",
      dataIndex: "date",
      sorter: (a, b) => a.date.localeCompare(b.date),
      defaultSortOrder: 'descend',
      render: (value) => <p className="table-cell">{value}</p>,
    },
    {
      title: "Total",
      dataIndex: "total",
      sorter: (a, b) => a.total.localeCompare(b.total),
      defaultSortOrder: 'descend',
      render: (value) => <p className="table-cell">{"$" + value}</p>,
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      sorter: (a, b) => a.status.localeCompare(b.status),
      defaultSortOrder: 'descend',
      render: (value) => getStatus(value),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_) => (
        <div className="flex gap-x-[11px] justify-center">
          <button
            className="action-button"
            style={{ backgroundColor: "rgba(67, 204, 248, 0.9)" }}
          >
            <center>
              <img src={viewIcon} alt="View" />
            </center>
          </button>
          <button
            className="action-button"
            style={{ backgroundColor: "#60BE80" }}
          >
            <center>
              <img src={checkIcon} alt="Check" />
            </center>
          </button>
          <button
            className="action-button"
            style={{ backgroundColor: "rgba(253, 56, 56, 0.9)" }}
            onClick={()=>{setCancelModal(true)}}
          >
            <center>
              <img src={cancelIcon} alt="Cancel" />
            </center>
          </button>
        </div>
      ),
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    // console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <div>
      <div className="between-row">
        <div className="row">
          <h1 className="title">Order</h1>
          <p className="subtitle">15 Orders found</p>
        </div>
        <DatePicker className="bg-primary font-bold " />
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
        <Segmented options={options} className='options'/>
        <button
          className="clear-button"
        >
          <p>Clear Filter</p>
        </button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        className="mt-5 pagination-active table-header"
      />
      <CancelOrderModal open={cancelModal} handleCancel={()=>setCancelModal(false)}/>
    </div>
  );
};

export default Orders;
