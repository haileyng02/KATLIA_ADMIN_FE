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
    dataIndex: "price",
    align: "center",
    sorter: (a, b) => a.price - b.price,
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

  useEffect(() => {
    if (id) getDetailOrder(id);
  }, [id]);

  //Get detail order
  const getDetailOrder = async () => {
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
  };
  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={!data}
      className="mt-5 pagination-active table-header"
    />
  );
};

export default OrderDetailTable;
