import React, { useEffect, useState } from "react";
import { Form, Modal, Select, Spin } from "antd";
import { useSnackbar } from "notistack";
import ModalTitle from "../../components/ModalTitle";
import appApi from "../../api/appApi";
import * as routes from "../../api/apiRoutes";
import getModalFooter from "../../utils/getModalFooter";
import roles from "../../utils/roles";
import status from "../../utils/staffStatus";

const { Option } = Select;

const ActionModal = ({
  open,
  handleCancel,
  currentStaff,
  currentUser,
  getStaff,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (currentStaff) {
      form.setFieldsValue({
        role: currentStaff.role,
        status: currentStaff.status,
      });
    }
  }, [open, currentStaff]);

  //Update staff
  const updateStaff = async (role, statusId) => {
    setLoading(true);
    try {
      const token = currentUser.token;
      const result = await appApi.put(
        routes.UPDATE_STAFF(currentStaff.userId),
        routes.getAddStaffBody(
          currentStaff.email,
          role,
          currentStaff.startAt,
          statusId
        ),
        {
          ...routes.getAccessTokenHeader(token),
          ...routes.getUpdateStaffIdParams(currentStaff.userId),
        }
      );
      enqueueSnackbar("Updated staff successfully!", { variant: "success" });
      handleCancel();
      getStaff();
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
    setLoading(false);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      updateStaff(values.role, values.status);
    });
  };

  return (
    <Modal
      title={<ModalTitle text="Action" />}
      open={open}
      onCancel={handleCancel}
      centered
      width={"40%"}
      footer={getModalFooter({ handleCancel, handleOk })}
    >
      <Spin spinning={loading}>
        <Form form={form}>
          <table className="modal-table">
            <tbody>
              <tr>
                <th>Change Role:</th>
                <td>
                  <Form.Item name={"role"}>
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
                <th>Change Status:</th>
                <td>
                  <Form.Item name={"status"}>
                    <Select size="large" className="w-full">
                      {status.map((status, i) => (
                        <Option key={i} value={status.value}>
                          <p
                            style={{ color: status.labelColor }}
                            className="select-option"
                          >
                            {status.title}
                          </p>
                        </Option>
                      ))}
                    </Select>
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

export default ActionModal;
