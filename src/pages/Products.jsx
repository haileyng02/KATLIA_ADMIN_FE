import React from "react";

const Products = () => {
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
    </div>
  );
};

export default Products;
