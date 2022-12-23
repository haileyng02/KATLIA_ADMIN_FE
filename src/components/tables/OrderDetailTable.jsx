import React, { useEffect, useState } from "react";
import { Table } from "antd";
import appApi from "../../api/appApi";
import * as routes from "../../api/apiRoutes";

const columns = [
  {
    title: "Product ID",
    dataIndex: "productId",
    sorter: (a, b) => a.id?.localeCompare(b.id),
    defaultSortOrder: "descend",
    render: (value) => <p className="table-cell">{"#" + value}</p>,
  },
  {
    title: "Product's Name",
    dataIndex: "productName",
    sorter: (a, b) => a.productName?.localeCompare(b.productName),
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
    dataIndex: "quatity",
    align: "center",
    sorter: (a, b) => a.quatity - b.quatity,
    defaultSortOrder: "descend",
    render: (value) => (
      <center>
        <p className="table-cell">{value}</p>
      </center>
    ),
  },
  {
    title: "Total",
    dataIndex: "total",
    align: "center",
    sorter: (a, b) => a.total - b.total,
    defaultSortOrder: "descend",
    render: (value) => (
      <center>
        <p className="table-cell">{"$" + value}</p>
      </center>
    ),
  },
];

const OrderDetailTable = ({ currentUser, id }) => {
  const [data,setData] = useState();
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    if (id) getDetailOrder(id);
  }, [id]);

  //Get detail order
  const getDetailOrder = async () => {
    setLoading(true)
    try {
      const token = currentUser.token;
      const result = await appApi.get(routes.GET_DETAIL_ORDER(id), {
        ...routes.getAccessTokenHeader(token),
        ...routes.getDetailOrderBody(id),
      });
      console.log(result.data)
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
    setLoading(false)
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

export default OrderDetailTable;
