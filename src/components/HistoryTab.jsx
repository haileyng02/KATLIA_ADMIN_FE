import React, { useState, useEffect } from "react";
import { Segmented, Table, Tooltip } from "antd";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";
import ImportDetailModal from "../modals/import/ImportDetailModal";
import { viewIcon, checkIcon, cancelIcon } from "../images/actions";
import getImportStatus from "../utils/getImportStatus";
import dayjs from "dayjs";
import WarningModal from "../modals/WarningModal";

const HistoryTab = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { enqueueSnackbar } = useSnackbar();
  const [detailOpen, setDetailOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [option, setOption] = useState();
  const [currItem, setCurrItem] = useState();

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
      sorter: (a, b) =>
        getImportStatus(a.status).text?.localeCompare(
          getImportStatus(b.status).text
        ),
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
      render: (value) => (
        <div className="flex gap-x-5 justify-center">
          <Tooltip title="View import's detail">
            <button
              className="action-button"
              style={{ backgroundColor: "rgba(67, 204, 248, 0.9)" }}
              onClick={() => handleViewDetail(value)}
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
          <Tooltip title={value.status === 1 && "Cancel this import"}>
            <button
              className={`action-button ${
                value.status !== 1 && "cursor-not-allowed"
              }`}
              style={{
                backgroundColor: value.status === 1 ? "rgba(253, 56, 56, 0.9)" : "#CDCDCD",
              }}
              onClick={value.status === 1 ? () => handleCancelImport(value) : null}
            >
              <center>
                <img src={cancelIcon} alt="Cancel" />
              </center>
            </button>
          </Tooltip>
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

  //Cancel import
  const cancelImport = async (id) => {
    try {
      const token = currentUser.token;
      const result = await appApi.put(routes.CANCEL_IMPORT(id), null, {
        ...routes.getAccessTokenHeader(token),
        ...routes.getCancelImportIdParams(id),
      });
      console.log(result.data);
      enqueueSnackbar('Import canceled!',{variant:'success'})
      getStaffImportHistory();
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

  const handleViewDetail = (value) => {
    setDetailOpen(true);
    setCurrItem(value);
  };

  const handleCancelImport = (value) => {
    setCurrItem(value);
    setWarningOpen(true);
  };

  const handleWarningOk = () => {
    cancelImport(currItem.id);
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
        currItem={currItem}
      />
      <WarningModal
        text={"Are you sure you want to cancel this import?"}
        open={warningOpen}
        handleOk={handleWarningOk}
        handleCancel={() => setWarningOpen(false)}
      />
    </div>
  );
};

export default HistoryTab;
