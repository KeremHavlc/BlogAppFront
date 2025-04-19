import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full h-[300px] text-white bg-black text-4xl flex justify-center items-center">
        LANDING PAGE
      </div>
      <button
        className="w-full h-[300px] text-white bg-green-500 text-4xl flex justify-center items-center"
        onClick={() => navigate("/home")}
      >
        ANA SAYFA
      </button>
    </>
  );
};

export default LandingPage;
