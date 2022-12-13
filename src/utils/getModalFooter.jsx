const getModalFooter = ({handleCancel,handleOk}) => [
  <button onClick={handleCancel} className="cancel-button">
    Cancel
  </button>,
  <button onClick={handleOk} className="confirm-button">Confirm</button>,
];

export default getModalFooter;