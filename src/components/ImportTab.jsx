import React from "react";
import { Divider, Form, Input } from "antd";
import ReadOnlySuffix from "./ReadOnlySuffix";
import DollarPrefix from "./DollarPrefix";
import ImportTable from "./tables/ImportTable";

const ImportTab = () => {
  return (
    <div className="tab-container">
      <Form className="flex gap-x-[9%]">
        <table className="modal-table">
          <tbody>
            <tr>
              <th>Import ID:</th>
              <td>
                <Form.Item>
                  <Input readOnly suffix={<ReadOnlySuffix />} className="input" />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="required">Surcharge:</th>
              <td>
                <Form.Item>
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
                <Form.Item>
                  <Input readOnly suffix={<ReadOnlySuffix />} className="input" />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th>Total:</th>
              <td>
                <Form.Item>
                  <Input
                    prefix={<DollarPrefix />}
                    readOnly suffix={<ReadOnlySuffix />}
                    className="input"
                  />
                </Form.Item>
              </td>
            </tr>
          </tbody>
        </table>
      </Form>
      <Divider />
      <div className="row gap-x-5 justify-end">
        <button className="w-[189px] h-[34px] rounded-5 bg-secondary text-white font-inter font-bold text-15">
          CONFIRM IMPORT
        </button>
        <button className="import-button border-customer-primary text-customer-primary">
          Add items
        </button>
        <button className="import-button border-[#FF0000] text-[#FF0000]">
          Delete All
        </button>
      </div>
      <ImportTable />
    </div>
  );
};

export default ImportTab;
