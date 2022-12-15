import React, { useState } from "react";
import MinusIcon from "../images/minus.svg";
import PlusIcon from "../images/plus.svg";

const Quantity = ({ custom = "", quantity=0 }) => {
  const [value, setValue] = useState(quantity);

  const handleMinusClick = () => {
    if (value > 0) setValue(value - 1);
  };

  const handlePlusClick = () => {
    setValue(value + 1);
  };

  const handleOnChange = (e) => {
    const value = e.target.value;
    if (isNaN(value) || value < 0) return;
    setValue(e.target.value);
  }

  return (
    <div className={`w-[114px] h-[45px] bg-[#F6F7F8] rounded-5 grid grid-cols-3 ${custom}`}>
      <button onClick={handleMinusClick}>
        <img src={MinusIcon} alt="Minus" className="m-auto" />
      </button>
      <input value={value} className="text-center bg-[#F6F7F8] font-inder text-[18px] text-[#262626]" onChange={(e)=>handleOnChange(e)}/>
      <button onClick={handlePlusClick}>
        <img src={PlusIcon} alt="Plus" className="m-auto" />
      </button>
    </div>
  );
};

export default Quantity;