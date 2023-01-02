import React from "react";
import MinusIcon from "../images/minus.svg";
import PlusIcon from "../images/plus.svg";

const Quantity = ({ custom = "", size, sizes, setSizes }) => {
  const handleMinusClick = () => {
    if (size.quantity > 0)
      setSizes(
        sizes.map((value) =>
          value.size === size.size
            ? { ...value, quantity: size.quantity - 1 }
            : value
        )
      );
  };

  const handlePlusClick = () => {
    setSizes(
      sizes.map((value) =>
        value.size === size.size
          ? { ...value, quantity: size.quantity + 1 }
          : value
      )
    );
  };

  const handleOnChange = (e) => {
    const quantity = e.target.value;
    if (isNaN(quantity) || quantity < 0) return;
    setSizes(
      sizes.map((value) =>
        value.size === size.size
          ? { ...value, quantity: parseInt(e.target.value) }
          : value
      )
    );
  };

  return (
    <div
      className={`w-[114px] h-[45px] bg-[#F6F7F8] rounded-5 grid grid-cols-3 ${custom}`}
    >
      <button onClick={handleMinusClick}>
        <img src={MinusIcon} alt="Minus" className="m-auto" />
      </button>
      <input
        value={size?.quantity}
        className="text-center bg-[#F6F7F8] font-inder text-[18px] text-[#262626]"
        onChange={(e) => handleOnChange(e)}
      />
      <button onClick={handlePlusClick}>
        <img src={PlusIcon} alt="Plus" className="m-auto" />
      </button>
    </div>
  );
};

export default Quantity;
