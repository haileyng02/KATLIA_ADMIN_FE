import React, { useState } from "react";
import { Table, Tooltip } from "antd";
import { viewIcon, editIcon, deleteIcon } from "../images/actions";
import ProductDetailModal from "../modals/product/ProductDetailModal";
import ModifyProductModal from "../modals/product/ModifyProductModal";

const data = [
  {
    key: "1",
    productId: "19877",
    name: "Basic Knit Sweater",
    colors: [
      {
        name: 'Black',
        hex:'#000000',
        images: [
          "https://s3-alpha-sig.figma.com/img/9dc6/0187/73e519eac52bc99a49165c3c81ea8f3d?Expires=1672012800&Signature=RwRmvmwg78wbBG98I~Gz7v46bofzo8vGa~f-9v6nNRh1YdU~9K4c1wZN0H5HefCnv~y~WyOuikpF2nN33F41J76VBIBGyOUJU8tvc2q5hMat9HsLslQRO5Bi2llyj0kEpx-JnOQ~40ytC0DrMRG9p9QKH6F44IX995Ediz4DpQI9uDZHrY4~sFHuuw~ut4k-r3inJicuJ0piqRaFpq6SF7HebaQbkhHFD8iFHe8cbzeIEtC-3eav-1ppUCnWJkIH~maxbjM7mgQTd1zZCQOWq8mIOcyB3kkit4bPQ3HElZrVqrQpLpUd2RLLniHXLgKcLiAJLH4X7BIKBRbxEBRdnQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
          "https://s3-alpha-sig.figma.com/img/73e0/29d7/890601079278ee127f39245e003e99b3?Expires=1672012800&Signature=W-eIrLBQUwnYzHAo-ir6cye2OQ90d-nDDeeMuX8-tpDxGNNJ3RTNuSFhKqlCL8enxWHdN5JxSwz4yiOJtwzLfMrV2fxmDfhtCaxBpHTF5zy6GmhJUyoWuUuujNAVXUaGr-C3xW6QWnAv63ewOyrN8tq1V8O2QZogqQ5LxquBr7Z5PrhpTVnFx0D4xgrchgVx5P2Sdfzmld1jN-u7NBNJvLQc0jpoAiwmORC8iBH1lKe09ciLayLermsb3nAzpdWMmBZwHZtDbABGqzD7ydOC90P6dmvPfBh14r2FdoJ4f6DlrXK-d0U8hEqiGmaViwybi3P-74mW-Xev6KwWXtD4iw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
          "https://s3-alpha-sig.figma.com/img/67db/ce9c/d415b4898573bd669191818ec45ab57e?Expires=1672012800&Signature=hqTdRX819Jqu~tc5GuY9qlAc0QTbixJPvz~lCBLUeo7ior5Jy1owRdcfAI~~zusaaWLLnc2YsZH4aQW0LGA3ZRqmaeVYxnNyY9MIjqtqCMPD1Upjo8jiScjJA1NV3efPWFzSs3c6~qjK1RJGNWT5weboQbNHHpxsAKHQzn4FLmSKnAXce75VzUqatm1P4Fx9KXov4irE1y8xSgBcG4pDevRAmf3ET484hGurX2DAPob-5wyS538aWF~28IvXfqeVUJMiTm9u5pWdq1KkWnJ2kMSimGVX6ntLNWmQWYy~yHpSdIJfyppuJdmdjzJOhpamm0Ntb5eHhK~JMocFhIUKgQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
          "https://s3-alpha-sig.figma.com/img/9dc6/0187/73e519eac52bc99a49165c3c81ea8f3d?Expires=1672012800&Signature=RwRmvmwg78wbBG98I~Gz7v46bofzo8vGa~f-9v6nNRh1YdU~9K4c1wZN0H5HefCnv~y~WyOuikpF2nN33F41J76VBIBGyOUJU8tvc2q5hMat9HsLslQRO5Bi2llyj0kEpx-JnOQ~40ytC0DrMRG9p9QKH6F44IX995Ediz4DpQI9uDZHrY4~sFHuuw~ut4k-r3inJicuJ0piqRaFpq6SF7HebaQbkhHFD8iFHe8cbzeIEtC-3eav-1ppUCnWJkIH~maxbjM7mgQTd1zZCQOWq8mIOcyB3kkit4bPQ3HElZrVqrQpLpUd2RLLniHXLgKcLiAJLH4X7BIKBRbxEBRdnQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
          "https://s3-alpha-sig.figma.com/img/73e0/29d7/890601079278ee127f39245e003e99b3?Expires=1672012800&Signature=W-eIrLBQUwnYzHAo-ir6cye2OQ90d-nDDeeMuX8-tpDxGNNJ3RTNuSFhKqlCL8enxWHdN5JxSwz4yiOJtwzLfMrV2fxmDfhtCaxBpHTF5zy6GmhJUyoWuUuujNAVXUaGr-C3xW6QWnAv63ewOyrN8tq1V8O2QZogqQ5LxquBr7Z5PrhpTVnFx0D4xgrchgVx5P2Sdfzmld1jN-u7NBNJvLQc0jpoAiwmORC8iBH1lKe09ciLayLermsb3nAzpdWMmBZwHZtDbABGqzD7ydOC90P6dmvPfBh14r2FdoJ4f6DlrXK-d0U8hEqiGmaViwybi3P-74mW-Xev6KwWXtD4iw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
          "https://s3-alpha-sig.figma.com/img/67db/ce9c/d415b4898573bd669191818ec45ab57e?Expires=1672012800&Signature=hqTdRX819Jqu~tc5GuY9qlAc0QTbixJPvz~lCBLUeo7ior5Jy1owRdcfAI~~zusaaWLLnc2YsZH4aQW0LGA3ZRqmaeVYxnNyY9MIjqtqCMPD1Upjo8jiScjJA1NV3efPWFzSs3c6~qjK1RJGNWT5weboQbNHHpxsAKHQzn4FLmSKnAXce75VzUqatm1P4Fx9KXov4irE1y8xSgBcG4pDevRAmf3ET484hGurX2DAPob-5wyS538aWF~28IvXfqeVUJMiTm9u5pWdq1KkWnJ2kMSimGVX6ntLNWmQWYy~yHpSdIJfyppuJdmdjzJOhpamm0Ntb5eHhK~JMocFhIUKgQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
          "https://s3-alpha-sig.figma.com/img/9dc6/0187/73e519eac52bc99a49165c3c81ea8f3d?Expires=1672012800&Signature=RwRmvmwg78wbBG98I~Gz7v46bofzo8vGa~f-9v6nNRh1YdU~9K4c1wZN0H5HefCnv~y~WyOuikpF2nN33F41J76VBIBGyOUJU8tvc2q5hMat9HsLslQRO5Bi2llyj0kEpx-JnOQ~40ytC0DrMRG9p9QKH6F44IX995Ediz4DpQI9uDZHrY4~sFHuuw~ut4k-r3inJicuJ0piqRaFpq6SF7HebaQbkhHFD8iFHe8cbzeIEtC-3eav-1ppUCnWJkIH~maxbjM7mgQTd1zZCQOWq8mIOcyB3kkit4bPQ3HElZrVqrQpLpUd2RLLniHXLgKcLiAJLH4X7BIKBRbxEBRdnQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
          "https://s3-alpha-sig.figma.com/img/73e0/29d7/890601079278ee127f39245e003e99b3?Expires=1672012800&Signature=W-eIrLBQUwnYzHAo-ir6cye2OQ90d-nDDeeMuX8-tpDxGNNJ3RTNuSFhKqlCL8enxWHdN5JxSwz4yiOJtwzLfMrV2fxmDfhtCaxBpHTF5zy6GmhJUyoWuUuujNAVXUaGr-C3xW6QWnAv63ewOyrN8tq1V8O2QZogqQ5LxquBr7Z5PrhpTVnFx0D4xgrchgVx5P2Sdfzmld1jN-u7NBNJvLQc0jpoAiwmORC8iBH1lKe09ciLayLermsb3nAzpdWMmBZwHZtDbABGqzD7ydOC90P6dmvPfBh14r2FdoJ4f6DlrXK-d0U8hEqiGmaViwybi3P-74mW-Xev6KwWXtD4iw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
          "https://s3-alpha-sig.figma.com/img/67db/ce9c/d415b4898573bd669191818ec45ab57e?Expires=1672012800&Signature=hqTdRX819Jqu~tc5GuY9qlAc0QTbixJPvz~lCBLUeo7ior5Jy1owRdcfAI~~zusaaWLLnc2YsZH4aQW0LGA3ZRqmaeVYxnNyY9MIjqtqCMPD1Upjo8jiScjJA1NV3efPWFzSs3c6~qjK1RJGNWT5weboQbNHHpxsAKHQzn4FLmSKnAXce75VzUqatm1P4Fx9KXov4irE1y8xSgBcG4pDevRAmf3ET484hGurX2DAPob-5wyS538aWF~28IvXfqeVUJMiTm9u5pWdq1KkWnJ2kMSimGVX6ntLNWmQWYy~yHpSdIJfyppuJdmdjzJOhpamm0Ntb5eHhK~JMocFhIUKgQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
        ],
      },
    ],
    category: "Sweater",
    price: "28.58",
  },
];

