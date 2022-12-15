import React from "react";
import { Divider, Modal } from "antd";
import ModalTitle from "../../components/ModalTitle";
import ColorIcon from "../../components/ColorIcon";
import ImportDetailTable from "../../components/tables/ImportDetailTable";

const data = {
  id: 327842,
  staffName: "Basic Knit Sweater",
  date: "17/10/2022",
  surcharge: 54,
  total: 54,
  status: "Completed",
};

const ImportDetailModal = ({ open, handleCancel }) => {
  return (
    <Modal
      title={<ModalTitle text={"Import Detail"} />}
      open={open}
      onCancel={handleCancel}
      centered
      footer={null}
      width={1000}
    >
      <div className="overflow-modal">
        <div className="flex">
          <table className="modal-table">
            <tbody>
              <tr>
                <th>Import ID:</th>
                <td>{data.id}</td>
              </tr>
              <tr>
                <th>Staff’s Name:</th>
                <td>{data.staffName}</td>
              </tr>
              <tr>
                <th>Date:</th>
                <td>{data.date}</td>
              </tr>
            </tbody>
          </table>
          <table className="modal-table">
            <tbody>
              <tr>
                <th>Surcharge:</th>
                <td>{data.surcharge}</td>
              </tr>
              <tr>
                <th>Total:</th>
                <td>{data.total}</td>
              </tr>
              <tr>
                <th>Status:</th>
                <td className="text-[#60BE80]">{data.status}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Divider />
        <ImportDetailTable />
      </div>
    </Modal>
  );
};

export default ImportDetailModal;
