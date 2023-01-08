import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Form, Input, Select, DatePicker, Spin } from "antd";
import { useSnackbar } from "notistack";
import dayjs from "dayjs";
import ModalTitle from "../../components/ModalTitle";
import appApi from "../../api/appApi";
import * as routes from "../../api/apiRoutes";
import getModalFooter from "../../utils/getModalFooter";
import roles from "../../utils/roles";

const { Option } = Select;

const AddStaffModal = ({ open, handleCancel, getStaff }) => {
  const [form] = Form.useForm();
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleOk = () => {
    form.validateFields().then((values) => {
      const date = new Date(values.start);
      addStaff(values.email, values.role, date.toISOString(), 1);
    });
  };

  const onCancel = () => {
    handleCancel();
    form.resetFields();
  }

  const handleSuccess = () => {
    enqueueSnackbar("Staff addded successfully!", { variant: "success" });
    onCancel();
    getStaff();
  };
  

  //Add staff
  const addStaff = async (email, role, start) => {
    setLoading(true);
    try {
      const token = currentUser.token;
      const result = await appApi.post(
        routes.ADD_STAFF,
        routes.getAddStaffBody(email, role, start, 1),
        routes.getAccessTokenHeader(token)
      );
      console.log(result);
      handleSuccess();
    } catch (err) {
      if (err.response) {
        if (err.response.data.message === "Staff existed in database")
          enqueueSnackbar(err.response.data.message, { variant: "error" });
        else handleSuccess();
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(err.message);
      }
    }
    setLoading(false);
  };

  return (
    <Modal
      title={<ModalTitle text="Add New Staff" />}
      open={open}
      onCancel={onCancel}
      centered
      confirmLoading={true}
      width={"40%"}
      footer={getModalFooter({ handleCancel: onCancel, handleOk })}
    >
      <Spin spinning={loading}>
        <Form form={form}>
          <table className="modal-table">
            <tbody>
              <tr>
                <th className="required">Email:</th>
                <td>
                  <Form.Item
                    name={"email"}
                    rules={[
                      {
                        required: true,
                        message: "Please enter email",
                      },
                      {
                        type: "email",
                        message: "This is not a valid email",
                      },
                    ]}
                  >
                    <Input className="input" />
                  </Form.Item>
                </td>
              </tr>
              <tr>
                <th className="required">Role:</th>
                <td>
                  <Form.Item
                    name={"role"}
                    rules={[
                      {
                        required: true,
                        message: "Please choose role",
                      },
                    ]}
                  >
                    <Select size="large" className="w-full">
                      {roles.map((role, i) => (
                        <Option key={i} value={role.value}>
                          <p
                            style={{ color: role.labelColor }}
                            className="select-option"
                          >
                            {role.title}
                          </p>
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </td>
              </tr>
              <tr>
                <th>Start At:</th>
                <td>
                  <Form.Item name="start" initialValue={dayjs()}>
                    <DatePicker className="input w-full" format="DD-MM-YYYY" />
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

export default AddStaffModal;
