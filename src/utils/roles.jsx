const roles = [
  { value: "ADMIN", title: "Admin", labelColor: "rgba(253, 56, 56, 0.9)" },
  { value: "SALES", title: "Sales", labelColor: "#F59607" },
  { value: "STORAGE", title: "Storage", labelColor: "#4169E1" },
];

export const getRoleLabelAndColor = (role) => {
  switch (role) {
    case "ADMIN":
      return {
        label: "Admin",
        color: "rgba(253, 56, 56, 0.9)",
      };
    case "SALES":
      return {
        label: "Sales",
        color: "#F59607",
      };
    case "STORAGE":
      return {
        label: "Storage",
        color: "#4169E1",
      };
    case "CUSTOMER":
      return {
        label: "Customer",
        color: "#60BE80",
      };
    default:
      return null;
  }
};

export default roles;
