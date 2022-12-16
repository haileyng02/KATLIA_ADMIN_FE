import React, { useEffect, useState } from "react";
import { Modal, Form, Input, DatePicker, TimePicker } from "antd";
import dayjs from "dayjs";
import ModalTitle from "../../components/ModalTitle";
import ReadOnlySuffix from "../../components/ReadOnlySuffix";
import getModalFooter from "../../utils/getModalFooter";

const AddDiscountModal = ({ open, handleCancel, currentItem }) => {
  const [form] = Form.useForm();
  const [readOnly, setReadOnly] = useState(false);

  const readOnlyProps = {
    readOnly: readOnly,
    suffix: readOnly ? <ReadOnlySuffix /> : null,
  };
  const dateTimeProps = { disabled: readOnly };

  useEffect(() => {
    if (!open) return;
    setReadOnly(false);
    if (currentItem) {
      form.setFieldsValue({
        name: currentItem.name,
        percent: currentItem.percent,
        startDate: dayjs(currentItem.start.split(" ")[1], "DD-MM-YYYY"),
        startTime: dayjs(currentItem.start.split(" ")[0], "HH:mm"),
        endDate: dayjs(currentItem.end.split(" ")[1], "DD-MM-YYYY"),
        endTime: dayjs(currentItem.end.split(" ")[0], "HH:mm"),
      });
      if (dayjs(currentItem.start, "HH:mm DD-MM-YYYY") < dayjs()) {
        setReadOnly(true);
      }
    } else {
      form.resetFields();
    }
  }, [currentItem, form, open]);

  return (
    <Modal
      title={
        <ModalTitle text={currentItem ? "Edit Discount" : "Add Discount"} />
      }
      open={open}
      onCancel={() => handleCancel()}
      centered
      width={"40%"}
      footer={getModalFooter({ handleCancel })}
    >
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
                  <Input {...readOnlyProps} className="input" />
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
                  <Input {...readOnlyProps} className="input" />
                </Form.Item>
              </td>
              <td className="font-inter font-medium">%</td>
            </tr>
            <tr>
              <th className="required">Start At:</th>
              <td>
                <Form.Item name="startDate" initialValue={dayjs()}>
                  <DatePicker
                    className="input w-full"
                    format="DD-MM-YYYY"
                    {...dateTimeProps}
                  />
                </Form.Item>
              </td>
              <td>
                <Form.Item
                  name="startTime"
                  initialValue={dayjs("00:00", "HH:mm")}
                >
                  <TimePicker
                    format={"HH:mm"}
                    className="input w-full"
                    {...dateTimeProps}
                  />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="required">End At:</th>
              <td>
                <Form.Item name="endDate" initialValue={dayjs()}>
                  <DatePicker
                    className="input w-full"
                    format="DD-MM-YYYY"
                    {...dateTimeProps}
                  />
                </Form.Item>
              </td>
              <td>
                <Form.Item
                  name="endTime"
                  initialValue={dayjs("00:00", "HH:mm")}
                >
                  <TimePicker
                    format={"HH:mm"}
                    className="input w-full"
                    {...dateTimeProps}
                  />
                </Form.Item>
              </td>
            </tr>
          </tbody>
        </table>
      </Form>
    </Modal>
  );
};

export default AddDiscountModal;
