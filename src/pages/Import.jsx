import React from "react";
import { Tabs } from "antd";
import HistoryTab from "../components/HistoryTab";
import ImportTab from "../components/ImportTab";

const tabItems = [
  {
    label: "History",
    key: 0,
    children: <HistoryTab />,
  },
  {
    label: "Import",
    key: 1,
    children: <ImportTab />,
  },
];

const Import = () => {
  return (
    <div>
      <div className="row">
        <h1 className="title">Import</h1>
        <p className="subtitle">1 Import found</p>
      </div>
      <Tabs
        type="card"
        items={tabItems}
        tabPosition="top"
        className=""
      />
    </div>
  );
};

export default Import;
