import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Table } from "antd";
import appApi from "../../api/appApi";
import * as routes from "../../api/apiRoutes";

const columns = [
  {
    title: "Product ID",
    dataIndex: "productId",
    sorter: (a, b) => a.productId - b.productId,
    defaultSortOrder: "descend",
    render: (value) => <p className="table-cell">{"#" + value}</p>,
  },
  {
    title: "Product's Name",
    dataIndex: "name",
    sorter: (a, b) => a.name?.localeCompare(b.name),
    defaultSortOrder: "descend",
    render: (value) => <p className="table-cell">{value}</p>,
  },
  {
    title: "Color",
    dataIndex: "color",
    align: "center",
    sorter: (a, b) => a.color?.localeCompare(b.color),
    defaultSortOrder: "descend",
    render: (value) => (
      <center>
        <p className="table-cell uppercase text-center">{value}</p>
      </center>
    ),
  },
  {
    title: "Size",
    dataIndex: "size",
    align: "center",
    sorter: (a, b) => a.size?.localeCompare(b.size),
    defaultSortOrder: "descend",
    render: (value) => (
      <center>
        <p className="table-cell uppercase text-center">{value}</p>
      </center>
    ),
  },
  {
    title: "Unit price",
    dataIndex: "unitPrice",
    align: "center",
    sorter: (a, b) => a.unitPrice - b.unitPrice,
    defaultSortOrder: "descend",
    render: (value) => (
      <center>
        <p className="table-cell">{"$" + value}</p>
      </center>
    ),
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    align: "center",
    sorter: (a, b) => a.quantity - b.quantity,
    defaultSortOrder: "descend",
    render: (value) => (
      <center>
        <p className="table-cell">{value}</p>
      </center>
    ),
  },
  {
    title: "Total",
    align: "center",
    defaultSortOrder: "descend",
    render: (value) => (
      <center>
        <p className="table-cell">
          {"$" + (value?.quantity * value?.unitPrice).toFixed(2)}
        </p>
      </center>
    ),
  },
];

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
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      className="mt-5 pagination-active table-header"
    />
  );
};

export default ImportDetailTable;
