import React, { useState } from "react";
import { Table, Tooltip } from "antd";
import useColumnSearchProps from "../../hooks/useColumnSearchProps";
import appApi from "../../api/appApi";
import * as routes from "../../api/apiRoutes";
import { editIcon, deleteIcon } from "../../images/actions";
import EditItemModal from "../../modals/import/EditItemModal";

const ImportTable = ({
  data,
  loading,
  setLoading,
  getItemsInExistingForm,
  currentUser,
  hideAction,
}) => {
  const [editOpen, setEditOpen] = useState(false);
  const [currItem, setCurrItem] = useState();
  const [filteredInfo, setFilteredInfo] = useState({});
  const { getColumnSearchProps } = useColumnSearchProps({
    filteredInfo,
    setFilteredInfo,
  });

  const columns = [
    {
      title: "Product ID",
      dataIndex: "productId",
      ...getColumnSearchProps("productId"),
      sorter: (a, b) => a.productId - b.productId,
      render: (value) => <p className="table-cell">{"#" + value}</p>,
    },
    {
      title: "Product's Name",
      dataIndex: "name",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.name?.localeCompare(b.name),
      render: (value) => <p className="table-cell">{value}</p>,
    },
    {
      title: "Color",
      dataIndex: "color",
      align: "center",
      ...getColumnSearchProps("color"),
      sorter: (a, b) => a.color?.localeCompare(b.color),
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
      ...getColumnSearchProps("size"),
      sorter: (a, b) => a.size?.localeCompare(b.size),
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
      render: (value) => (
        <center>
          <p className="table-cell">{value}</p>
        </center>
      ),
    },
    {
      title: "Total",
      dataIndex: !hideAction && "total",
      align: "center",
      sorter: (a, b) => a.total - b.total,
      render: (value) => (
        <center>
          <p className="table-cell">
            {"$" +
              (hideAction
                ? (value?.quantity * value?.unitPrice).toFixed(2)
                : value?.toFixed(2))}
          </p>
        </center>
      ),
    },
    ...(!hideAction
      ? [
          {
            title: "Action",
            key: "action",
            align: "center",
            render: (value) => (
              <div className="flex gap-x-5 justify-center">
                <Tooltip title="Edit item">
                  <button
                    className="action-button"
                    style={{ backgroundColor: "#F9AF5EE5" }}
                    onClick={() => handleEditItem(value)}
                  >
                    <center>
                      <img src={editIcon} alt="Edit" />
                    </center>
                  </button>
                </Tooltip>
                <Tooltip title="Delete item">
                  <button
                    className="action-button"
                    style={{ backgroundColor: "#FD3838E5" }}
                    onClick={() => deleteAnItem(value.id)}
                  >
                    <center>
                      <img src={deleteIcon} alt="Delete" />
                    </center>
                  </button>
                </Tooltip>
              </div>
            ),
          },
        ]
      : []),
  ];

  //Delete an item
  const deleteAnItem = async (id) => {
    setLoading(true);
    try {
      const token = currentUser.token;
      const result = await appApi.delete(routes.DELETE_AN_ITEM(id), {
        ...routes.getAccessTokenHeader(token),
        ...routes.getDeleteAnItemIdParams(id),
      });
      console.log(result.data);
      getItemsInExistingForm();
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

  const handleEditItem = (value) => {
    setEditOpen(true);
    setCurrItem(value);
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        className="mt-5 pagination-active table-header"
      />
      <EditItemModal
        open={editOpen}
        handleCancel={() => setEditOpen(false)}
        currItem={currItem}
        getItemsInExistingForm={getItemsInExistingForm}
      />
    </>
  );
};

export default ImportTable;
