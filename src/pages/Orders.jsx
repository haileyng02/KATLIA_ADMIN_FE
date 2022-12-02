import React, { useState } from "react";
import { DatePicker, Button } from "antd";
import dropIcon from "../images/dropdown.svg";
import calendarIcon from "../images/calendar.svg";

const buttons = ["All Order", "Completed", "Pading", "Cancel"];
const columns = [
  {
    key: "id",
    name: "Order ID",
    sort: true,
  },
  {
    key: "name",
    name: "Customer's Name",
    sort: true,
  },
  {
    key: "address",
    name: "Address",
    sort: true,
  },
  {
    key: "date",
    name: "Date",
    sort: true,
  },
  {
    key: "total",
    name: "Total",
    sort: true,
  },
  {
    key: "status",
    name: "Status",
    sort: true,
  },
  {
    key: "action",
    name: "Action",
    sort: false,
  },
];

const Orders = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center ml-[23px]">
          <h1 className="text-30 font-inter font-bold mb-0">Order</h1>
          <p className="ml-[15px] mb-0">15 Orders found</p>
        </div>
        <DatePicker className="bg-primary font-bold " />
      </div>
      <div className="flex justify-between mt-[37px]">
        <div className="flex">
          {buttons.map((b, i) => (
            <button
              key={i}
              className="bg-white w-[85px] h-[36px] rounded-5"
              style={{ color: "rgba(0, 0, 0, 0.5)" }}
            >
              <p className="font-inter font-semibold text-15 mb-0 hover:text-secondary">{b}</p>
            </button>
          ))}
        </div>
        <button
          className="bg-white  h-[40px] px-[13px] rounded-5 border-1 border-black" danger color="rgba(249, 175, 94, 0.9)"
        >
          <p className="mb-0 text-14 font-semibold">Clear Filter</p>
        </button>
      </div>
    </div>
  );
};

export default Orders;
