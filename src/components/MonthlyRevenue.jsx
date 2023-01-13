import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { Spin, DatePicker, ConfigProvider } from "antd";
import dayjs from "dayjs";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";

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
        return val + " $";
      },
    },
  },
};

const MonthlyRevenue = ({ currentUser }) => {
  const [revenue, setRevenue] = useState(0);
  const [loading,setLoading] = useState(true);

  const series = [
    {
      name: "Monthly Revenue",
      data: revenue,
    },
  ];

  //Revenue per month
  const revenuePerMonth = async (year) => {
    setLoading(true);
    try {
      const token = currentUser.token;
      const result = await appApi.get(routes.REVENUE_PER_MONTH(year), {
        ...routes.getAccessTokenHeader(token),
        ...routes.getRevenuePerMonthBody(year),
      });
      setRevenue(result.data);
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

  const handleChangeYear = (value) => {
    revenuePerMonth(dayjs(value).year());  
  }

  useEffect(()=>{
    if (currentUser) revenuePerMonth(dayjs().year());
  },[currentUser])

  return (
    <div className="chart-card drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] mt-5">
      <div className="between-row pl-5 pr-6">
        <h2 className="chart-title">Monthly Revenue</h2>
        <DatePicker picker="year" defaultValue={dayjs()} onChange={handleChangeYear}/>
      </div>
      <ConfigProvider theme={{ token: { colorPrimary: "#3E4259" } }}>
        <Spin spinning={loading}>
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={350}
          />
        </Spin>
      </ConfigProvider>
    </div>
  );
};

export default MonthlyRevenue;