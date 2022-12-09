import React from "react";
import { Table } from "antd";
import { viewIcon, editIcon, deleteIcon } from "../images/actions";

const data = [
  {
    key: "1",
    discountId: "66o84akdbafasd",
    name: "Black Friday Sale",
    percent: "28.58",
    start: "00:00 13-11-2022",
    end: "00:00 13-11-2022",
  },
];

const Promotion = () => {
  const columns = [
    {
      title: "Discount ID",
      dataIndex: "discountId",
      sorter: (a, b) => a.discountId.localeCompare(b.discountId),
      defaultSortOrder: "descend",
      render: (value) => <p className="table-cell">{value}</p>,
    },
    {
      title: "Discount Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      defaultSortOrder: "descend",
      render: (value) => <p className="table-cell">{value}</p>,
    },
    {
      title: "Percent",
      dataIndex: "percent",
      sorter: (a, b) => a.percent.localeCompare(b.percent),
      defaultSortOrder: "descend",
      render: (value) => <p className="table-cell">{value + "%"}</p>,
    },
    {
      title: "Start At",
      dataIndex: "start",
      sorter: (a, b) => a.start.localeCompare(b.start),
      defaultSortOrder: "descend",
      render: (value) => <p className="table-cell">{value}</p>,
    },
    {
      title: "End At",
      dataIndex: "end",
      sorter: (a, b) => a.end.localeCompare(b.end),
      defaultSortOrder: "descend",
      render: (value) => <p className="table-cell">{value}</p>,
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_) => (
        <div className="flex gap-x-[20px] justify-center">
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
              <img src={deleteIcon} alt="Cancel" />
            </center>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="row">
        <h1 className="title">Promotion</h1>
        <p className="subtitle">2 Promotions found</p>
      </div>
      <div className="mt-[12px] flex justify-end">
        <button className="clear-button">
          <p>Clear Filter</p>
        </button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        className="mt-5 pagination-active table-header"
      />
    </div>
  );
};

export default Promotion;
