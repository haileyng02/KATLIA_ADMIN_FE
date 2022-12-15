import React, {useState} from "react";
import { Segmented, Table, Tooltip } from "antd";
import getStatus from "../utils/getStatus";
import { viewIcon, checkIcon, cancelIcon } from "../images/actions";
import ImportDetailModal from "../modals/import/ImportDetailModal";

const data = [
  {
    key: "1",
    importId: "2001",
    name: "Nguyen Huu Trung Kien",
    date: "17/10/2022",
    price: "54.00",
    status: "Completed",
  },
  {
    key: "2",
    importId: "2001",
    name: "Nguyen Huu Trung Kien",
    date: "17/10/2022",
    price: "54.00",
    status: "Completed",
  },
  {
    key: "3",
    importId: "2001",
    name: "Nguyen Huu Trung Kien",
    date: "17/10/2022",
    price: "54.00",
    status: "Completed",
  },
  {
    key: "4",
    importId: "2001",
    name: "Nguyen Huu Trung Kien",
    date: "17/10/2022",
    price: "54.00",
    status: "Completed",
  },
  {
    key: "5",
    importId: "2001",
    name: "Nguyen Huu Trung Kien",
    date: "17/10/2022",
    price: "54.00",
    status: "Completed",
  },
  {
    key: "6",
    importId: "2001",
    name: "Nguyen Huu Trung Kien",
    date: "17/10/2022",
    price: "54.00",
    status: "Completed",
  },
  {
    key: "7",
    importId: "2001",
    name: "Nguyen Huu Trung Kien",
    date: "17/10/2022",
    price: "54.00",
    status: "Completed",
  },
  {
    key: "8",
    importId: "2001",
    name: "Nguyen Huu Trung Kien",
    date: "17/10/2022",
    price: "54.00",
    status: "Completed",
  },
  {
    key: "9",
    importId: "2001",
    name: "Nguyen Huu Trung Kien",
    date: "17/10/2022",
    price: "54.00",
    status: "Completed",
  },
  {
    key: "10",
    importId: "2001",
    name: "Nguyen Huu Trung Kien",
    date: "17/10/2022",
    price: "54.00",
    status: "Completed",
  },
  {
    key: "11",
    importId: "2001",
    name: "Nguyen Huu Trung Kien",
    date: "17/10/2022",
    price: "54.00",
    status: "Completed",
  },
  {
    key: "12",
    importId: "2001",
    name: "Nguyen Huu Trung Kien",
    date: "17/10/2022",
    price: "54.00",
    status: "Completed",
  },
];

const HistoryTab = () => {
  const [detailOpen,setDetailOpen] = useState(false);

  const columns = [
    {
      title: "Import ID",
      dataIndex: "importId",
      sorter: (a, b) => a.importId.localeCompare(b.importId),
      defaultSortOrder: "descend",
      render: (value) => <p className="table-cell">{"#" + value}</p>,
    },
    {
      title: "Staff's Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      defaultSortOrder: "descend",
      render: (value) => <p className="table-cell">{value}</p>,
    },
    {
      title: "Date",
      dataIndex: "date",
      sorter: (a, b) => a.date.localeCompare(b.date),
      defaultSortOrder: "descend",
      render: (value) => <p className="table-cell">{value}</p>,
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price.localeCompare(b.price),
      defaultSortOrder: "descend",
      render: (value) => <p className="table-cell">{"$" + value}</p>,
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      sorter: (a, b) => a.status.localeCompare(b.status),
      defaultSortOrder: "descend",
      render: (value) => getStatus(value),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_) => (
        <div className="flex gap-x-5 justify-center">
          <Tooltip title="View import's detail">
            <button
              className="action-button"
              style={{ backgroundColor: "rgba(67, 204, 248, 0.9)" }}
              onClick={()=>setDetailOpen(true)}
            >
              <center>
                <img src={viewIcon} alt="View" />
              </center>
            </button>
          </Tooltip>
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
    <div className="tab-container">
      <Segmented
        options={["All Import", "Pending", "Completed", "Canceled"]}
        className="options"
      />
      <Table
        columns={columns}
        dataSource={data}
        className="mt-5 pagination-active table-header"
      />
      <ImportDetailModal open={detailOpen} handleCancel={()=>setDetailOpen(false)}/>
    </div>
  );
};

export default HistoryTab;
