import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Form, Input, Select, InputNumber, Spin } from "antd";
import { useSnackbar } from "notistack";
import ModalTitle from "../../components/ModalTitle";
import ColorList from "../../components/ColorList";
import appApi from "../../api/appApi";
import * as routes from "../../api/apiRoutes";
import { getCategories } from "../../actions/categories";
import getModalFooter from "../../utils/getModalFooter";
import getReadOnlyProps from "../../utils/readOnlyProps";
import toTitleCase from "../../utils/toTitleCase";
import ReadOnlySuffix from "../../components/ReadOnlySuffix";

const { Option } = Select;

const ModifyProductModal = ({
  open,
  handleCancel,
  currItem,
  getAllProducts,
  nextProductId
}) => {
  const [form] = Form.useForm();
  const { currentUser } = useSelector((state) => state.user);
  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [categoriesData, setCategoriesData] = useState();
  const [colorList, setColorList] = useState([{ colorId: 1 }]);
  const [loading, setLoading] = useState(false);
  const [imagesDone, setImagesDone] = useState(0);
  const [deleteString, setDeleteString] = useState([]);
  const [doneDelete, setDoneDelete] = useState(false);
  const [doneEdit, setDoneEdit] = useState(false);
  const [detail, setDetail] = useState();

  //Get all category
  const getAllCategory = async () => {
    try {
      const token = currentUser.token;
      const result = await appApi.get(
        routes.GET_ALL_CATEGORY,
        routes.getAccessTokenHeader(token)
      );
      setCategoriesData(result.data);
      dispatch(getCategories(result.data));
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

  //Add product
  const addProduct = async (
    productId,
    name,
    description,
    categoryId,
    price,
    sizeList,
    colorIdList
  ) => {
    setLoading(true);
    try {
      const token = currentUser.token;
      const result = await appApi.post(
        routes.ADD_PRODUCT,
        routes.getAddProductBody(
          parseInt(productId),
          name,
          description,
          categoryId,
          price,
          sizeList,
          colorIdList
        ),
        routes.getAccessTokenHeader(token)
      );
      console.log(result);
      if (!colorList[0].fileList) {
        handleDone();
      } else {
        handleUploadImages();
      }
    } catch (err) {
      setLoading(false);
      form.setFields([
        {
          name: "id",
          errors: ["This product ID already exists"],
        },
      ]);
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(err.message);
      }
    }
  };

  const upLoadAnImage = async (file, productId, colorId) => {
    try {
      //Call api upload image
      const token = currentUser.token;
      const formData = new FormData();

      formData.append("file", file);
      const result = await appApi.post(
        routes.ADD_AN_IMAGE_FOR_PRODUCT,
        formData,
        {
          ...routes.getAccessTokenHeader(token),
          ...routes.getAddAnImageForProductBody(productId, colorId),
        }
      );
      console.log(result);
      setImagesDone((curr) => curr + 1);
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

  //Set default pic for product
  const setDefaultPicForProduct = async (id) => {
    try {
      const token = currentUser.token;
      const result = await appApi.patch(
        routes.SET_DEFAULT_PIC_FOR_PRODUCT(id),
        null,
        {
          ...routes.getAccessTokenHeader(token),
          ...routes.getSetDefaultPicForProductIdParams(id),
        }
      );
      console.log(result.data);
      handleDone();
    } catch (err) {
      setLoading(false);
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
  const editProductInfo = async (id, name, description, price) => {
    try {
      const token = currentUser.token;
      const result = await appApi.patch(
        routes.EDIT_PRODUCT_INFO(id),
        routes.getEditProductInfoBody(name, description, price),
        {
          ...routes.getAccessTokenHeader(token),
          ...routes.getEditProductInfoIdParams(id),
        }
      );
      console.log(result.data);
    } catch (err) {
      setLoading(false);
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(err.message);
      }
    }
    setDoneEdit(true);
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
  const deleteSomeImages = async (deleteArray) => {
    try {
      const token = currentUser.token;

      const result = await appApi({
        method: "delete",
        url: routes.DELETE_SOME_IMAGES,
        data: routes.getDeleteSomeImages(deleteArray),
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
    setDoneDelete(true);
  };

  //Get product detail
  const getProductDetail = async (id) => {
    setLoading(true);
    try {
      const token = currentUser.token;
      const result = await appApi.get(routes.GET_PRODUCT_DETAIL(id), {
        ...routes.getAccessTokenHeader(token),
        ...routes.getProductDetailIdParams(id),
      });
      setDetail(result.data);
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

  const getSizeString = (details) => {
    var sizeString = "";
    for (let i = 0; i < details.length; i++) {
      sizeString += details[i].size;
      if (i !== details.length - 1) {
        sizeString += ",";
      }
    }
    if (sizeString === "ONESIZE") sizeString = "";
    return sizeString;
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (currItem) {
        handleEditProduct(values);
      } else {
        handleAddProduct(values);
      }
    });
  };

  const handleAddProduct = (values) => {
    const colorIdList = colorList.map((value) => value.colorId);
    addProduct(
      values.id,
      toTitleCase(values.name),
      values.description,
      values.category,
      values.price,
      values.size === "" ? "ONESIZE" : values.size,
      colorIdList
    );
  };

  const handleEditProduct = (values) => {
    setLoading(true);

    //Edit product info
    if (
      detail.name.toLowerCase() !== values.name.toLowerCase() ||
      detail.description !== values.description ||
      detail.price !== values.price
    ) {
      editProductInfo(
        values.id,
        toTitleCase(values.name),
        values.description,
        values.price
      );
    } else {
      setDoneEdit(true);
    }

    //Upload image
    handleUploadImages();

    //Delete images
    if (deleteString.length >= 1) {
      deleteSomeImages(deleteString);
    } else {
      setDoneDelete(true);
    }
  };

  const handleUploadImages = () => {
    var colorId;
    for (let i = 0; i < colorList.length; i++) {
      colorId = colorList[i].colorId;
      for (let j = 0; j < colorList[i].fileList.length; j++) {
        if (colorList[i].fileList[j].originFileObj) {
          upLoadAnImage(
            colorList[i].fileList[j].originFileObj,
            form.getFieldValue("id"),
            colorId
          );
        }
      }
    }
  };

  const onCancel = () => {
    handleCancel();
    setImagesDone(0);
    setDoneDelete(false);
    setDoneEdit(false);
    form.resetFields();
    setDeleteString([]);
    setColorList([{ colorId: 1 }]);
  };

  const handleDone = () => {
    setLoading(false);
    enqueueSnackbar(
      currItem ? "Product edited successfully!" : "Product added successfully!",
      { variant: "success" }
    );
    onCancel();
    getAllProducts();
  };

  const getImageSum = () => {
    if (!colorList[0].fileList) return 0;
    var imageSum = 0;
    for (let i = 0; i < colorList.length; i++) {
      for (let j = 0; j < colorList[i].fileList.length; j++) {
        if (colorList[i].fileList[j].originFileObj) {
          imageSum++;
        }
      }
    }
    return imageSum;
  };

  const getAllImageSum = () => {
    if (!colorList[0].fileList) return 0;
    var imageSum = 0;
    for (let i = 0; i < colorList.length; i++) {
      for (let j = 0; j < colorList[i].fileList.length; j++) {
        imageSum++;
      }
    }
    return imageSum;
  };

  useEffect(() => {
    if (currentUser) {
      if (categories) {
        setCategoriesData(categories);
      } else {
        getAllCategory();
      }
    }
  }, [currentUser]);

  useEffect(() => {
    if (!colorList[0].fileList && !currItem) return;
    const imageSum = getImageSum();
    if (!currItem) {
      if (imagesDone === imageSum) {
        setDefaultPicForProduct(form.getFieldValue("id"));
      }
    } else {
      if (imagesDone === imageSum && doneEdit && doneDelete) {
        if (
          getAllImageSum() === 0 ||
          (imageSum === 0 && deleteString.length === 0)
        ) {
          handleDone();
        } else {
          setDefaultPicForProduct(form.getFieldValue("id"));
        }
      }
    }
  }, [imagesDone, doneEdit, doneDelete]);

  useEffect(() => {
    if (!open) return;
    if (!currItem) {
      form.setFieldValue('id',nextProductId);
      return;
    }
    getProductDetail(currItem.id);
  }, [currItem,nextProductId,open]);

  useEffect(() => {
    if (detail) {
      form.setFieldsValue({
        id: detail.id,
        name: detail.name,
        description: detail.description,
        category: currItem?.category,
        size: getSizeString(detail.colorList[0].details),
        price: detail.price,
      });
      setColorList(
        detail.colorList.map((value) => {
          return { colorId: value.id, fileList: value.imgList };
        })
      );
    }
  }, [detail]);

  return (
    <Modal
      title={<ModalTitle text={currItem ? "Edit Product" : "Add Product"} />}
      open={open}
      onCancel={onCancel}
      centered
      width={"45%"}
      footer={getModalFooter({ onCancel, handleOk })}
      className="width-modal"
    >
      <Spin spinning={loading}>
        <Form form={form} className="overflow-modal">
          <table className="modal-table table-auto w-full input-table">
            <tbody>
              <tr>
                <th className="required">Product ID:</th>
                <td>
                  <Form.Item
                    name={"id"}
                    rules={[
                      {
                        required: true,
                        message: "Please enter product ID",
                      },
                      {
                        message: "Product ID must be an integer.",
                        validator: (_, value) => {
                          if (parseInt(value) || !value) {
                            return Promise.resolve();
                          } else {
                            return Promise.reject();
                          }
                        },
                      },
                    ]}
                    className="form-item"
                  >
                    <Input {...getReadOnlyProps(true)} className="input" />
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
                  <Form.Item
                    name={"description"}
                    initialValue={""}
                    className="form-item"
                  >
                    <Input className="input" />
                  </Form.Item>
                </td>
              </tr>
              <tr>
                <th>Category:</th>
                <td>
                  <Form.Item name={"category"} initialValue={1}>
                    <Select
                      size="large"
                      loading={!categoriesData}
                      disabled={currItem}
                      suffixIcon={currItem && <ReadOnlySuffix />}
                      className="w-full"
                    >
                      {categoriesData?.map((category, i) => (
                        <Option key={i} value={category.categoryId}>
                          {category.category}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </td>
              </tr>
              <tr>
                <th>Size:</th>
                <td>
                  <Form.Item
                    name={"size"}
                    className="form-item"
                    initialValue={""}
                    rules={[
                      {
                        message: "Invalid format.",
                        validator: (_, value) => {
                          if (
                            value.match(/^[A-Za-z0-9]+(?:,[A-Za-z0-9]+)*$/) ||
                            value === ""
                          ) {
                            return Promise.resolve();
                          } else {
                            return Promise.reject();
                          }
                        },
                      },
                    ]}
                  >
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
              <ColorList
                data={currItem?.colors}
                colorList={colorList}
                setColorList={setColorList}
                currItem={currItem}
                deleteString={deleteString}
                setDeleteString={setDeleteString}
              />
            </tbody>
          </table>
        </Form>
      </Spin>
    </Modal>
  );
};

export default ModifyProductModal;
