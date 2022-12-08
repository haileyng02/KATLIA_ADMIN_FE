const getRole = (role) => {
  switch (role) {
    case "Admin":
      return (
        <p className={"table-cell-medium"} style={{ color: "rgba(253, 56, 56, 0.9)" }}>
          {role}
        </p>
      );
    case "Customer":
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
