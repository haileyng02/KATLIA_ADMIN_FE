import React from "react";
import { Tabs } from "antd";
import HistoryTab from "../components/HistoryTab";
import ImportTab from "../components/ImportTab";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";

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

  //Confirm import
  const confirmImport = async () => {
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzQ2ZTgzMDIwNjE5M2M4N2RlMWFjMzIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY3MjE4ODk2Mn0.DhhxF4AI3qmM0yhEPjidNICcust1GAaZ54YyDc4Q3XQ";
      const result = await appApi.put(
        routes.CONFIRM_IMPORT("63b0302c3f65532e38aec9e5"),
        null,
        {
          ...routes.getAccessTokenHeader(token),
          ...routes.getConfirmImportIdParams("63b0302c3f65532e38aec9e5")
        }
      );
      console.log(result.data);

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

  //Staff-import/ import
  const patchStaffImport = async () => {
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzQ2ZTgzMDIwNjE5M2M4N2RlMWFjMzIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY3MjE4ODk2Mn0.DhhxF4AI3qmM0yhEPjidNICcust1GAaZ54YyDc4Q3XQ";
      const result = await appApi.patch(
        routes.STAFF_IMPORT, 
        routes.getStaffImportBody(0.25),
        routes.getAccessTokenHeader(token)
      );
      console.log(result.data);

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

  //Delete all items
  const deleteAllItems = async () => {
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzQ2ZTgzMDIwNjE5M2M4N2RlMWFjMzIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY3MjE4ODk2Mn0.DhhxF4AI3qmM0yhEPjidNICcust1GAaZ54YyDc4Q3XQ";
      const result = await appApi.delete(
        routes.DELETE_ALL_ITEMS,
        routes.getAccessTokenHeader(token)
      );
      console.log(result.data);

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
