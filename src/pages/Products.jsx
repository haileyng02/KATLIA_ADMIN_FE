import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Tooltip } from "antd";
import { viewIcon, editIcon, deleteIcon } from "../images/actions";
import ProductDetailModal from "../modals/product/ProductDetailModal";
import ModifyProductModal from "../modals/product/ModifyProductModal";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";
import { getProducts } from "../actions/products";
import categories from "../utils/categories";

const Products = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
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
      result.data.pop();
      const products = result.data.map((d, i) => {
        return { ...d, key: i };
      });
      setData(products);
      dispatch(getAllProducts(products));
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

  //Delete product
  const deleteProduct = async () => {
    try {
      const token = currentUser.token;
      const result = await appApi.delete(routes.DELETE_PRODUCT("694575"), {
        ...routes.getAccessTokenHeader(token),
        ...routes.getDeleteProductBody("694575"),
      });
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

  // useEffect(() => {
  //   if(currentUser) deleteProduct()
  // }, [currentUser])

  //Get all colors
  const getAllColors = async () => {
    try {
      const token = currentUser.token;
      const result = await appApi.get(
        routes.GET_ALL_COLORS,
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

  useEffect(() => {
    if (currentUser) getAllColors();
  }, [currentUser]);

  //Get all category
  const getAllCategory = async () => {
    try {
      const token = currentUser.token;
      const result = await appApi.get(
        routes.GET_ALL_CATEGORY,
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

  useEffect(() => {
    if (currentUser) getAllCategory();
  }, [currentUser]);

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
