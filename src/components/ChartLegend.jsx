import React from "react";

const ChartLegend = ({ name, value, color }) => {
  return (
    <div className="flex gap-x-2">
      <div className={`w-[9px] h-[9px] rounded-full ${color} mt-[3px]`}></div>
      <div>
        <h3 className="font-semibold text-15 text-[#121212] opacity-70 mb-[10px]">
          {name}
        </h3>
        <p className="text-15 text-[#121212] opacity-70 mb-0">{`${value}%`}</p>
      </div>
    </div>
  );
};

export default ChartLegend;
