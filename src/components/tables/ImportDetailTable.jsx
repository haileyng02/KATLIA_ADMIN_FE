import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import appApi from "../../api/appApi";
import * as routes from "../../api/apiRoutes";
import ImportTable from "./ImportTable";

const ImportDetailTable = ({ currItem,open }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser && currItem?.id && open) {
      staffImportDetail();
    }
  }, [currentUser, currItem]);

  //Staff import detail
  const staffImportDetail = async () => {
    setLoading(true);
    try {
      const token = currentUser.token;
      const result = await appApi.get(routes.STAFF_IMPORT_DETAIL(currItem.id), {
        ...routes.getAccessTokenHeader(token),
        ...routes.getStaffImportDetail(currItem.id),
      });
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

  return (
    <ImportTable data={data} loading={loading} hideAction/>
  );
};

export default ImportDetailTable;
