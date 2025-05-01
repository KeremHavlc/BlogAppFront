import React, { useEffect, useState } from "react";
import {
  HomeOutlined,
  UserOutlined,
  StarOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import AddPostModal from "./AddPostModal";

const LeftBar = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const [userData, setUserData] = useState(null);
  const getUserFromToken = () => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("authToken="))
        ?.split("=")[1];

      if (!token) return null;

      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserData(payload?.id);
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
    <div className="w-[300px] h-[700px] bg-white border ml-[95px] mt-[50px] shadow-lg rounded-lg p-6">
      {/* Üst menü */}
      <div className="space-y-6 select-none">
        <div
          onClick={() => navigate("/home")}
          className="flex font-bold items-center gap-4 text-lg hover:text-red-500 cursor-pointer "
        >
          <HomeOutlined />
          <h2>Ana Sayfa</h2>
        </div>
        <div
          onClick={() => navigate("/profile")}
          className="flex font-bold items-center gap-4 text-lg hover:text-red-500 cursor-pointer"
        >
          <UserOutlined />
          <h2>Profil</h2>
        </div>
        <div
          onClick={() => navigate(`/friendships/${userData}`)}
          className="flex font-bold items-center gap-4 text-lg hover:text-red-500 cursor-pointer"
        >
          <StarOutlined />
          <h2>Takip Edilenler</h2>
        </div>
        <div
          onClick={() => navigate(`/communities`)}
          className="flex font-bold items-center gap-4 text-lg hover:text-red-500 cursor-pointer"
        >
          <TeamOutlined />
          <h2>Topluluklar</h2>
        </div>
      </div>

      {/* Ayraç */}
      <div className="border-t border-gray-300 w-[250px] my-10 select-none" />

      <div className="flex justify-center mt-[370px]">
        <button
          className="w-[180px] h-[45px] bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl shadow-md transition-all duration-200"
          onClick={() => setModalOpen(true)}
        >
          Gönderi Ekle
        </button>
      </div>

      <AddPostModal
        visible={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={(data) => {
          console.log("Gönderilen data:", data);
        }}
      />
    </div>
  );
};

export default LeftBar;
