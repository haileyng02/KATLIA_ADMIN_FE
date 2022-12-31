import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal, Form, Input, Select, InputNumber } from "antd";
import ModalTitle from "../../components/ModalTitle";
import ColorList from "../../components/ColorList";
import appApi from "../../api/appApi";
import * as routes from "../../api/apiRoutes";
import getModalFooter from "../../utils/getModalFooter";
import getReadOnlyProps from "../../utils/readOnlyProps";
import categories from "../../utils/categories";
import axios from "axios";

const ModifyProductModal = ({ open, handleCancel, currItem }) => {
  const [form] = Form.useForm();
  const { currentUser } = useSelector((state) => state.user);

  const handleOk = () => {
    handleUploadImages(form.getFieldValue("images")?.file?.originFileObj);
  };

  // useEffect(() => {
  //   if (currItem) {
  //     form.setFieldsValue({
  //       name: currItem.name,
  //       percent: currItem.percent,
  //     });
  //   } else {
  //     form.resetFields();
  //   }
  // }, [currItem, form, open]);

  //Add product
  const addProduct = async () => {
    try {
      const token = currentUser.token;
      const result = await appApi.post(
        routes.ADD_PRODUCT,
        routes.getAddProductBody(694574, "Basic Shirt", "", 1, 39.99, "S", [1]),
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

  const handleUploadImages = async (file) => {
    if (file) {
      //Call api upload image
      console.log(file);
      const token = currentUser.token;
      const formData = new FormData();

      formData.append("file", file);
      const result = await appApi.post(
        routes.ADD_AN_IMAGE_FOR_PRODUCT,
        formData,
        {
          ...routes.getAccessTokenHeader(token),
          ...routes.getAddAnImageForProductBody("694573", "1"),
        }
      );
      console.log(result);
    }
  };

  //Set default pic for product
  const setDefaultPicForProduct = async (id) => {
    try {
      const token = currentUser.token;
      const result = await appApi.patch(
        routes.SET_DEFAULT_PIC_FOR_PRODUCT("694575"),
        null,
        {
          ...routes.getAccessTokenHeader(token),
          ...routes.getSetDefaultPicForProductIdParams("694575"),
        }
      );
      console.log(result.data);
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

  //Edit product info
  const editProductInfo = async () => {
    try {
      const token = currentUser.token;
      const result = await appApi.patch(
        routes.EDIT_PRODUCT_INFO("694575"),
        routes.getEditProductInfoBody("Basic T-shirt", "limited", 20.99),
        {
          ...routes.getAccessTokenHeader(token),
          ...routes.getEditProductInfoIdParams("694575"),
        }
      );
      console.log(result.data);
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

  //Delete product image by color
  const deleteProductImageByColor = async () => {
    try {
      const token = currentUser.token;
      const result = await appApi.delete(routes.DELETE_PRODUCT_IMAGE_BY_COLOR, {
        ...routes.getAccessTokenHeader(token),
        ...routes.getDeleteProductImageByColorParams("694575", "1"),
      });
      console.log(result.data);
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

  //Delete all image of product
  const deleteAllImageOfProduct = async () => {
    try {
      const token = currentUser.token;
      const result = await appApi.delete(
        routes.DELETE_ALL_IMAGE_OF_PRODUCT("694575"),
        {
          ...routes.getAccessTokenHeader(token),
          ...routes.getDeleteAllImageOfProductParams("694575"),
        }
      );
      console.log(result.data);
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

  //Delete an image
  const deleteAnImage = async () => {
    try {
      const token = currentUser.token;
      const result = await appApi.delete(
        routes.DELETE_AN_IMAGE("63afb83bbdb1e33bbb599877"),
        {
          ...routes.getAccessTokenHeader(token),
          ...routes.getDeleteAnImageParams("63afb83bbdb1e33bbb599877"),
        }
      );
      console.log(result.data);
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

  //Delete some images
  const deleteSomeImages = async () => {
    try {
      const token = currentUser.token;

      const result = await appApi({
        method: "delete",
        url: routes.DELETE_SOME_IMAGES,
        data: routes.getDeleteSomeImages(["63b05debe9f03273141ced39"]),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + token,
        },
      });

      console.log(result.data);
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
    <Modal
      title={<ModalTitle text={currItem ? "Edit Product" : "Add Product"} />}
      open={open}
      onCancel={handleCancel}
      centered
      width={"45%"}
      footer={getModalFooter({ handleCancel, handleOk })}
      className="width-modal"
    >
      <Form form={form} className="overflow-y-auto max-h-[70vh]">
        <table className="modal-table table-auto w-full input-table">
          <tbody>
            <tr>
              <th onClick={deleteSomeImages} className="required">
                Product ID:
              </th>
              <td>
                <Form.Item
                  name={"id"}
                  rules={[
                    {
                      required: true,
                      message: "Please enter product ID",
                      whitespace: true,
                    },
                  ]}
                  className="form-item"
                >
                  <Input {...getReadOnlyProps(currItem)} className="input" />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="required">Name:</th>
              <td>
                <Form.Item
                  name={"name"}
                  rules={[
                    {
                      required: true,
                      message: "Please enter product name",
                    },
                  ]}
                  className="form-item"
                >
                  <Input className="input capitalize" />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th>Description:</th>
              <td>
                <Form.Item name={"description"} className="form-item">
                  <Input className="input" />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th>Category:</th>
              <td>
                <Form.Item name={"category"} initialValue={categories[0]}>
                  <Select
                    options={categories}
                    size="large"
                    // suffixIcon={<img src={selectIcon} alt='Select' className="h-2"/>}
                    className="w-full"
                  />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th>Size:</th>
              <td>
                <Form.Item name={"size"} className="form-item">
                  <Input {...getReadOnlyProps(currItem)} className="input" />
                </Form.Item>
                <p className="mb-0 font-inter text-[12px] text-[#FD3838E5]">
                  Note: Separate each size with comma. (Ex: S,M,L) Leave it
                  blank if one size
                </p>
              </td>
            </tr>
            <tr>
              <th className="required">Price:</th>
              <td>
                <Form.Item
                  name={"price"}
                  rules={[
                    {
                      required: true,
                      message: "Please enter price",
                    },
                  ]}
                  className="form-item"
                >
                  <InputNumber controls={false} className="input w-full" />
                </Form.Item>
              </td>
            </tr>
            <ColorList data={currItem?.colors} />
          </tbody>
        </table>
      </Form>
    </Modal>
  );
};

export default ModifyProductModal;
