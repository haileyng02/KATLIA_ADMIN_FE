import React, { useState } from "react";
import { Form } from "antd";

const CountingTextArea = ({ maxLength }) => {
  const [count, setCount] = useState(0);
  const handleOnChange = (e) => {
    setCount(e.target.value.length);
  };
  return (
    <div>
      <Form.Item
        name={"textarea"}
      >
        <textarea
          maxLength={maxLength}
          onChange={(e) => handleOnChange(e)}
          className="border-1 border-customer-primary rounded-5 w-full h-[150px] p-3 outline-none focus:border-[2px] focus:border-customer-primary"
        />
      </Form.Item>
      <p className="font-inder text-[#00000066] text-20">
        <span className="text-[#C85A274D]">{count}</span>
        {`/${maxLength} characters`}
      </p>
    </div>
  );
};

export default CountingTextArea;
