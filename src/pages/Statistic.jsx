import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import MonthlyRevenue from "../components/MonthlyRevenue";
import OrdersAmount from "../components/OrdersAmount";
import PieChart from "../components/PieChart";
import StatisticCard from "../components/StatisticCard";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";

const data = {
  newCustomers: 3123,
  newOrders: 4897,
};

const Statistic = () => {
  const { currentUser } = useSelector((state) => state.user);

  //Get statistic user
  const getStatisticUser = async () => {
    try {
      const token = currentUser.token;
      const result = await appApi.get(
        routes.GET_STATISTIC_USER,
        routes.getAccessTokenHeader(token)
      );
      console.log(result);

    } catch (err) {
      if (err.response) {
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
      } else {
        console.log(err.message)
      }
    }
  }

  useEffect(() => {
    if (currentUser) getStatisticUser();
  }, [currentUser]);

  //New order of month
  const newOrderOfMonth = async () => {
    try {
      const token = currentUser.token;
      const result = await appApi.get(
        routes.NEW_ORDER_OF_MONTH,
        routes.getAccessTokenHeader(token)
      );
      console.log(result);

    } catch (err) {
      if (err.response) {
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
      } else {
        console.log(err.message)
      }
    }
  }

  useEffect(() => {
    if (currentUser) newOrderOfMonth();
  }, [currentUser]);

  //Order percent growth
  const orderPercentGrowth = async () => {
    try {
      const token = currentUser.token;
      const result = await appApi.get(
        routes.ORDER_PERCENT_GROWTH,
        routes.getAccessTokenHeader(token)
      );
      console.log(result);

    } catch (err) {
      if (err.response) {
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
      } else {
        console.log(err.message)
      }
    }
  }

  useEffect(() => {
    if (currentUser) orderPercentGrowth();
  }, [currentUser]);

  //Revenue of month
  const revenueOfMonth = async () => {
    try {
      const token = currentUser.token;
      const result = await appApi.get(
        routes.REVENUE_OF_MONTH,
        routes.getAccessTokenHeader(token)
      );
      console.log(result);

    } catch (err) {
      if (err.response) {
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
      } else {
        console.log(err.message)
      }
    }
  }

  useEffect(() => {
    if (currentUser) revenueOfMonth();
  }, [currentUser]);

  return (
    <div>
      <div className="row">
        <h1 className="title">Statistic</h1>
        <p className="subtitle">Overview</p>
      </div>
      <div className="between-row mt-[30px] gap-x-[3.5%]">
        <StatisticCard
          title={"NEW CUSTOMERS"}
          value={data.newCustomers
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        />
        <StatisticCard
          title={"NEW ORDERS"}
          value={data.newOrders
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          percent={-2.8}
        />
        <StatisticCard title={"GROWTH"} value={89.87 + "%"} percent={2.8} />
      </div>
      <MonthlyRevenue />
      <div className="mt-5 flex justify-between">
        <OrdersAmount />
        <PieChart />
      </div>
    </div>
  );
};

export default Statistic;
