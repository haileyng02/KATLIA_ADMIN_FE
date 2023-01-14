import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import useColumnSearchProps from "../hooks/useColumnSearchProps";
import ProductDetailModal from "../modals/product/ProductDetailModal";
import ModifyProductModal from "../modals/product/ModifyProductModal";
import WarningModal from "../modals/WarningModal";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";
import { getProducts } from "../actions/products";
import ProductTable from "../components/tables/ProductTable";

const Products = () => {
  const [detailOpen, setDetailOpen] = useState(false);
  const [modifyOpen, setModifyOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);
  const [currItem, setCurrItem] = useState(null);
  const [data, setData] = useState();
  const [nextId, setNextId] = useState();
  const [filteredInfo, setFilteredInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState();
  const { currentUser } = useSelector((state) => state.user);
  const { allProducts, nextProductId } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { resetAll } = useColumnSearchProps({
    filteredInfo,
    setFilteredInfo,
  });

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
        return {
          ...d,
          key: i,
          category:
            d.gender.charAt(0).toUpperCase() +
            d.gender.slice(1) +
            "'s " +
            d.category,
        };
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

  useEffect(() => {
    if (data) {
      setCategories([
        ...new Map(
          data.map((d) => [
            d.category,
            {
              text: d.category,
              value: d.category,
            },
          ])
        ).values(),
      ]);
    }
  }, [data]);

  return (
    <div>
      <div className="row">
        <h1 className="title">Product</h1>
        {data ? (
          <p className="subtitle">{data.length + " Products found"}</p>
        ) : null}
      </div>
      <div className="mt-[15px] buttons-row justify-end">
        {currentUser?.role === "ADMIN" && (
          <button onClick={handleAdd} className="button">
            Add Item
          </button>
        )}
        <button onClick={resetAll} className="clear-button">
          <p>Clear Filter</p>
        </button>
      </div>
      <ProductTable
        data={data}
        loading={loading}
        handleViewDetail={handleViewDetail}
        handleEdit={handleEdit}
        handleDeleteProduct={handleDeleteProduct}
        filteredInfo={filteredInfo}
        setFilteredInfo={setFilteredInfo}
        currentUser={currentUser}
        categories={categories}
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
