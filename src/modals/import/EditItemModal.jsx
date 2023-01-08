import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Form, Input, Spin } from "antd";
import { useSnackbar } from "notistack";
import appApi from "../../api/appApi";
import * as routes from "../../api/apiRoutes";
import ModalTitle from "../../components/ModalTitle";
import getModalFooter from "../../utils/getModalFooter";
import DollarPrefix from "../../components/DollarPrefix";
import Quantity from "../../components/Quantity";
import ReadOnlySuffix from "../../components/ReadOnlySuffix";

const EditItemModal = ({
  open,
  handleCancel,
  currItem,
  getItemsInExistingForm,
}) => {
  const { currentUser } = useSelector((state) => state.user);
  const [form] = Form.useForm();
  const { enqueueSnackbar } = useSnackbar();
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);

  //Get item detail for update
  const getItemDetailForUpdate = async () => {
    try {
      const token = currentUser.token;
      const result = await appApi.get(
        routes.ITEM_DETAIL_FOR_UPDATE(currItem.id),
        {
          ...routes.getAccessTokenHeader(token),
          ...routes.getItemDetailForUpdateIdParams(currItem.id),
        }
      );
      console.log(result.data);
      form.setFieldsValue({
        product: `${result.data?.productId} | ${result.data?.name}`,
        price: result.data.unitPrice,
        color: result.data.color,
      });
      setSizes([
        {
          size: result.data.size,
          quantity: result.data.quantity,
        },
      ]);
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

  //Edit an item
  const editAnItem = async (quantity, unitPrice) => {
    setLoading(true);
    try {
      const token = currentUser.token;
      await appApi.patch(
        routes.EDIT_AN_ITEMS(currItem.id),
        routes.getEditAnItemBody(quantity, unitPrice),
        {
          ...routes.getAccessTokenHeader(token),
          ...routes.getEditAnItemIdParams(currItem.id),
        }
      );
      enqueueSnackbar("Edited item successfully!", { variant: "success" });
      handleCancel();
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

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (
        parseFloat(values.price) !== currItem.unitPrice ||
        sizes[0].quantity !== currItem.quantity
      ) {
        editAnItem(sizes[0].quantity, parseFloat(values.price));
      }
      else {
        handleCancel();
      }
    });
  };

  useEffect(() => {
    if (currItem) {
      getItemDetailForUpdate();
    }
  }, [currItem]);

  return (
    <Modal
      title={<ModalTitle text={"Edit item"} />}
      open={open}
      onCancel={handleCancel}
      centered
      width={"35%"}
      footer={getModalFooter({ handleCancel, handleOk })}
    >
      <Spin spinning={loading}>
        <Form form={form}>
          <table className="modal-table">
            <tbody>
              <tr>
                <th>Product:</th>
                <td>
                  <Form.Item name={"product"}>
                    <Input
                      readOnly
                      suffix={<ReadOnlySuffix />}
                      className="input"
                    />
                  </Form.Item>
                </td>
              </tr>
              <tr>
                <th className="required">Unit price:</th>
                <td>
                  <Form.Item
                    name={"price"}
                    rules={[
                      {
                        required: true,
                        message: "Please enter unit price",
                      },
                      {
                        message: "Unit price must be a number",
                        validator: (_, value) => {
                          if (!isNaN(value) || !value) {
                            return Promise.resolve();
                          } else {
                            return Promise.reject();
                          }
                        },
                      },
                    ]}
                  >
                    <Input className="input" prefix={<DollarPrefix />} />
                  </Form.Item>
                </td>
              </tr>
              <tr>
                <th>Color:</th>
                <td>
                  <Form.Item name={"color"}>
                    <Input
                      readOnly
                      suffix={<ReadOnlySuffix />}
                      className="input"
                    />
                  </Form.Item>
                </td>
              </tr>
              <tr>
                <th>Size:</th>
                <td>{currItem?.size}</td>
              </tr>
              <tr>
                <th>Quantity:</th>
                <td>
                  <Quantity
                    size={sizes[0]}
                    sizes={sizes}
                    setSizes={setSizes}
                    min={1}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </Form>
      </Spin>
    </Modal>
  );
};

export default EditItemModal;
