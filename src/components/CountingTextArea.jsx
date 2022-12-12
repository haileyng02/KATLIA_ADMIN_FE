import React, { useState } from "react";

const CountingTextArea = ({ maxLength }) => {
  const [count, setCount] = useState(0);
  const handleOnChange = (e) => {
    setCount(e.target.value.length)
  }
  return (
    <div>
      <textarea
        maxLength={maxLength}
        onChange={(e)=>handleOnChange(e)}
        className="border-1 border-customer-primary rounded-5 w-full h-[150px] p-3 outline-none focus:border-[2px] focus:border-customer-primary"
      />
      <p className="font-inder text-[#00000066]">
        <span className="text-[#C85A274D]">{count}</span>
        {`/${maxLength} characters`}
      </p>
    </div>
  );
};

export default CountingTextArea;
