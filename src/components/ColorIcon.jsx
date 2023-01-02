import React from "react";

const ColorIcon = ({ color, size, handleChooseColor, currColor }) => {
  return (
    <div
      className={`${
        size ?? "w-5 h-5"
      } rounded-full border-black50 border-1 cursor-pointer ${
        currColor?.hex === color && "outline outline-offset-2 outline-2 outline-customer-primary"
      } ${currColor && 'hover:outline hover:outline-offset-2 hover:outline-2 hover:outline-customer-primary'}`}
      style={{ backgroundColor: color }}
      onClick={handleChooseColor}
    />
  );
};

export default ColorIcon;
