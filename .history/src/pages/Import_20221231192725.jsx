import React, { useEffect } from "react";
import { useSelector } from "react-redux";
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
  const { currentUser } = useSelector((state) => state.user);

  //get staff import history
  const getStaffImportHistory = async () => {
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzQ2ZTgzMDIwNjE5M2M4N2RlMWFjMzIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY3MjE4ODk2Mn0.DhhxF4AI3qmM0yhEPjidNICcust1GAaZ54YyDc4Q3XQ";
      const result = await appApi.get(
        routes.STAFF_IMPORT_HISTORY,
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
  const importInfo = async () => {
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzQ2ZTgzMDIwNjE5M2M4N2RlMWFjMzIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY3MjE4ODk2Mn0.DhhxF4AI3qmM0yhEPjidNICcust1GAaZ54YyDc4Q3XQ";
      const result = await appApi.get(
        routes.IMPORT_INFO("6398ae78ad95dbd875c75c5d"),
        {
          ...routes.getAccessTokenHeader(token),
          ...routes.getImportInfo("6398ae78ad95dbd875c75c5d")
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

  //Staff import detail 
  const staffImportDetail = async () => {
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzQ2ZTgzMDIwNjE5M2M4N2RlMWFjMzIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY3MjE4ODk2Mn0.DhhxF4AI3qmM0yhEPjidNICcust1GAaZ54YyDc4Q3XQ";
      const result = await appApi.get(
        routes.STAFF_IMPORT_DETAIL("6398ae78ad95dbd875c75c5d"),
        {
          ...routes.getAccessTokenHeader(token),
          ...routes.getStaffImportDetail("6398ae78ad95dbd875c75c5d")
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

  //Get import form info
  const getImportFormInfo = async () => {
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzQ2ZTgzMDIwNjE5M2M4N2RlMWFjMzIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY3MjE4ODk2Mn0.DhhxF4AI3qmM0yhEPjidNICcust1GAaZ54YyDc4Q3XQ";
      const result = await appApi.get(
        routes.IMPORT_FORM_INFO,
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

  //Product size for import
  const getProductSizeForImport = async () => {
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzQ2ZTgzMDIwNjE5M2M4N2RlMWFjMzIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY3MjE4ODk2Mn0.DhhxF4AI3qmM0yhEPjidNICcust1GAaZ54YyDc4Q3XQ";
      const result = await appApi.get(
        routes.PRODUCT_SIZE_FOR_IMPORT(694573),
        {
          ...routes.getAccessTokenHeader(token),
          ...routes.getProductSizeForImportIdParams(694573)
        }
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

  //Product color for import
  const getProductColorForImport = async () => {
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzQ2ZTgzMDIwNjE5M2M4N2RlMWFjMzIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY3MjE4ODk2Mn0.DhhxF4AI3qmM0yhEPjidNICcust1GAaZ54YyDc4Q3XQ";
      const result = await appApi.get(
        routes.PRODUCT_COLOR_FOR_IMPORT(),
        {
          ...routes.getAccessTokenHeader(token),
          ...routes.getProductColorForImportIdParams()
        }
      );
      console.log(result.data)

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

  //Get items in existing form
  const getItemsInExistingForm = async () => {
    try
  }
  
  return (
    <div>
      <div className="row">
        <h1 onClick={getProductColorForImport} className="title">Import</h1>
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
