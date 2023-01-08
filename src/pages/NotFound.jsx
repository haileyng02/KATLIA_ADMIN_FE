import React from "react";
import { useNavigate } from "react-router";
import ghostImage from "../images/ghost.svg";

const NotFound = () => {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate("/");
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <img src={ghostImage} alt="Not found" />
      <h1 className="font-extrabold text-[40px] text-[#2C2B2B] mt-[40px]">
        Oops, This Page Could Not Be Found.
      </h1>
      <p className="font-extrabold text-[20px] text-[#908D8D] mt-[20px]">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily inaccessible.
      </p>
      <button
        onClick={handleReturn}
        className="mt-[30px] w-[220px] h-[56px] bg-customer-primary rounded-[41px] text-[14px] text-white font-montserrat font-medium drop-shadow-[0_4px_24px_rgba(0,0,0,0.3064)] hover:bg-customer-secondary"
      >
        RETURN
      </button>
    </div>
  );
};

export default NotFound;
