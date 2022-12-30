import React from "react";
import upArrowIcon from "../images/arrow-up.svg";
import downArrowIcon from "../images/arrow-down.svg";

const StatisticCard = ({ title, value, percent }) => {
  return (
    <div className="bg-white rounded-[20px] py-[20px] pl-[30px] pr-[53px] grow flex-1">
      <>
        <h2 className="mb-0 font-semibold text-15">{title}</h2>
        <div className="between-row mt-[7px]">
          <>
            <p className="mb-0 font-bold text-30">{value}</p>
            {percent != null && (
              <div className="row gap-x-[11px]">
                <p
                  className={`mb-0 font-bold text-20 ${
                    percent >= 0 ? "text-[#14FF00]" : "text-[#FF0000]"
                  }`}
                >
                  {(percent >= 0 ? `+${percent}` : percent) + "%"}
                </p>
                <img src={percent >= 0 ? upArrowIcon : downArrowIcon} alt="arrow" />
              </div>
            )}
          </>
        </div>
      </>
    </div>
  );
};

export default StatisticCard;
