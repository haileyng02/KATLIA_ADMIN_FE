import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Tabs } from "antd";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";
import HistoryTab from "../components/HistoryTab";
import ImportTab from "../components/ImportTab";

const Import = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [currTab, setCurrTab] = useState(0);

  //Import info
  // const importInfo = async () => {
  //   try {
  //     const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzQ2ZTgzMDIwNjE5M2M4N2RlMWFjMzIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY3MjE4ODk2Mn0.DhhxF4AI3qmM0yhEPjidNICcust1GAaZ54YyDc4Q3XQ";
  //     const result = await appApi.get(
  //       routes.IMPORT_INFO("6398ae78ad95dbd875c75c5d"),
  //       {
  //         ...routes.getAccessTokenHeader(token),
  //         ...routes.getImportInfo("6398ae78ad95dbd875c75c5d")
  //       }
  //     );
  //     console.log(result.data);

  //   } catch (err) {
  //     if (err.response) {
  //       console.log(err.response.data)
  //       console.log(err.response.status)
  //       console.log(err.response.headers)
  //     } else {
  //       console.log(err.message)
  //     }
  //   }
  // }

  //get staff import history
  const getStaffImportHistory = async () => {
    setLoading(true);
    try {
      const token = currentUser.token;
      const result = await appApi.get(
        routes.STAFF_IMPORT_HISTORY,
        routes.getAccessTokenHeader(token)
      );
      console.log(result.data);
      setData(
        result.data.map((d, i) => {
          return { ...d, key: i };
        })
      );
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

  const tabItems = [
    {
      label: "History",
      key: 0,
      children: (
        <HistoryTab
          data={data}
          loading={loading}
          setLoading={setLoading}
          getStaffImportHistory={getStaffImportHistory}
        />
      ),
    },
    {
      label: "Import",
      key: 1,
      children: (
        <ImportTab
          getStaffImportHistory={getStaffImportHistory}
          setCurrTab={setCurrTab}
        />
      ),
    },
  ];

  return (
    <div>
      <div className="row">
        <h1 className="title">Import</h1>
        {/* <p className="subtitle">{1 +' Imports found'}</p> */}
      </div>
      <Tabs
        type="card"
        items={tabItems}
        tabPosition="top"
        onChange={setCurrTab}
        activeKey={currTab}
      />
    </div>
  );
};

export default Import;
