import React from "react";

const ColorIcon = ({ color, size }) => {
  return (
    <div className={`${size ?? 'w-5 h-5'} rounded-full border-black50 border-1`} style={{ backgroundColor: color }} />
  );
};

export default ColorIcon;
