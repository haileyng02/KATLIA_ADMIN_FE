import React from "react";
import MonthlyRevenue from "../components/MonthlyRevenue";
import OrdersAmount from "../components/OrdersAmount";
import PieChart from "../components/PieChart";
import StatisticCard from "../components/StatisticCard";

const data = {
  newCustomers: 3123,
  newOrders: 4897,
};

const Statistic = () => {
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
