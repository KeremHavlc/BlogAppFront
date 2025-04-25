import React, { useEffect, useState } from "react";
import { UserOutlined, BellOutlined, LogoutOutlined } from "@ant-design/icons";
import { Avatar, Badge } from "antd";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [userId, setUserId] = useState();
  const navigate = useNavigate();

  const pendingRequests = 3;
  const getUserFromToken = () => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("authToken="))
        ?.split("=")[1];

      if (!token) return null;

      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserId(payload?.id);
      return payload?.id;
    } catch (err) {
      console.error("JWT decode hatası:", err);
      return null;
    }
  };
  useEffect(() => {
    getUserFromToken();
  }, []);

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

      {/* Bekleyen İstekler */}
      <div
        onClick={() => navigate(`/pending-requests/${userId}`)}
        className="flex flex-col items-center cursor-pointer pr-4"
      >
        <Badge count={pendingRequests} size="small" offset={[2, 0]}>
          <Avatar
            size="large"
            icon={<BellOutlined />}
            className="hover:text-red-500"
          />
        </Badge>
        <h2 className="mt-1 text-sm">İstekler</h2>
      </div>

      {/* Profil */}
      <div
        onClick={() => navigate("/profile")}
        className=" flex justify-end pr-4 cursor-pointer"
      >
        <div className="flex flex-col items-center">
          <Avatar
            size="large"
            icon={<UserOutlined />}
            className="hover:text-red-500"
          />
          <h2 className="mt-1 text-sm">Profil</h2>
        </div>
      </div>

      {/* Çıkış */}
      <div
        onClick={() => navigate("/login")}
        className="flex flex-col items-center cursor-pointer"
      >
        <Avatar
          size="large"
          icon={<LogoutOutlined />}
          className="hover:text-red-500"
        />
        <h2 className="mt-1 text-sm">Çıkış</h2>
      </div>
    </div>
  );
};

export default Header;
