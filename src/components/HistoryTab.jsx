import React, { useState, useEffect } from "react";
import { Segmented, Table, Tooltip } from "antd";
import { useSelector } from "react-redux";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";
import ImportDetailModal from "../modals/import/ImportDetailModal";
import { viewIcon, checkIcon, cancelIcon } from "../images/actions";
import getImportStatus from "../utils/getImportStatus";
import dayjs from "dayjs";

const HistoryTab = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [detailOpen, setDetailOpen] = useState(false);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [option, setOption] = useState();

  const columns = [
    {
      title: "Import ID",
      dataIndex: "id",
      sorter: (a, b) => a.id?.localeCompare(b.id),
      defaultSortOrder: "descend",
      render: (value) => <p className="table-cell">{"#" + value}</p>,
    },
    {
      title: "Staff's Name",
      dataIndex: "staffName",
      sorter: (a, b) => a.staffName?.localeCompare(b.staffName),
      defaultSortOrder: "descend",
      render: (value) => <p className="table-cell">{value}</p>,
    },
    {
      title: "Date",
      dataIndex: "date",
      sorter: (a, b) => a.date?.localeCompare(b.date),
      defaultSortOrder: "descend",
      render: (value) => (
        <p className="table-cell">{dayjs(value).format("DD/MM/YYYY")}</p>
      ),
    },
    {
      title: "Price",
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
        getImportStatus(record.status).text?.indexOf(value) === 0,
      sorter: (a, b) => getImportStatus(a.status).text?.localeCompare(getImportStatus(b.status).text),
      defaultSortOrder: "descend",
      render: (value) => (
        <center>
          <p
            className="table-cell"
            style={{ color: getImportStatus(value).color }}
          >
            {getImportStatus(value).text}
          </p>
        </center>
      ),
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
              onClick={() => setDetailOpen(true)}
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

  //get staff import history
  const getStaffImportHistory = async () => {
    setLoading(true);
    try {
      const token = currentUser.token;
      const result = await appApi.get(
        routes.STAFF_IMPORT_HISTORY,
        routes.getAccessTokenHeader(token)
      );
      console.log(result.data);
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
    setLoading(false);
  };

  useEffect(() => {
    if (currentUser) {
      getStaffImportHistory();
    }
  }, [currentUser]);

  useEffect(() => {
    if (!option) return;
    if (option === "All Import")
      setFilteredInfo({ ...filteredInfo, status: null });
    else setFilteredInfo({ ...filteredInfo, status: [option] });
  }, [option]);

  return (
    <div className="tab-container">
      <Segmented
        options={["All Import", "Pending", "Completed", "Canceled"]}
        value={option}
        onChange={(value) => setOption(value)}
        className="options"
      />
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        className="mt-5 pagination-active table-header"
      />
      <ImportDetailModal
        open={detailOpen}
        handleCancel={() => setDetailOpen(false)}
      />
    </div>
  );
};

export default HistoryTab;