const Products = () => {
  const [detailOpen, setDetailOpen] = useState(false);
  const [modifyOpen, setModifyOpen] = useState(false);
  const [currItem, setCurrItem] = useState(null);

  const columns = [
    {
      title: "Product ID",
      dataIndex: "productId",
      sorter: (a, b) => a.productId.localeCompare(b.productId),
      defaultSortOrder: "descend",
      render: (value) => <p className="table-cell">{"#" + value}</p>,
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      defaultSortOrder: "descend",
      render: (value) => <p className="table-cell">{value}</p>,
    },
    {
      title: "Image",
      dataIndex: "colors",
      align: "center",
      render: (value) => (
        <center>
          <img
            src={value[0].images[0]}
            alt="Product"
            className="w-[47px] h-[53px] object-cover object-center"
          />
        </center>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      sorter: (a, b) => a.category.localeCompare(b.category),
      defaultSortOrder: "descend",
      render: (value) => <p className="table-cell">{value}</p>,
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price.localeCompare(b.price),
      defaultSortOrder: "descend",
      render: (value) => <p className="table-cell">{"$" + value}</p>,
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_) => (
        <div className="flex gap-x-[20px] justify-center">
          <Tooltip title="Product detail">
            <button
              className="action-button"
              style={{ backgroundColor: "rgba(67, 204, 248, 0.9)" }}
              onClick={() => setDetailOpen(true)}
            >
              <center>
                <img src={viewIcon} alt="View" />
              </center>
            </button>
          </Tooltip>
          <Tooltip title="Edit product">
            <button
              className="action-button"
              style={{ backgroundColor: "rgba(249, 175, 94, 0.9)" }}
              onClick={handleEdit}
            >
              <center>
                <img src={editIcon} alt="Edit" />
              </center>
            </button>
          </Tooltip>
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

  const handleAdd = () => {
    setCurrItem(null);
    setModifyOpen(true);
  };

  const handleEdit = (value) => {
    setCurrItem(value);
    setModifyOpen(true);
  };

  return (
    <div>
      <div className="row">
        <h1 className="title">Product</h1>
        <p className="subtitle">1 Product found</p>
      </div>
      <div className="mt-[15px] buttons-row justify-end">
        <button onClick={handleAdd} className="button">
          Add Item
        </button>
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
      <ProductDetailModal
        open={detailOpen}
        handleCancel={() => setDetailOpen(false)}
      />
      <ModifyProductModal
        open={modifyOpen}
        handleCancel={() => setModifyOpen(false)}
        currItem={currItem}
      />
    </div>
  );
};

export default Products;
