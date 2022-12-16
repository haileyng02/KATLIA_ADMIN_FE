import React, { useState } from "react";
import { Form,Table, Tooltip } from "antd";
import { viewIcon, editIcon, deleteIcon } from "../images/actions";
import AddDiscountModal from "../modals/promotion/AddDiscountModal";

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
  const [addOpen, setAddOpen] = useState(false);
  const [currItem, setCurrItem] = useState(null);

  const handleAdd = () => {
    setCurrItem(null);
    setAddOpen(true);
  };
  
  const handleEdit = (value) => {
    setCurrItem(value);
    setAddOpen(true);
  };
  
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
      render: (value) => (
        <div className="flex gap-x-[20px] justify-center">
          <button
            className="action-button"
            style={{ backgroundColor: "rgba(67, 204, 248, 0.9)" }}
          >
            <center>
              <img src={viewIcon} alt="View" />
            </center>
          </button>
          <Tooltip title="Edit discount">
            <button
              className="action-button"
              style={{ backgroundColor: "rgba(249, 175, 94, 0.9)" }}
              onClick={() => handleEdit(value)}
            >
              <center>
                <img src={editIcon} alt="Edit" />
              </center>
            </button>
          </Tooltip>
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
        s
        className="mt-5 pagination-active table-header"
      />
      <AddDiscountModal
        open={addOpen}
        handleCancel={()=>setAddOpen(false)}
        currentItem={currItem}
      />
    </div>
  );
};

export default Promotion;
