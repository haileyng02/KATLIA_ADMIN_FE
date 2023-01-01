import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Tooltip } from "antd";
import { useSnackbar } from "notistack";
import { viewIcon, editIcon, deleteIcon } from "../images/actions";
import AddDiscountModal from "../modals/promotion/AddDiscountModal";
import DiscountProductsModal from "../modals/promotion/DiscountProductsModal";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";
import dayjs from "dayjs";

const Promotion = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { enqueueSnackbar } = useSnackbar();
  const [addOpen, setAddOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [currItem, setCurrItem] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState([]);

  const handleAdd = () => {
    setCurrItem(null);
    setAddOpen(true);
  };

  const handleEdit = (value) => {
    setCurrItem(value);
    setAddOpen(true);
  };

  const handleView = (value) => {
    setCurrItem(value);
    setViewOpen(true);
  };

  const columns = [
    {
      title: "Discount ID",
      dataIndex: "id",
      sorter: (a, b) => a.id?.localeCompare(b.id),
      defaultSortOrder: "descend",
      render: (value) => <p className="table-cell">{value}</p>,
    },
    {
      title: "Discount Name",
      dataIndex: "discountName",
      sorter: (a, b) => a.discountName?.localeCompare(b.discountName),
      defaultSortOrder: "descend",
      render: (value) => <p className="table-cell">{value}</p>,
    },
    {
      title: "Percent",
      dataIndex: "percent",
      sorter: (a, b) => a.percent - b.percent,
      defaultSortOrder: "descend",
      render: (value) => <p className="table-cell">{value + "%"}</p>,
    },
    {
      title: "Start At",
      dataIndex: "startAt",
      sorter: (a, b) => a.startAt?.localeCompare(b.startAt),
      defaultSortOrder: "descend",
      render: (value) => (
        <p className="table-cell">{dayjs(value).format("HH:mm DD-MM-YYYY")}</p>
      ),
    },
    {
      title: "End At",
      dataIndex: "endAt",
      sorter: (a, b) => a.endAt?.localeCompare(b.endAt),
      defaultSortOrder: "descend",
      render: (value) => (
        <p className="table-cell">{dayjs(value).format("HH:mm DD-MM-YYYY")}</p>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (value) => (
        <div className="flex gap-x-[20px] justify-center">
          <Tooltip title="List products for discount">
            <button
              className="action-button"
              style={{ backgroundColor: "rgba(67, 204, 248, 0.9)" }}
              onClick={() => handleView(value)}
            >
              <center>
                <img src={viewIcon} alt="View" />
              </center>
            </button>
          </Tooltip>
          <Tooltip title={value.message !== "Can't edit" && "Edit discount"}>
            <button
              className={`action-button ${
                value.message === "Can't edit" && "cursor-not-allowed"
              }`}
              style={{
                backgroundColor:
                  value.message !== "Can't edit"
                    ? "rgba(249, 175, 94, 0.9)"
                    : "#CDCDCD",
              }}
              onClick={
                value.message !== "Can't edit" ? () => handleEdit(value) : null
              }
            >
              <center>
                <img src={editIcon} alt="Edit" />
              </center>
            </button>
          </Tooltip>
          <Tooltip title={value.message !== "Can't edit" && "Delete discount"}>
            <button
              className={`action-button ${
                value.message === "Can't edit" && "cursor-not-allowed"
              }`}
              style={{
                backgroundColor:
                  value.message !== "Can't edit"
                    ? "rgba(253, 56, 56, 0.9)"
                    : "#CDCDCD",
              }}
              onClick={
                value.message !== "Can't edit"
                  ? () => deleteDiscount(value.id)
                  : null
              }
            >
              <center>
                <img src={deleteIcon} alt="Delte" />
              </center>
            </button>
          </Tooltip>
        </div>
      ),
    },
  ];

  //Get all discount list
  const getAllDiscountList = async () => {
    setLoading(true);
    try {
      const token = currentUser.token;
      const result = await appApi.get(
        routes.GET_ALL_DISCOUNT_LIST,
        routes.getAccessTokenHeader(token)
      );
      setData(result.data.map((d, i) => {
        return { ...d, key: i };
      }));
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
    if (currentUser) getAllDiscountList();
  }, [currentUser]);

  //Delete discount
  const deleteDiscount = async (id) => {
    setLoading(true);
    try {
      const token = currentUser.token;
      const result = await appApi.delete(routes.DELETE_DISCOUNT(id), {
        ...routes.getAccessTokenHeader(token),
        ...routes.getDeleteDiscountIdParams(id),
      });
      enqueueSnackbar("Discount deleted!", { variant: "success" });
      getAllDiscountList();
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

  return (
    <div>
      <div className="row">
        <h1 className="title">Promotion</h1>
        <p className="subtitle">{data.length + " Promotions found"}</p>
      </div>
      <div className="mt-[12px] flex justify-end gap-x-[10px]">
        <button
          onClick={handleAdd}
          className="px-[17px] py-[11px] rounded-5 bg-primary text-[#9098B1] font-bold text-14"
        >
          Add Discount
        </button>
        <button className="clear-button">
          <p>Clear Filter</p>
        </button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        className="mt-5 pagination-active table-header"
        loading={loading}
      />
      <AddDiscountModal
        open={addOpen}
        handleCancel={() => setAddOpen(false)}
        currentItem={currItem}
        currentUser={currentUser}
        getAllDiscountList={getAllDiscountList}
      />
      <DiscountProductsModal
        open={viewOpen}
        handleCancel={() => setViewOpen(false)}
        id={currItem?.id}
        currentUser={currentUser}
        getAllDiscountList={getAllDiscountList}
      />
    </div>
  );
};

export default Promotion;
