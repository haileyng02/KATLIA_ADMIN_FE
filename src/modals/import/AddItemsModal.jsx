import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Form, Input, Select, Spin } from "antd";
import { useSnackbar } from "notistack";
import appApi from "../../api/appApi";
import * as routes from "../../api/apiRoutes";
import { getPromotionProducts } from "../../actions/products";
import ModalTitle from "../../components/ModalTitle";
import getModalFooter from "../../utils/getModalFooter";
import DollarPrefix from "../../components/DollarPrefix";
import ColorIcon from "../../components/ColorIcon";
import Quantity from "../../components/Quantity";

const { Option } = Select;

const AddItemsModal = ({
  open,
  handleCancel,
  currentUser,
  getItemsInExistingForm,
}) => {
  const { promoProducts } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { enqueueSnackbar } = useSnackbar();
  const [products, setProducts] = useState();
  const [productId, setProductId] = useState();
  const [colors, setColors] = useState();
  const [colorsLoading, setColorsLoading] = useState(false);
  const [sizes, setSizes] = useState();
  const [sizesLoading, setSizesLoading] = useState(false);
  const [qtyErr, setQtyErr] = useState(false);
  const [loading, setLoading] = useState(false);

  //Get all products
  const getProducts = async () => {
    try {
      const token = currentUser.token;
      const result = await appApi.get(
        routes.GET_PRODUCTS_FOR_DISCOUNT,
        routes.getAccessTokenHeader(token)
      );
      result.data.pop();
      const productsData = result.data.map((d, i) => {
        return { ...d, key: i };
      });
      setProducts(productsData);
      dispatch(getPromotionProducts(productsData));
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

  //Product color for import
  const getProductColorForImport = async (id) => {
    setColorsLoading(true);
    try {
      const token = currentUser.token;
      const result = await appApi.get(routes.PRODUCT_COLOR_FOR_IMPORT(id), {
        ...routes.getAccessTokenHeader(token),
        ...routes.getProductColorForImportIdParams(id),
      });
      setColors(result.data);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(err.message);
      }
    }
    setColorsLoading(false);
  };

  //Product size for import
  const getProductSizeForImport = async (id) => {
    setSizesLoading(true);
    try {
      const token = currentUser.token;
      const result = await appApi.get(routes.PRODUCT_SIZE_FOR_IMPORT(id), {
        ...routes.getAccessTokenHeader(token),
        ...routes.getProductSizeForImportIdParams(id),
      });
      setSizes(
        result.data.map((value) => {
          return {
            size: value.size,
            quantity: 0,
          };
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
    setSizesLoading(false);
  };

  //Add items into form
  const addItemsIntoForm = async (itemArray) => {
    setLoading(true);
    try {
      const token = currentUser.token;
      const result = await appApi.post(
        routes.ADD_ITEMS_INTO_FORM,
        routes.getAddItemsIntoFormBody(itemArray),
        routes.getAccessTokenHeader(token)
      );
      console.log(result.data);
      enqueueSnackbar("Added items into form!", { variant: "success" });
      onCancel();
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
    const qtyExists = doesQtyExist();
    if (!qtyExists) {
      setQtyErr(true);
    }
    form.validateFields().then((values) => {
      if (qtyExists) {
        addItemsIntoForm(
          sizes
            .filter((size) => size.quantity > 0)
            .map((size) => {
              return {
                productId: values.product,
                colorId: values.color,
                size: size.size,
                quantity: size.quantity,
                unitPrice: parseFloat(values.price),
              };
            })
        );
      }
    });
  };

  const doesQtyExist = () => {
    for (let i = 0; i < sizes?.length; i++) {
      if (sizes[i].quantity > 0) {
        return true;
      }
    }
    return false;
  };

  const onCancel = () => {
    handleCancel();
    setProductId();
    form.resetFields();
    setSizes();
  };

  useEffect(() => {
    if (currentUser) {
      if (promoProducts) {
        setProducts(promoProducts);
      } else {
        getProducts();
      }
    }
  }, [currentUser]);

  useEffect(() => {
    if (productId) {
      getProductColorForImport(productId);
      getProductSizeForImport(productId);
    }
  }, [productId]);

  useEffect(() => {
    if (sizes) {
      if (doesQtyExist()) {
        setQtyErr(false);
      }
    }
  }, [sizes]);

  return (
    <Modal
      title={<ModalTitle text={"Add items"} />}
      open={open}
      onCancel={onCancel}
      centered
      width={700}
      footer={getModalFooter({ onCancel, handleOk })}
    >
      <Spin spinning={loading}>
        <Form form={form}>
          <table className="modal-table">
            <tbody>
              <tr>
                <th className="required">Product:</th>
                <td>
                  <Form.Item
                    name={"product"}
                    rules={[
                      {
                        required: true,
                        message: "Please select product",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      placeholder="Select product"
                      optionFilterProp="children"
                      onChange={setProductId}
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase()) ||
                        (option?.key ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      size="large"
                      loading={!products}
                      className="w-full"
                    >
                      {products?.map((p) => (
                        <Option
                          key={p.productId}
                          value={p.productId}
                          label={p.name}
                        >
                          <p className="font-inter text-[16px] mb-0 text-ellipsis overflow-hidden">{`${p.productId} | ${p.name}`}</p>
                        </Option>
                      ))}
                    </Select>
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
                <th className="required">Color:</th>
                <td>
                  <Form.Item
                    name={"color"}
                    rules={[
                      {
                        required: true,
                        message: "Please select color",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      placeholder="Select color"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      size="large"
                      loading={colorsLoading}
                      className="w-full"
                    >
                      {colors ? (
                        colors.map((color, i) => (
                          <Option
                            key={i}
                            value={color.colorId}
                            label={color.color}
                          >
                            <div className="row gap-x-[10px] font-inter font-[16px]">
                              <ColorIcon color={color.hex} />
                              <p className="mb-0 text-[18px]">{color.color}</p>
                            </div>
                          </Option>
                        ))
                      ) : (
                        <Option disabled>
                          <p className="mb-0 text-[18px]">
                            Please select product
                          </p>
                        </Option>
                      )}
                    </Select>
                  </Form.Item>
                </td>
              </tr>
              <tr>
                <th className="required align-top">Quantity:</th>
                <td>
                  <Spin spinning={sizesLoading}>
                    <div className="grid grid-cols-2 gap-4">
                      {sizes?.map((size, i) => (
                        <div key={i} className="row gap-x-1">
                          <h5
                            className="mb-0 font-inter font-medium text-center w-[72px] text-[18px]"
                            style={{ fontSize: size.size === "ONESIZE" && 16 }}
                          >
                            {size.size}
                          </h5>
                          <Quantity
                            size={size}
                            sizes={sizes}
                            setSizes={setSizes}
                          />
                        </div>
                      ))}
                    </div>
                  </Spin>
                  {qtyErr && (
                    <p className="text-[#ff4d4f] text-[16px] mt-1">
                      Please select at least 1 size
                    </p>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </Form>
      </Spin>
    </Modal>
  );
};

export default AddItemsModal;
