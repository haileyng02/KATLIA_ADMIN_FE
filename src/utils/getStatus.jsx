const getStatus = (status) => {
  switch (status) {
    case "Completed":
      return (
        <center>
          <p className={"table-cell text-[#60BE80]"}>{status}</p>
        </center>
      );
    case "Pending":
      return (
        <center>
          <p className={"table-cell text-[#F59607]"}>{status}</p>
        </center>
      );
    case "Canceled":
      return (
        <center>
          <p className={"table-cell text-[#FA4E28]"}>{status}</p>
        </center>
      );
    default:
      return null;
  }
};

export default getStatus;
