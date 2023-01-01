import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Table, Tooltip } from "antd";
import getRole from "../utils/getRole";
import { profileIcon } from "../images/actions";
import ProfileModal from "../modals/user/ProfileModal";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";

const User = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [profileOpen, setProfileOpen] = useState(false);
  const [data, setData] = useState();
  const [filteredInfo, setFilteredInfo] = useState({});
  const [currItem, setCurrItem] = useState();

  const columns = [
    {
      title: "User ID",
      dataIndex: "id",
      sorter: (a, b) => a.id?.localeCompare(b.id),
      defaultSortOrder: "descend",
      render: (value) => <p className="table-cell">{"#" + value}</p>,
    },
    {
      title: "Name",
      dataIndex: "fullName",
      sorter: (a, b) => a.fullName?.localeCompare(b.fullName),
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
        {
          text: "Customer",
          value: "Customer",
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
      title: "Action",
      key: "action",
      align: "center",
      render: (value) => (
        <div className="flex gap-x-[11px] justify-center">
          <Tooltip title="View Profile">
            <button
              className="action-button"
              style={{ backgroundColor: "rgba(249, 175, 94, 0.9)" }}
              onClick={() => handleViewProfile(value)}
            >
              <center>
                <img src={profileIcon} alt="Profile" />
              </center>
            </button>
          </Tooltip>
        </div>
      ),
    },
  ];

  //Get profile
  const getProfile = async () => {
    try {
      const token = currentUser.token;
      const result = await appApi.get(
        routes.GET_PROFILE,
        routes.getAccessTokenHeader(token)
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

  //Get all user
  const getAllUser = async () => {
    try {
      const token = currentUser.token;
      const result = await appApi.get(
        routes.GET_ALL_USER,
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

  useEffect(() => {
    if (currentUser) getAllUser();
  }, [currentUser]);

  const onChange = (pagination, filters, sorter, extra) => {
    setFilteredInfo(filters);
  };

  const handleViewProfile = (value) => {
    setProfileOpen(true);
    setCurrItem(value);
  };

  return (
    <div>
      <div className="row">
        <h1 className="title">User</h1>
        {data ? (
          <p className="subtitle">{data.length + " Users found"}</p>
        ) : null}
      </div>
      <div className="mt-[12px] flex justify-end">
        <button onClick={() => setFilteredInfo({})} className="clear-button">
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
      <ProfileModal
        open={profileOpen}
        handleCancel={() => setProfileOpen(false)}
        currItem={currItem}
      />
    </div>
  );
};

export default User;
