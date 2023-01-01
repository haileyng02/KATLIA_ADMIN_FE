const getRole = (role) => {
  switch (role) {
    case "ADMIN":
      return (
        <p
          className={"table-cell-medium"}
          style={{ color: "rgba(253, 56, 56, 0.9)" }}
        >
          {role}
        </p>
      );
    case "SALES":
      return (
        <p className={"table-cell-medium"} style={{ color: "#F59607" }}>
          {role}
        </p>
      );
    case "STORAGE":
      return (
        <p className={"table-cell-medium"} style={{ color: "#4169E1" }}>
          {role}
        </p>
      );

    case "CUSTOMER":
      return (
        <p className={"table-cell-medium"} style={{ color: "#60BE80" }}>
          {role}
        </p>
      );
    default:
      return null;
  }
};

export default getRole;
