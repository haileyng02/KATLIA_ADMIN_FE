import React from "react";
import { Table } from "antd";
import { editIcon } from "../images/actions";

const data = [
  {
    key: "1",
    staffId: "19877",
    name: "Nguyen Huu Trung Kien",
    email: "a@gmail.com",
    phoneNumber: "0975305060",
    role: "Admin",
    workingDay: "22-10-2022",
    status: "Working",
  },
  {
    key: "2",
    staffId: "19877",
    name: "A",
    email: "a@gmail.com",
    phoneNumber: "0975305060",
    role: "Admin",
    workingDay: "22-10-2022",
    status: "Retired",
  },
];

const Staff = () => {
  const columns = [
    {
      title: "Staff ID",
      dataIndex: "staffId",
      sorter: (a, b) => a.staffId.localeCompare(b.staffId),
      defaultSortOrder: "descend",
      render: (value) => <p className="table-cell">{"#" + value}</p>,
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      defaultSortOrder: "descend",
      render: (value) => <p className="table-cell">{value}</p>,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
      defaultSortOrder: "descend",
      render: (value) => <p className="table-cell">{value}</p>,
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      sorter: (a, b) => a.phoneNumber.localeCompare(b.phoneNumber),
      defaultSortOrder: "descend",
      render: (value) => <p className="table-cell">{value}</p>,
    },
    {
      title: "Role",
      dataIndex: "role",
      sorter: (a, b) => a.role.localeCompare(b.role),
      defaultSortOrder: "descend",
      render: (value) => getRole(value),
    },
    {
      title: "Working Day",
      dataIndex: "workingDay",
      sorter: (a, b) => a.workingDay.localeCompare(b.workingDay),
      defaultSortOrder: "descend",
      render: (value) => <p className="table-cell">{value}</p>,
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
      defaultSortOrder: "descend",
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
            style={{ backgroundColor: "rgba(249, 175, 94, 0.9)" }}
          >
            <center>
              <img src={editIcon} alt="Edit" />
            </center>
          </button>
        </div>
      ),
    },
  ];

  const getStatus = (status) => {
    switch (status) {
      case "Working":
        return <p className={"table-cell text-[#60BE80]"}>{status}</p>;
      case "Retired":
        return (
          <p
            className={"table-cell"}
            style={{ color: "rgba(245, 150, 7, 0.57)" }}
          >
            {status}
          </p>
        );
      default:
        return null;
    }
  };

  const getRole = (role) => {
    switch (role) {
      case "Admin":
        return (
          <p
            className={"table-cell"}
            style={{ color: "rgba(253, 56, 56, 0.9)" }}
          >
            {role}
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="row">
        <h1 className="title">Staff</h1>
        <p className="subtitle">2 Staffs found</p>
      </div>
      <div className="buttons-row justify-end mt-[12px]">
        <button className="button">Add Staff</button>
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

export default Staff;
