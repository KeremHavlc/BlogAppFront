import React, { useState } from "react"; // useState eklendi
import {
  UserOutlined,
  CalendarOutlined,
  CommentOutlined,
  FileTextOutlined,
  SettingOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import AccountDeleteModal from "./AccountDeleteModal";
import AccountUpdateModal from "./AccountUpdateModal";
const UserInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  return (
    <>
      <div className="w-[1000px] h-[700px] border bg-white shadow-lg rounded-2xl p-8 flex flex-col justify-between">
        {/* Üst Bilgi */}
        <div className="flex items-center gap-6 border-b pb-6">
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-4xl">
            <UserOutlined />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">John Doe</h2>
            <p className="text-gray-500">@johndoe</p>
          </div>
        </div>

        {/* Kullanıcı İstatistikleri */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {/* Takipçi */}
          <div className="flex items-center gap-4 bg-blue-50 border border-blue-200 p-4 rounded-xl hover:shadow-md transition">
            <div className="p-2 bg-blue-100 rounded-full text-blue-600">
              <TeamOutlined className="text-2xl" />
            </div>
            <div>
              <div className="text-xl font-semibold">124</div>
              <div className="text-gray-500 text-sm">Takipçi</div>
            </div>
          </div>

          {/* Takip Edilen */}
          <div className="flex items-center gap-4 bg-green-50 border border-green-200 p-4 rounded-xl hover:shadow-md transition">
            <div className="p-2 bg-green-100 rounded-full text-green-600">
              <UserOutlined className="text-2xl" />
            </div>
            <div>
              <div className="text-xl font-semibold">98</div>
              <div className="text-gray-500 text-sm">Takip Edilen</div>
            </div>
          </div>

          {/* Hesap Açılış */}
          <div className="flex items-center gap-4 bg-purple-50 border border-purple-200 p-4 rounded-xl hover:shadow-md transition">
            <div className="p-2 bg-purple-100 rounded-full text-purple-600">
              <CalendarOutlined className="text-2xl" />
            </div>
            <div>
              <div className="text-md font-semibold">01.01.2023</div>
              <div className="text-gray-500 text-sm">Hesap Açılış</div>
            </div>
          </div>

          {/* Gönderi */}
          <div className="flex items-center gap-4 bg-indigo-50 border border-indigo-200 p-4 rounded-xl hover:shadow-md transition">
            <div className="p-2 bg-indigo-100 rounded-full text-indigo-600">
              <FileTextOutlined className="text-2xl" />
            </div>
            <div>
              <div className="text-xl font-semibold">45</div>
              <div className="text-gray-500 text-sm">Gönderi</div>
            </div>
          </div>

          {/* Yorum */}
          <div className="flex items-center gap-4 bg-pink-50 border border-pink-200 p-4 rounded-xl hover:shadow-md transition">
            <div className="p-2 bg-pink-100 rounded-full text-pink-600">
              <CommentOutlined className="text-2xl" />
            </div>
            <div>
              <div className="text-xl font-semibold">120</div>
              <div className="text-gray-500 text-sm">Yorum</div>
            </div>
          </div>
        </div>

        {/* Ayarlar */}
        <div className="mt-10 border-t pt-6 flex justify-between items-center">
          <div className="flex items-center gap-2 text-gray-600 cursor-pointer hover:text-blue-600 transition">
            <SettingOutlined />
            <span>Ayarlar</span>
          </div>
          <div className="space-x-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Hesabı Sil
            </button>
            <button
              onClick={() => setUpdateModalIsOpen(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Düzenle
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <AccountDeleteModal onClose={() => setIsModalOpen(false)} />
      )}
      {updateModalIsOpen && (
        <AccountUpdateModal onClose={() => setUpdateModalIsOpen(false)} />
      )}
    </>
  );
};

export default UserInfo;
