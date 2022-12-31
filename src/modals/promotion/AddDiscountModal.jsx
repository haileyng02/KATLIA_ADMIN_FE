import React, { useEffect, useState } from "react";
import { Modal, Form, Input, DatePicker, InputNumber, Spin } from "antd";
import dayjs from "dayjs";
import { useSnackbar } from "notistack";
import ModalTitle from "../../components/ModalTitle";
import appApi from "../../api/appApi";
import * as routes from "../../api/apiRoutes";
import getReadOnlyProps from "../../utils/readOnlyProps";
import getModalFooter from "../../utils/getModalFooter";
import toTitleCase from "../../utils/toTitleCase";

const AddDiscountModal = ({
  open,
  handleCancel,
  currentItem,
  currentUser,
  getAllDiscountList,
}) => {
  const [form] = Form.useForm();
  const { enqueueSnackbar } = useSnackbar();
  const [readOnly, setReadOnly] = useState(false);
  const [loading, setLoading] = useState(false);

  const dateTimeProps = { disabled: readOnly };

  useEffect(() => {
    if (!open) return;
    setReadOnly(false);
    if (currentItem) {
      form.setFieldsValue({
        name: currentItem.discountName,
        percent: currentItem.percent,
        start: dayjs(currentItem.startAt),
        end: dayjs(currentItem.endAt),
      });
      if (dayjs(currentItem.start, "HH:mm DD-MM-YYYY") < dayjs()) {
        setReadOnly(true);
      }
    } else {
      form.resetFields();
    }
  }, [currentItem, form, open]);

  //Add new discount
  const addNewDiscount = async (discountName, percent, startAt, endAt) => {
    setLoading(true);
    try {
      const token = currentUser.token;
      const result = await appApi.post(
        routes.ADD_NEW_DISCOUNT,
        routes.getAddNewDiscountBody(discountName, percent, startAt, endAt),
        routes.getAccessTokenHeader(token)
      );
      console.log(result);
      enqueueSnackbar("New discount added!", { variant: "success" });
      handleCancel();
      getAllDiscountList();
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

  //Edit discount info
  const editDiscountInfo = async (discountName, percent, startAt, endAt) => {
    setLoading(true);
    try {
      const token = currentUser.token;
      const result = await appApi.patch(
        routes.EDIT_DISCOUNT_INFO(currentItem.id),
        routes.getAddNewDiscountBody(discountName, percent, startAt, endAt),
        {
          ...routes.getAccessTokenHeader(token),
          ...routes.getEditDiscountInfoIdParams(currentItem.id),
        }
      );
      console.log(result);
      enqueueSnackbar("Discount edited successfully!", { variant: "success" });
      handleCancel();
      getAllDiscountList();
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
      const start = new Date(values.start);
      const end = new Date(values.end);
      if (currentItem) {
        editDiscountInfo(
          toTitleCase(values.name),
          values.percent,
          start.toISOString(),
          end.toISOString()
        );
      } else {
        addNewDiscount(
          toTitleCase(values.name),
          values.percent,
          start.toISOString(),
          end.toISOString()
        );
      }
    });
  };

  return (
    <Modal
      title={
        <ModalTitle text={currentItem ? "Edit Discount" : "Add Discount"} />
      }
      open={open}
      onCancel={() => handleCancel()}
      centered
      width={"40%"}
      footer={getModalFooter({ handleCancel, handleOk })}
    >
      <Spin spinning={loading}>
        <Form form={form}>
          <table className="modal-table">
            <tbody>
              <tr>
                <th className="required">Name:</th>
                <td colSpan={2}>
                  <Form.Item
                    name={"name"}
                    rules={[
                      {
                        required: true,
                        message: "Please enter discount name",
                      },
                    ]}
                  >
                    <Input
                      {...getReadOnlyProps(readOnly)}
                      className="input capitalize"
                    />
                  </Form.Item>
                </td>
              </tr>
              <tr>
                <th className="required">Percent:</th>
                <td>
                  <Form.Item
                    name={"percent"}
                    rules={[
                      {
                        required: true,
                        message: "Please enter discount percent",
                      },
                    ]}
                  >
                    <InputNumber
                      controls={false}
                      {...getReadOnlyProps(readOnly)}
                      className="input w-full"
                    />
                  </Form.Item>
                </td>
                <td className="font-inter font-medium">%</td>
              </tr>
              <tr>
                <th className="required">Start At:</th>
                <td colSpan={2}>
                  <Form.Item
                    name="start"
                    initialValue={dayjs("00:00", "HH:mm")}
                    rules={[
                      {
                        message: "Only future date accepted.",
                        validator: (_, value) => {
                          if (dayjs(value).isAfter(dayjs())) {
                            return Promise.resolve();
                          } else {
                            return Promise.reject();
                          }
                        },
                      },
                    ]}
                  >
                    <DatePicker
                      className="input w-full"
                      format="DD-MM-YYYY HH:mm"
                      {...dateTimeProps}
                      showTime
                    />
                  </Form.Item>
                </td>
              </tr>
              <tr>
                <th className="required">End At:</th>
                <td colSpan={2}>
                  <Form.Item
                    name="end"
                    initialValue={dayjs("00:00", "HH:mm")}
                    rules={[
                      {
                        message: "End time must be after start time.",
                        validator: (_, value) => {
                          if (
                            dayjs(value).isAfter(
                              dayjs(form.getFieldValue("start"))
                            )
                          ) {
                            return Promise.resolve();
                          } else {
                            return Promise.reject();
                          }
                        },
                      },
                    ]}
                  >
                    <DatePicker
                      className="input w-full"
                      format="DD-MM-YYYY HH:mm"
                      {...dateTimeProps}
                      showTime
                    />
                  </Form.Item>
                </td>
              </tr>
            </tbody>
          </table>
        </Form>
      </Spin>
    </Modal>
  );
};

export default AddDiscountModal;
