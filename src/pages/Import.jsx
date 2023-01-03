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
        className=""
      />
    </div>
  );
};

export default Import;
