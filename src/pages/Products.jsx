import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Tooltip } from "antd";
import { viewIcon, editIcon, deleteIcon } from "../images/actions";
import ProductDetailModal from "../modals/product/ProductDetailModal";
import ModifyProductModal from "../modals/product/ModifyProductModal";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";
import categories from "../utils/categories";

// const data = [
//   {
//     key: "1",
//     productId: "19877",
//     name: "Basic Knit Sweater",
//     colors: [
//       {
//         name: 'Black',
//         hex:'#000000',
//         images: [
//           "https://s3-alpha-sig.figma.com/img/9dc6/0187/73e519eac52bc99a49165c3c81ea8f3d?Expires=1672012800&Signature=RwRmvmwg78wbBG98I~Gz7v46bofzo8vGa~f-9v6nNRh1YdU~9K4c1wZN0H5HefCnv~y~WyOuikpF2nN33F41J76VBIBGyOUJU8tvc2q5hMat9HsLslQRO5Bi2llyj0kEpx-JnOQ~40ytC0DrMRG9p9QKH6F44IX995Ediz4DpQI9uDZHrY4~sFHuuw~ut4k-r3inJicuJ0piqRaFpq6SF7HebaQbkhHFD8iFHe8cbzeIEtC-3eav-1ppUCnWJkIH~maxbjM7mgQTd1zZCQOWq8mIOcyB3kkit4bPQ3HElZrVqrQpLpUd2RLLniHXLgKcLiAJLH4X7BIKBRbxEBRdnQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
//           "https://s3-alpha-sig.figma.com/img/73e0/29d7/890601079278ee127f39245e003e99b3?Expires=1672012800&Signature=W-eIrLBQUwnYzHAo-ir6cye2OQ90d-nDDeeMuX8-tpDxGNNJ3RTNuSFhKqlCL8enxWHdN5JxSwz4yiOJtwzLfMrV2fxmDfhtCaxBpHTF5zy6GmhJUyoWuUuujNAVXUaGr-C3xW6QWnAv63ewOyrN8tq1V8O2QZogqQ5LxquBr7Z5PrhpTVnFx0D4xgrchgVx5P2Sdfzmld1jN-u7NBNJvLQc0jpoAiwmORC8iBH1lKe09ciLayLermsb3nAzpdWMmBZwHZtDbABGqzD7ydOC90P6dmvPfBh14r2FdoJ4f6DlrXK-d0U8hEqiGmaViwybi3P-74mW-Xev6KwWXtD4iw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
//           "https://s3-alpha-sig.figma.com/img/67db/ce9c/d415b4898573bd669191818ec45ab57e?Expires=1672012800&Signature=hqTdRX819Jqu~tc5GuY9qlAc0QTbixJPvz~lCBLUeo7ior5Jy1owRdcfAI~~zusaaWLLnc2YsZH4aQW0LGA3ZRqmaeVYxnNyY9MIjqtqCMPD1Upjo8jiScjJA1NV3efPWFzSs3c6~qjK1RJGNWT5weboQbNHHpxsAKHQzn4FLmSKnAXce75VzUqatm1P4Fx9KXov4irE1y8xSgBcG4pDevRAmf3ET484hGurX2DAPob-5wyS538aWF~28IvXfqeVUJMiTm9u5pWdq1KkWnJ2kMSimGVX6ntLNWmQWYy~yHpSdIJfyppuJdmdjzJOhpamm0Ntb5eHhK~JMocFhIUKgQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
//           "https://s3-alpha-sig.figma.com/img/9dc6/0187/73e519eac52bc99a49165c3c81ea8f3d?Expires=1672012800&Signature=RwRmvmwg78wbBG98I~Gz7v46bofzo8vGa~f-9v6nNRh1YdU~9K4c1wZN0H5HefCnv~y~WyOuikpF2nN33F41J76VBIBGyOUJU8tvc2q5hMat9HsLslQRO5Bi2llyj0kEpx-JnOQ~40ytC0DrMRG9p9QKH6F44IX995Ediz4DpQI9uDZHrY4~sFHuuw~ut4k-r3inJicuJ0piqRaFpq6SF7HebaQbkhHFD8iFHe8cbzeIEtC-3eav-1ppUCnWJkIH~maxbjM7mgQTd1zZCQOWq8mIOcyB3kkit4bPQ3HElZrVqrQpLpUd2RLLniHXLgKcLiAJLH4X7BIKBRbxEBRdnQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
//           "https://s3-alpha-sig.figma.com/img/73e0/29d7/890601079278ee127f39245e003e99b3?Expires=1672012800&Signature=W-eIrLBQUwnYzHAo-ir6cye2OQ90d-nDDeeMuX8-tpDxGNNJ3RTNuSFhKqlCL8enxWHdN5JxSwz4yiOJtwzLfMrV2fxmDfhtCaxBpHTF5zy6GmhJUyoWuUuujNAVXUaGr-C3xW6QWnAv63ewOyrN8tq1V8O2QZogqQ5LxquBr7Z5PrhpTVnFx0D4xgrchgVx5P2Sdfzmld1jN-u7NBNJvLQc0jpoAiwmORC8iBH1lKe09ciLayLermsb3nAzpdWMmBZwHZtDbABGqzD7ydOC90P6dmvPfBh14r2FdoJ4f6DlrXK-d0U8hEqiGmaViwybi3P-74mW-Xev6KwWXtD4iw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
//           "https://s3-alpha-sig.figma.com/img/67db/ce9c/d415b4898573bd669191818ec45ab57e?Expires=1672012800&Signature=hqTdRX819Jqu~tc5GuY9qlAc0QTbixJPvz~lCBLUeo7ior5Jy1owRdcfAI~~zusaaWLLnc2YsZH4aQW0LGA3ZRqmaeVYxnNyY9MIjqtqCMPD1Upjo8jiScjJA1NV3efPWFzSs3c6~qjK1RJGNWT5weboQbNHHpxsAKHQzn4FLmSKnAXce75VzUqatm1P4Fx9KXov4irE1y8xSgBcG4pDevRAmf3ET484hGurX2DAPob-5wyS538aWF~28IvXfqeVUJMiTm9u5pWdq1KkWnJ2kMSimGVX6ntLNWmQWYy~yHpSdIJfyppuJdmdjzJOhpamm0Ntb5eHhK~JMocFhIUKgQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
//           "https://s3-alpha-sig.figma.com/img/9dc6/0187/73e519eac52bc99a49165c3c81ea8f3d?Expires=1672012800&Signature=RwRmvmwg78wbBG98I~Gz7v46bofzo8vGa~f-9v6nNRh1YdU~9K4c1wZN0H5HefCnv~y~WyOuikpF2nN33F41J76VBIBGyOUJU8tvc2q5hMat9HsLslQRO5Bi2llyj0kEpx-JnOQ~40ytC0DrMRG9p9QKH6F44IX995Ediz4DpQI9uDZHrY4~sFHuuw~ut4k-r3inJicuJ0piqRaFpq6SF7HebaQbkhHFD8iFHe8cbzeIEtC-3eav-1ppUCnWJkIH~maxbjM7mgQTd1zZCQOWq8mIOcyB3kkit4bPQ3HElZrVqrQpLpUd2RLLniHXLgKcLiAJLH4X7BIKBRbxEBRdnQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
//           "https://s3-alpha-sig.figma.com/img/73e0/29d7/890601079278ee127f39245e003e99b3?Expires=1672012800&Signature=W-eIrLBQUwnYzHAo-ir6cye2OQ90d-nDDeeMuX8-tpDxGNNJ3RTNuSFhKqlCL8enxWHdN5JxSwz4yiOJtwzLfMrV2fxmDfhtCaxBpHTF5zy6GmhJUyoWuUuujNAVXUaGr-C3xW6QWnAv63ewOyrN8tq1V8O2QZogqQ5LxquBr7Z5PrhpTVnFx0D4xgrchgVx5P2Sdfzmld1jN-u7NBNJvLQc0jpoAiwmORC8iBH1lKe09ciLayLermsb3nAzpdWMmBZwHZtDbABGqzD7ydOC90P6dmvPfBh14r2FdoJ4f6DlrXK-d0U8hEqiGmaViwybi3P-74mW-Xev6KwWXtD4iw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
//           "https://s3-alpha-sig.figma.com/img/67db/ce9c/d415b4898573bd669191818ec45ab57e?Expires=1672012800&Signature=hqTdRX819Jqu~tc5GuY9qlAc0QTbixJPvz~lCBLUeo7ior5Jy1owRdcfAI~~zusaaWLLnc2YsZH4aQW0LGA3ZRqmaeVYxnNyY9MIjqtqCMPD1Upjo8jiScjJA1NV3efPWFzSs3c6~qjK1RJGNWT5weboQbNHHpxsAKHQzn4FLmSKnAXce75VzUqatm1P4Fx9KXov4irE1y8xSgBcG4pDevRAmf3ET484hGurX2DAPob-5wyS538aWF~28IvXfqeVUJMiTm9u5pWdq1KkWnJ2kMSimGVX6ntLNWmQWYy~yHpSdIJfyppuJdmdjzJOhpamm0Ntb5eHhK~JMocFhIUKgQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
//         ],
//       },
//     ],
//     category: "Sweater",
//     price: "28.58",
//   },
// ];

