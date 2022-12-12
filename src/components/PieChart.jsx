import React from "react";
import ReactApexChart from "react-apexcharts";
import ChartLegend from "./ChartLegend";

const series = [70, 30];
const options = {
  chart: {
    type: "donut",
    width: "100%",
  },
  colors: ["#5A6ACF", "#F9AF5E91"],
  labels: ["Revenue", "Expenditure"],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 0,
  },
  legend: {
    show: false,
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return val + "%";
      },
    },
  },
};

const PieChart = () => {
  return (
    <div className="chart-card basis-[34%] flex flex-col">
      <h2 className="chart-title">Revenue and Expenditure Ratio</h2>
      <div className="flex-1 flex flex-col justify-center">
        <ReactApexChart
          height={250}
          options={options}
          series={series}
          type="donut"
        />
        <div className="flex justify-around mt-[35px]">
          <ChartLegend name={"Revenue"} value={70} color="bg-[#5A6ACF]" />
          <ChartLegend name={"Expenditure"} value={30} color="bg-[#F9AF5E91]" />
        </div>
      </div>
    </div>
  );
};

export default PieChart;
