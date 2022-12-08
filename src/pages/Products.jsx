import React from "react";
import { Table } from "antd";
import {viewIcon,editIcon,deleteIcon} from '../images/actions'

const data = [
  {
    key: "1",
    productId: "19877",
    name: "Basic Knit Sweater",
    image: "https://s3-alpha-sig.figma.com/img/bd5e/94a8/5ce7adfdafce1bee36e5ae048c0b36b8?Expires=1671408000&Signature=X8i89IKhc59WmXTncIjfMMbQlXzfirolLvSdMi7L4rkvCSTO5AJ2DwSUY7DDydN7Uwf0BT3Diwko2FTr2r~6H5D-LuWcTZrP0~MAXn65hhWKvku~5bx5-lndacuN1RdiE~4pypGnXTogfKttG-PKpKss~eczwsmNtZfRtRlrf6ujkzD5hxtn4JJnIp7xA8LgJGpFF6g9z8CKGX~hEHgtBAXUOyatfgRhQ5WgvghmsUIvys1oTexYr8Yy1fG1i5SidLUX3hUy4Vj-pdQyG6ukKpxNdjqPHDJraRGdsvE2Qe4XaSav~~6hIrofdBrYHE3snV1n-zPNCAHV7lvnDYi-Ag__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
    category: "Sweater",
    price: "28.58"
  },
];


const Products = () => {
  const columns = [
    {
      title: "Product ID",
      dataIndex: "productId",
      sorter: (a, b) => a.productId.localeCompare(b.productId),
      defaultSortOrder: 'descend',
      render: (value) => <p className="table-cell">{"#" + value}</p>,
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      defaultSortOrder: 'descend',
      render: (value) => <p className="table-cell">{value}</p>,
    },
    {
      title: "Image",
      dataIndex: "image",
      align: "center",
      render: (value) => <center><img src={value} alt='Product' className="w-[47px] h-[53px] object-cover object-center"/></center>,
    },
    {
      title: "Category",
      dataIndex: "category",
      sorter: (a, b) => a.category.localeCompare(b.category),
      defaultSortOrder: 'descend',
      render: (value) => <p className="table-cell">{value}</p>,
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price.localeCompare(b.price),
      defaultSortOrder: 'descend',
      render: (value) => <p className="table-cell">{"$" + value}</p>,
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_) => (
        <div className="flex gap-x-[11px] justify-center">
          <button
            className="action-button"
            style={{ backgroundColor: "rgba(67, 204, 248, 0.9)" }}
          >
            <center>
              <img src={viewIcon} alt="View" />
            </center>
          </button>
          <button
            className="action-button"
            style={{ backgroundColor: "rgba(249, 175, 94, 0.9)" }}
          >
            <center>
              <img src={editIcon} alt="Edit" />
            </center>
          </button>
          <button
            className="action-button"
            style={{ backgroundColor: "rgba(253, 56, 56, 0.9)" }}
          >
            <center>
              <img src={deleteIcon} alt="Cancel" />
            </center>
          </button>
        </div>
      ),
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    // console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <div>
      <div className="row">
        <h1 className="title">Product</h1>
        <p className="subtitle">1 Product found</p>
      </div>
      <div className="mt-[15px] row justify-end gap-x-[10px]">
        <button className="button">Add Item</button>
        <button className="clear-button">
          <p>Clear Filter</p>
        </button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        className="mt-5 pagination-active table-header"
      />
    </div>
  );
};

export default Products;
