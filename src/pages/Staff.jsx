import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { Table } from "antd";
import getRole from "../utils/getRole";
import { editIcon } from "../images/actions";
import AddStaffModal from "../modals/staff/AddStaffModal";
import ActionModal from "../modals/staff/ActionModal";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";

const Staff = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [addOpen, setAddOpen] = useState(false);
  const [actionOpen, setActionOpen] = useState(false);
  const [data, setData] = useState();
  const [filteredInfo, setFilteredInfo] = useState({});

  const columns = [
    {
      title: "Staff ID",
      dataIndex: "staffId",
      sorter: (a, b) => a.staffId?.localeCompare(b.staffId),
      defaultSortOrder: "descend",
      render: (value) => <p className="table-cell">{"#" + value}</p>,
    },
    {
      title: "Name",
      dataIndex: "fullname",
      sorter: (a, b) => a.fullname?.localeCompare(b.name),
      defaultSortOrder: "descend",
      render: (value) => <p className="table-cell">{value}</p>,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email?.localeCompare(b.email),
      defaultSortOrder: "descend",
      render: (value) => <p className="table-cell">{value}</p>,
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      sorter: (a, b) => a.phoneNumber?.localeCompare(b.phoneNumber),
      defaultSortOrder: "descend",
      render: (value) => <p className="table-cell">{value}</p>,
    },
    {
      title: "Role",
      dataIndex: "role",
      filters: [
        {
          text: "Admin",
          value: "Admin",
        },
        {
          text: "Sales",
          value: "Sales",
        },
        {
          text: "Storage",
          value: "Storage",
        },
      ],
      filteredValue: filteredInfo.role || null,
      onFilter: (value, record) =>
        record.role?.indexOf(value.toUpperCase()) === 0,
      sorter: (a, b) => a.role?.localeCompare(b.role),
      defaultSortOrder: "descend",
      render: (value) => getRole(value),
    },
    {
      title: "Start At",
      dataIndex: "startAt",
      sorter: (a, b) => a.startAt?.localeCompare(b.startAt),
      defaultSortOrder: "descend",
      render: (value) => (
        <p className="table-cell">{dayjs(value).format("DD-MM-YYYY")}</p>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      filters: [
        {
          text: "Working",
          value: 1,
        },
        {
          text: "Retired",
          value: 0,
        },
      ],
      filteredValue: filteredInfo.status || null,
      onFilter: (value, record) => record.status === value,
      sorter: (a, b) => b.status - a.status,
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
            onClick={() => setActionOpen(true)}
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
      case 1:
        return <p className={"table-cell-medium text-[#60BE80]"}>Working</p>;
      case 2:
        return (
          <p
            className={"table-cell-medium"}
            style={{ color: "rgba(245, 150, 7, 0.57)" }}
          >
            Retired
          </p>
        );
      default:
        return null;
    }
  };

  //Get all staff
  const getAllStaff = async () => {
    try {
      const token = currentUser.token;
      const result = await appApi.get(
        routes.GET_ALL_STAFF,
        routes.getAccessTokenHeader(token)
      );
      console.log(result);
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
  useEffect(() => {
    getAllStaff();
  }, [currentUser]);

  //Add staff
  const addStaff = async () => {
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzQ2ZTgzMDIwNjE5M2M4N2RlMWFjMzIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY3MTE2MjM1MSwiZXhwIjoxNjcxMjQ4NzUxfQ.svzkppg4xRKCLbiD-cjf3PzjvnfxflpIa2GnTA8eMXw";
      const result = await appApi.post(
        routes.ADD_STAFF,
        routes.getAddStaffBody(
          "professional5298@gmail.com",
          "SALES",
          "2022-12-16T13:31:20.270Z",
          1
        ),
        routes.getAccessTokenHeader(token)
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

  const onChange = (pagination, filters, sorter, extra) => {
    setFilteredInfo(filters);
  };

  return (
    <div>
      <div className="row">
        <h1 onClick={addStaff} className="title">
          Staff
        </h1>
        <p className="subtitle">2 Staffs found</p>
      </div>
      <div className="buttons-row justify-end mt-[12px]">
        <button onClick={() => setAddOpen(true)} className="button">
          Add Staff
        </button>
        <button onClick={()=>setFilteredInfo({})} className="clear-button">
          <p>Clear Filter</p>
        </button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        loading={!data}
        onChange={onChange}
        className="mt-5 pagination-active table-header"
      />
      <AddStaffModal open={addOpen} handleCancel={() => setAddOpen(false)} />
      <ActionModal
        open={actionOpen}
        handleCancel={() => setActionOpen(false)}
      />
    </div>
  );
};

export default Staff;
