import React from "react";
import { Segmented, Table } from "antd";
import getStatus from '../utils/getStatus';
import { viewIcon, editIcon, cancelIcon } from "../images/actions";

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

const Storage = () => {
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
            style={{ backgroundColor: "rgba(249, 175, 94, 0.9)" }}
          >
            <center>
              <img src={editIcon} alt="Edit" />
            </center>
          </button>
          <button
            className="action-button"
            style={{ backgroundColor: "rgba(253, 56, 56, 0.9)" }}
          >
            <center>
              <img src={cancelIcon} alt="Cancel" />
            </center>
          </button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="row">
        <h1 className="title">Storage</h1>
        <p className="subtitle">1 Import found</p>
      </div>
      <div className="between-row">
        <Segmented
          options={["All Import", "Completed", "Pending", "Cancel"]}
          className="options mt-4"
        />
        <div className="buttons-row">
          <button className="button">History</button>
          <button className="button">Import Item</button>
          <button className="clear-button">
            <p>Clear Filter</p>
          </button>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        className="mt-5 pagination-active table-header"
      />
    </div>
  );
};

export default Storage;
