import React from "react";
import ReactApexChart from "react-apexcharts";
import { Spin } from "antd";

const options = {
  chart: {
    width: "100%",
    height: 350,
    type: "area",
    toolbar: {
      show: false,
    },
  },

  colors: ["#4169E1"],

  dataLabels: {
    enabled: false,
  },

  stroke: {
    curve: "smooth",
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

  xaxis: {
    labels: {
      style: {
        fontSize: "15px",
        fontWeight: 500,
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
  tooltip: {
    y: {
      formatter: function (val) {
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' $';
      },
    },
  },
};

const MonthlyRevenue = ({data}) => {
  const series = [
    {
      name: "Monthly Revenue",
      data: data
    },
  ];
  return (
    <div className="chart-card drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] mt-5">
      <h2 className="chart-title">
        Monthly Revenue
      </h2>
      <Spin spinning={!data}>
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={350}
        />
      </Spin>
    </div>
  );
};

export default MonthlyRevenue;
