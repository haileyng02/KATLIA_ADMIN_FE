import React from "react";
import { getRoleLabelAndColor } from "../utils/roles";

const RoleTag = (role) => {
  return (
    <button
      className="px-[7px] py-[2px] rounded-5 border-1 font-inter font-medium text-15 cursor-default"
      style={{
        borderColor: getRoleLabelAndColor(role?.role)?.color,
        color: getRoleLabelAndColor(role?.role)?.color,
      }}
    >
      {getRoleLabelAndColor(role?.role)?.label}
    </button>
  );
};

export default RoleTag;
