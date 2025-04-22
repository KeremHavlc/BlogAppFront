import React, { useState } from "react";
import { HomeOutlined, UserOutlined, StarOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import AddPostModal from "./AddPostModal";

const LeftBar = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

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
        <div className="flex font-bold items-center gap-4 text-lg hover:text-red-500 cursor-pointer">
          <StarOutlined />
          <h2>Takip Edilenler</h2>
        </div>
      </div>

      {/* Ayraç */}
      <div className="border-t border-gray-300 w-[250px] my-10 select-none" />

      <div className="flex justify-center mt-[400px]">
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
          // Backend'e gönderme işlemleri buraya
        }}
      />
    </div>
  );
};

export default LeftBar;
