import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Tooltip } from "antd";
import { useSnackbar } from "notistack";
import { viewIcon, editIcon, deleteIcon } from "../images/actions";
import ProductDetailModal from "../modals/product/ProductDetailModal";
import ModifyProductModal from "../modals/product/ModifyProductModal";
import WarningModal from "../modals/WarningModal";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";
import { getProducts } from "../actions/products";
import categories from "../utils/categories";

const Products = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { allProducts, nextProductId } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [detailOpen, setDetailOpen] = useState(false);
  const [modifyOpen, setModifyOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);
  const [currItem, setCurrItem] = useState(null);
  const [data, setData] = useState();
  const [nextId, setNextId] = useState();
  const [filteredInfo, setFilteredInfo] = useState({});
  const [loading, setLoading] = useState(false);

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
      render: (value) => (
        <div className="flex gap-x-[20px] justify-center">
          <Tooltip title="Product detail">
            <button
              className="action-button"
              style={{ backgroundColor: "rgba(67, 204, 248, 0.9)" }}
              onClick={() => handleViewDetail(value)}
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
              onClick={() => handleEdit(value)}
            >
              <center>
                <img src={editIcon} alt="Edit" />
              </center>
            </button>
          </Tooltip>
          <Tooltip title="Delete this product">
            <button
              className="action-button"
              style={{ backgroundColor: "rgba(253, 56, 56, 0.9)" }}
              onClick={() => handleDeleteProduct(value)}
            >
              <center>
                <img src={deleteIcon} alt="Delete" />
              </center>
            </button>
          </Tooltip>
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

  const handleViewDetail = (value) => {
    setCurrItem(value);
    setDetailOpen(true);
  };

  const handleDeleteProduct = (value) => {
    setCurrItem(value);
    setWarningOpen(true);
  };

  const handleWarningOk = () => {
    deleteProduct(currItem.id);
  };

  const handleDetailCancel = () => {
    setDetailOpen(false);
    setCurrItem(null);
  };

  const handleModifyCancel = () => {
    setModifyOpen(false);
    setCurrItem(null);
  };

  //Get all products
  const getAllProducts = async () => {
    setLoading(true);
    try {
      const token = currentUser.token;
      const result = await appApi.get(
        routes.GET_ALL_PRODUCTS,
        routes.getAccessTokenHeader(token)
      );
      //Set next product id
      const nextNewProductId = result.data.pop().nextNewProductId;
      setNextId(nextNewProductId);
      //Set data
      const products = result.data.map((d, i) => {
        return { ...d, key: i };
      });
      setData(products);
      dispatch(getProducts(products, nextNewProductId));
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
  useEffect(() => {
    if (currentUser) {
      if (allProducts) {
        setData(allProducts);
        setNextId(nextProductId);
      } else {
        getAllProducts();
      }
    }
  }, [currentUser]);

  //Delete product
  const deleteProduct = async (id) => {
    try {
      const token = currentUser.token;
      const result = await appApi.delete(routes.DELETE_PRODUCT(id), {
        ...routes.getAccessTokenHeader(token),
        ...routes.getDeleteProductBody(id),
      });
      console.log(result);
      enqueueSnackbar("Product deleted successfully!", { variant: "success" });
      getAllProducts();
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
        loading={loading}
        className="mt-5 pagination-active table-header"
      />
      <ProductDetailModal
        open={detailOpen}
        handleCancel={handleDetailCancel}
        currentUser={currentUser}
        currItem={currItem}
      />
      <ModifyProductModal
        open={modifyOpen}
        handleCancel={handleModifyCancel}
        currItem={currItem}
        getAllProducts={getAllProducts}
        nextProductId={nextId}
      />
      <WarningModal
        text={"Are you sure you want to delete this product?"}
        open={warningOpen}
        handleCancel={() => setWarningOpen(false)}
        handleOk={handleWarningOk}
      />
    </div>
  );
};

export default Products;
