import React from "react";
import { Tooltip } from "antd";
import readOnlyIcon from '../images/read-only.svg'

const ReadOnlySuffix = () => {
  return (
    <Tooltip title="Read only">
      <img src={readOnlyIcon} alt="Read only"></img>
    </Tooltip>
  );
};

export default ReadOnlySuffix;
