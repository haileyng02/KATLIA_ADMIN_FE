import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Divider, Form, Input, Spin } from "antd";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";
import ReadOnlySuffix from "./ReadOnlySuffix";
import DollarPrefix from "./DollarPrefix";
import ImportTable from "./tables/ImportTable";
import AddItemsModal from "../modals/import/AddItemsModal";

const ImportTab = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [form] = Form.useForm();
  const [addOpen, setAddOpen] = useState(false);
  const [info, setInfo] = useState();
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [data,setData] = useState();

  //Get import form info
  const getImportFormInfo = async () => {
    setLoading(true);
    try {
      const token = currentUser.token;
      const result = await appApi.get(
        routes.IMPORT_FORM_INFO,
        routes.getAccessTokenHeader(token)
      );
      console.log(result.data);
      setInfo(result.data);
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

  //Get items in existing form
  const getItemsInExistingForm = async () => {
    setTableLoading(true);
    try {
      const token = currentUser.token;
      const result = await appApi.get(
        routes.ITEMS_IN_EXISTING_FORM,
        routes.getAccessTokenHeader(token)
      );
      setData(result.data);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
      } else {
        console.log(err.message)
      }
    }
    setTableLoading(false);
  }

  useEffect(() => {
    if (currentUser) {
      getImportFormInfo();
      getItemsInExistingForm();
    }
  }, [currentUser]);

  useEffect(() => {
    if (info) {
      form.setFieldsValue({
        id: info.id,
        surcharge: info.surcharge ?? 0,
        staffName: info.staffName,
        total: info.total.toFixed(2),
      });
    }
  }, [info]);

  return (
    <div className="tab-container">
      <Spin spinning={loading}>
        <Form form={form} className="flex gap-x-[9%]">
          <table className="modal-table">
            <tbody>
              <tr>
                <th>Import ID:</th>
                <td>
                  <Form.Item name={"id"}>
                    <Input
                      readOnly
                      suffix={<ReadOnlySuffix />}
                      className="input"
                    />
                  </Form.Item>
                </td>
              </tr>
              <tr>
                <th className="required">Surcharge:</th>
                <td>
                  <Form.Item name={"surcharge"}>
                    <Input prefix={<DollarPrefix />} className="input" />
                  </Form.Item>
                </td>
              </tr>
            </tbody>
          </table>
          <table className="modal-table">
            <tbody>
              <tr>
                <th>Staff’s Name:</th>
                <td>
                  <Form.Item name={"staffName"}>
                    <Input
                      readOnly
                      suffix={<ReadOnlySuffix />}
                      className="input"
                    />
                  </Form.Item>
                </td>
              </tr>
              <tr>
                <th>Total:</th>
                <td>
                  <Form.Item name={"total"}>
                    <Input
                      prefix={<DollarPrefix />}
                      readOnly
                      suffix={<ReadOnlySuffix />}
                      className="input"
                    />
                  </Form.Item>
                </td>
              </tr>
            </tbody>
          </table>
        </Form>
      </Spin>
      <Divider />
      <div className="row gap-x-5 justify-end">
        <button className="w-[189px] h-[34px] rounded-5 bg-secondary text-white font-inter font-bold text-15">
          CONFIRM IMPORT
        </button>
        <button
          onClick={() => setAddOpen(true)}
          className="import-button border-customer-primary text-customer-primary"
        >
          Add items
        </button>
        <button className="import-button border-[#FF0000] text-[#FF0000]">
          Delete All
        </button>
      </div>
      <ImportTable data={data} loading={tableLoading}/>
      <AddItemsModal
        open={addOpen}
        handleCancel={() => setAddOpen(false)}
        currentUser={currentUser}
        getItemsInExistingForm={getItemsInExistingForm}
      />
    </div>
  );
};

export default ImportTab;
