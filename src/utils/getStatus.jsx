const getStatus = (status) => {
  switch (status) {
    case 0:
      return (
        <center>
          <p className={"table-cell text-[#696969]"}>Cart</p>
        </center>
      );
    case 1:
      return (
        <center>
          <p className={"table-cell text-[#694BDB]"}>Ordered</p>
        </center>
      );
    case 2:
      return (
        <center>
          <p className={"table-cell text-[#F59607]"}>Confirmed</p>
        </center>
      );
    case 3:
      return (
        <center>
          <p className={"table-cell text-[#43CCF8]"}>Shipping</p>
        </center>
      );
    case 4:
      return (
        <center>
          <p className={"table-cell text-[#60BE80]"}>Arrived</p>
        </center>
      );
    case 5:
      return (
        <center>
          <p className={"table-cell text-[#FA4E28]"}>Canceled</p>
        </center>
      );
    default:
      return null;
  }
};

export const getOrderStatusText = (statusID) => {
    switch (statusID) {
        case 0:
            return "Cart";
        case 1:
            return "Ordered";
        case 2:
            return "Confirmed";
        case 3:
            return "Shipping";
        case 4:
            return "Arrived";
        case 5:
            return "Canceled";
        default:
    }
};

export default getStatus;
