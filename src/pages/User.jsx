import React, {useState} from "react";
import { Table, Tooltip } from "antd";
import getRole from "../utils/getRole";
import { profileIcon } from "../images/actions";
import ProfileModal from "../modals/user/ProfileModal";

const data = [
  {
    key: "1",
    userId: "19877",
    name: "Nguyen Huu Trung Kien",
    email: "a@gmail.com",
    phoneNumber: "0975305060",
    role: "Admin",
  },
  {
    key: "2",
    userId: "19877",
    name: "A",
    email: "a@gmail.com",
    phoneNumber: "0975305060",
    role: "Customer",
  },
];

const User = () => {
  const [profileOpen,setProfileOpen] = useState(false);

  const columns = [
    {
      title: "User ID",
      dataIndex: "userId",
      sorter: (a, b) => a.userId.localeCompare(b.userId),
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
      title: "Action",
      key: "action",
      align: "center",
      render: (_) => (
        <div className="flex gap-x-[11px] justify-center">
          <Tooltip title='View Profile'>
            <button
              className="action-button"
              style={{ backgroundColor: "rgba(249, 175, 94, 0.9)" }}
              onClick={()=>setProfileOpen(true)}
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

  return (
    <div>
      <div className="row">
        <h1 className="title">User</h1>
        <p className="subtitle">2 Users found</p>
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
      <ProfileModal open={profileOpen} handleCancel={()=>setProfileOpen(false)}/>
    </div>
  );
};

export default User;
