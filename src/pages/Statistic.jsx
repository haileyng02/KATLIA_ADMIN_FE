import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MonthlyRevenue from "../components/MonthlyRevenue";
import OrdersAmount from "../components/OrdersAmount";
import PieChart from "../components/PieChart";
import StatisticCard from "../components/StatisticCard";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";

const Statistic = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [newCustomers, setNewCustomers] = useState(0);
  const [newOrders, setNewOrders] = useState(0);
  const [orderPercent, setOrderPercent] = useState(0);
  const [growth, setGrowth] = useState(0);
  const [growthPercent, setGrowthPercent] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [orders, setOrders] = useState(0);
  const [expenditure, setExpenditure] = useState(0);

  //Get statistic user
  const getStatisticUser = async () => {
    try {
      const token = currentUser.token;
      const result = await appApi.get(
        routes.GET_STATISTIC_USER,
        routes.getAccessTokenHeader(token)
      );
      setNewCustomers(result.data);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(err.message);
      }
    }
  };

  //New order of month
  const newOrderOfMonth = async () => {
    try {
      const token = currentUser.token;
      const result = await appApi.get(
        routes.NEW_ORDER_OF_MONTH,
        routes.getAccessTokenHeader(token)
      );
      setNewOrders(result.data);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(err.message);
      }
    }
  };

  //Order percent growth
  const orderPercentGrowth = async () => {
    try {
      const token = currentUser.token;
      const result = await appApi.get(
        routes.ORDER_PERCENT_GROWTH,
        routes.getAccessTokenHeader(token)
      );
      setOrderPercent(result.data);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(err.message);
      }
    }
  };

  //Revenue of month
  const revenueOfMonth = async () => {
    try {
      const token = currentUser.token;
      const result = await appApi.get(
        routes.REVENUE_OF_MONTH,
        routes.getAccessTokenHeader(token)
      );
      setGrowth(result.data);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(err.message);
      }
    }
  };

  //Revenue percent growth
  const revenuePercentGrowth = async () => {
    try {
      const token = currentUser.token;
      const result = await appApi.get(
        routes.REVENUE_PERCENT_GROWTH,
        routes.getAccessTokenHeader(token)
      );
      setGrowthPercent(result.data);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(err.message);
      }
    }
  };

  //Order per month
  const orderPerMonth = async () => {
    try {
      const token = currentUser.token;
      const result = await appApi.get(routes.ORDER_PER_MONTH("2022"), {
        ...routes.getAccessTokenHeader(token),
        ...routes.getOrderPerMonthBody("2022"),
      });
      setOrders(result.data)
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(err.message);
      }
    }
  };

  //Revenue per month
  const revenuePerMonth = async () => {
    try {
      const token = currentUser.token;
      const result = await appApi.get(routes.REVENUE_PER_MONTH("2022"), {
        ...routes.getAccessTokenHeader(token),
        ...routes.getRevenuePerMonthBody("2022"),
      });
      setRevenue(result.data)
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(err.message);
      }
    }
  };

  //Expenditure of month
  const expenditureOfMonth = async () => {
    try {
      const token = currentUser.token;
      const result = await appApi.get(
        routes.EXPENDITURE_OF_MONTH,
        routes.getAccessTokenHeader(token)
      );
      setExpenditure(result.data)
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(err.message);
      }
    }
  };

  useEffect(() => {
    if (currentUser) {
      getStatisticUser();
      newOrderOfMonth();
      orderPercentGrowth();
      revenueOfMonth();
      revenuePercentGrowth();
      orderPerMonth();
      revenuePerMonth();
      expenditureOfMonth();
    }
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
          value={newCustomers?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        />
        <StatisticCard
          title={"NEW ORDERS"}
          value={newOrders?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          percent={orderPercent}
        />
        <StatisticCard
          title={"GROWTH"}
          value={"$"+growth}
          percent={growthPercent.toFixed(1)}
        />
      </div>
      <MonthlyRevenue data={revenue}/>
      <div className="mt-5 flex justify-between">
        <OrdersAmount data={orders}/>
        <PieChart expenditure={expenditure}/>
      </div>
    </div>
  );
};

export default Statistic;
