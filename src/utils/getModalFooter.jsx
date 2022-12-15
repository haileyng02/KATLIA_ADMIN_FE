const getModalFooter = ({handleCancel,handleOk}) => [
  <button key={'cancel'} onClick={handleCancel} className="cancel-button">
    Cancel
  </button>,
  <button key={'confirm'} onClick={handleOk} className="confirm-button">Confirm</button>,
];

export default getModalFooter;