import React, { useState } from "react";
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
          <h1 className="text-30 font-inter font-bold">Order</h1>
          <p className="ml-[15px]">15 Orders found</p>
        </div>
        {/* <Input
          width="190px"
          type="date"
          css={{
            $$inputColor: "rgba(249, 175, 94, 0.57)",
            $$inputTextColor: "#9098B1",
          }}
          className=" font-inter font-bold"
        /> */}
      </div>
      <div className="flex justify-between mt-[37px]">
        <div className="flex">
          {/* {buttons.map((b, i) => (
            <Button
              key={i}
              className="bg-white font-inter font-semibold"
              css={{
                color: "rgba(0, 0, 0, 0.5)",
                width: 85,
                height: 36,
                minWidth: 0,
                fontSize: 15,
                $$buttonBorderRadius: "5px",
              }}
            >
              {b}
            </Button>
          ))} */}
        </div>
        {/* <Button
          bordered
          color={"warning"}
          borderWeight={"light"}
          className="bg-white font-inter font-semibold"
          css={{
            borderColor: "Black",
            color: "Black",
            $$buttonHeight: 40,
            minWidth: 100,
            $$buttonBorderRadius: "5px",
          }}
        >
          Clear Filter
        </Button> */}
      </div>
    </div>
  );
};

export default Orders;
