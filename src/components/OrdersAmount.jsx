import React from "react";
import ReactApexChart from "react-apexcharts";
import { Spin } from "antd";

const options = {
  chart: {
    type: "bar",
    height: 350,
    toolbar: {
      show: false,
    },
  },
  colors: ["#694BDB"],
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "72%",
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    labels: {
      style: {
        fontSize: "15px",
        fontWeight: 300,
        colors: "#000000",
      },
    },
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  },
  yaxis: {
    labels: {
      style: {
        fontSize: "13px",
        fontWeight: 400,
        colors: "#3E4259",
      },
      formatter: function (value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      },
    },
  },
  fill: {
    opacity: 1,
  },
};

const OrdersAmount = ({data}) => {
  const series = [
    {
      name: "Amount of Orders",
      data: data,
    },
  ];
  return (
    <div className="chart-card basis-[64%]">
      <h2 className="chart-title">Amount of Orders</h2>
      <Spin spinning={!data}>
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={350}
        />
      </Spin>
    </div>
  );
};

export default OrdersAmount;
