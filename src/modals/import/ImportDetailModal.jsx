import React from "react";
import { Divider, Modal } from "antd";
import ModalTitle from "../../components/ModalTitle";
import ImportDetailTable from "../../components/tables/ImportDetailTable";
import dayjs from "dayjs";
import getImportStatus from "../../utils/getImportStatus";

const ImportDetailModal = ({ open, handleCancel, currItem }) => {
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
                <td>{currItem?.id}</td>
              </tr>
              <tr>
                <th>Staff’s Name:</th>
                <td>{currItem?.staffName}</td>
              </tr>
              <tr>
                <th>Date:</th>
                <td>{dayjs(currItem?.date).format('DD/MM/YYYY')}</td>
              </tr>
            </tbody>
          </table>
          <table className="modal-table">
            <tbody>
              <tr>
                <th>Surcharge:</th>
                <td>{'$'+currItem?.surcharge}</td>
              </tr>
              <tr>
                <th>Total:</th>
                <td>{'$'+currItem?.total}</td>
              </tr>
              <tr>
                <th>Status:</th>
                <td style={{color:getImportStatus(currItem?.status).color}}>{getImportStatus(currItem?.status).text}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Divider />
        <ImportDetailTable currItem={currItem}/>
      </div>
    </Modal>
  );
};

export default ImportDetailModal;
