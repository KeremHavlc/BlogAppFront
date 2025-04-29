import React from "react";
import { useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const navigate = useNavigate();
  return (
    <header className="flex items-center justify-between select-none bg-gray-800 text-white border-b-2 h-[100px] shadow-lg pl-10 pr-10">
      <h1 onClick={() => navigate("/adminhome")} className="text-2xl font-bold">
        Admin Paneli
      </h1>

      <div className="flex items-center gap-4">
        <div className="w-[140px] h-auto border shadow-lg bg-white rounded-lg">
          <span className="text-base flex justify-center text-black">
            Hoş geldin, Admin
          </span>
        </div>
        <button
          onClick={() => {
            document.cookie =
              "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.location.href = "/login";
          }}
          className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded-md transition text-sm"
        >
          Çıkış Yap
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
