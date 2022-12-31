import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { Spin, DatePicker, ConfigProvider } from "antd";
import dayjs from "dayjs";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";

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

const OrdersAmount = ({ currentUser }) => {
  const [orders, setOrders] = useState(0);
  const [loading,setLoading] = useState(true);

  const series = [
    {
      name: "Amount of Orders",
      data: orders,
    },
  ];

  //Order per month
  const orderPerMonth = async (year) => {
    setLoading(true);
    try {
      const token = currentUser.token;
      const result = await appApi.get(routes.ORDER_PER_MONTH(year), {
        ...routes.getAccessTokenHeader(token),
        ...routes.getOrderPerMonthBody(year),
      });
      setOrders(result.data);
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
    orderPerMonth(dayjs(value).year());  
  }

  useEffect(()=>{
    if (currentUser) orderPerMonth(dayjs().year());
  },[currentUser])

  return (
    <div className="chart-card basis-[64%]">
      <div className="between-row pl-5 pr-6">
        <h2 className="chart-title">Amount of Orders</h2>
        <DatePicker picker="year" defaultValue={dayjs()} onChange={handleChangeYear}/>
      </div>
      <ConfigProvider theme={{ token: { colorPrimary: "#694BDB" } }}>
        <Spin spinning={loading}>
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={350}
          />
        </Spin>
      </ConfigProvider>
    </div>
  );
};

export default OrdersAmount;
