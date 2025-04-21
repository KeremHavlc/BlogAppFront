import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-white shadow-lg py-4 flex items-center justify-between border-b-2 px-8">
      {/* Logo */}
      <div
        onClick={() => navigate("/home")}
        className="w-[200px] select-none cursor-pointer flex items-center justify-start pl-16 text-4xl text-red-600 font-bold"
      >
        LOGO
      </div>

      {/* Arama kutusu */}
      <div className="flex-grow flex justify-center">
        <input
          type="text"
          className="w-[500px] h-[50px] bg-gray-200 border rounded-xl pl-5"
          placeholder="Kullanıcı Arayın..."
        />
      </div>

      {/* Profil */}
      <div
        onClick={() => navigate("/profile")}
        className="w-[200px] flex justify-end pr-16 cursor-pointer"
      >
        <div className="flex flex-col items-center">
          <Avatar
            size="large"
            icon={<UserOutlined />}
            className="hover:text-red-500"
          />
          <h2 className="mt-1">Profil</h2>
        </div>
      </div>
      <div
        onClick={() => navigate("/login")}
        className="flex flex-col items-center cursor-pointer"
      >
        <Avatar
          size="large"
          icon={<LogoutOutlined />}
          className="hover:text-red-500"
        />
        <h2 className="mt-1">Çıkış</h2>
      </div>
    </div>
  );
};

export default Header;
