import React, {useEffect, useState} from "react";
import { Table } from "antd";
import getRole from "../utils/getRole";
import { editIcon } from "../images/actions";
import AddStaffModal from "../modals/staff/AddStaffModal";
import ActionModal from "../modals/staff/ActionModal";
import appApi from "../api/appApi";
import * as routes from '../api/apiRoutes'

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
  const [addOpen,setAddOpen] = useState(false);
  const [actionOpen,setActionOpen] = useState(false);

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
            onClick={()=>setActionOpen(true)}
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
        return <p className={"table-cell-medium text-[#60BE80]"}>{status}</p>;
      case "Retired":
        return (
          <p
            className={"table-cell-medium"}
            style={{ color: "rgba(245, 150, 7, 0.57)" }}
          >
            {status}
          </p>
        );
      default:
        return null;
    }
  };

  //Get all staff
  const getAllStaff = async () => {
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzQ2ZTgzMDIwNjE5M2M4N2RlMWFjMzIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY3MTE2MjM1MSwiZXhwIjoxNjcxMjQ4NzUxfQ.svzkppg4xRKCLbiD-cjf3PzjvnfxflpIa2GnTA8eMXw";
      const result = await appApi.get(
        routes.GET_ALL_STAFF,
        routes.getAccessTokenHeader(token)
      );
      console.log(result);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
      } else {
        console.log(err.message)
      }
    }
  }
  useEffect(() => {
    getAllStaff()
  }, [])

  //Add staff
  const addStaff = async () => {
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzQ2ZTgzMDIwNjE5M2M4N2RlMWFjMzIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY3MTE2MjM1MSwiZXhwIjoxNjcxMjQ4NzUxfQ.svzkppg4xRKCLbiD-cjf3PzjvnfxflpIa2GnTA8eMXw";
      const result = await appApi.post(
        routes.ADD_STAFF,
        routes.getAddStaffBody("professional5298@gmail.com", "SALES", "2022-12-16T13:31:20.270Z", 1),
        routes.getAccessTokenHeader(token)
      );
      console.log(result)
    } catch (err) {
      if (err.response) {
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
      } else {
        console.log(err.message)
      }
    }
  }
  return (
    <div>
      <div className="row">
        <h1 onClick={addStaff} className="title">Staff</h1>
        <p className="subtitle">2 Staffs found</p>
      </div>
      <div className="buttons-row justify-end mt-[12px]">
        <button onClick={()=>setAddOpen(true)} className="button">Add Staff</button>
        <button className="clear-button">
          <p>Clear Filter</p>
        </button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        className="mt-5 pagination-active table-header"
      />
      <AddStaffModal open={addOpen} handleCancel={()=>setAddOpen(false)}/>
      <ActionModal open={actionOpen} handleCancel={()=>setActionOpen(false)}/>
    </div>
  );
};

export default Staff;