const Products = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [detailOpen, setDetailOpen] = useState(false);
  const [modifyOpen, setModifyOpen] = useState(false);
  const [currItem, setCurrItem] = useState(null);
  const [data, setData] = useState();
  const [filteredInfo, setFilteredInfo] = useState({});

  const columns = [
    {
      title: "Product ID",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
      defaultSortOrder: "descend",
      render: (value) => <p className="table-cell">{"#" + value}</p>,
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name?.localeCompare(b.name),
      defaultSortOrder: "descend",
      render: (value) => <p className="table-cell">{value}</p>,
    },
    {
      title: "Image",
      dataIndex: "image",
      align: "center",
      render: (value) => (
        <center>
          <img
            src={value}
            alt="Product"
            className="w-[47px] h-[53px] object-cover object-center"
          />
        </center>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      filters: categories,
      filteredValue: filteredInfo.category || null,
      onFilter: (value, record) => record.category?.indexOf(value) === 0,
      sorter: (a, b) => a.category?.localeCompare(b.category),
      defaultSortOrder: "descend",
      render: (value) => <p className="table-cell">{value}</p>,
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
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
    setFilteredInfo(filters);
  };

  const handleAdd = () => {
    setCurrItem(null);
    setModifyOpen(true);
  };

  const handleEdit = (value) => {
    setCurrItem(value);
    setModifyOpen(true);
  };

  //Get all products
  const getAllProducts = async () => {
    try {
      const token = currentUser.token;
      const result = await appApi.get(
        routes.GET_ALL_PRODUCTS,
        routes.getAccessTokenHeader(token)
      );
      console.log(result);
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
  useEffect(() => {
    getAllProducts();
  }, [currentUser]);

  //Get undeleted products
  const getUndeletedProducts = async () => {
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzQ2ZTgzMDIwNjE5M2M4N2RlMWFjMzIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY3MTE2MjM1MSwiZXhwIjoxNjcxMjQ4NzUxfQ.svzkppg4xRKCLbiD-cjf3PzjvnfxflpIa2GnTA8eMXw";
      const result = await appApi.get(
        routes.GET_UNDELETED_PRODUCTS,
        routes.getAccessTokenHeader(token)
      );
      console.log(result);
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
    <div>
      <div className="row">
        <h1 className="title">Product</h1>
        {data ? (
          <p className="subtitle">{data.length + " Products found"}</p>
        ) : null}
      </div>
      <div className="mt-[15px] buttons-row justify-end">
        <button onClick={handleAdd} className="button">
          Add Item
        </button>
        <button onClick={() => setFilteredInfo({})} className="clear-button">
          <p>Clear Filter</p>
        </button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        pagination={{ showSizeChanger: false }}
        loading={!data}
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
