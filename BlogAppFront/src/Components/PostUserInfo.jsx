import React from "react";
import {
  UserOutlined,
  CalendarOutlined,
  TeamOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";

const PostUserInfo = () => {
  return (
    <div className="w-[300px] h-auto bg-white border mr-[95px] ml-[95px] mt-[50px] shadow-lg rounded-2xl p-6 select-none">
      {/* Kullanıcı Bilgileri */}
      <div className="flex flex-col items-center text-center mb-6">
        <Avatar size={80} icon={<UserOutlined />} className="mb-2" />
        <h2 className="text-xl font-semibold text-gray-800">DemoUser</h2>
        <p className="text-sm text-gray-500">@demouser</p>
      </div>

      {/* Diğer Bilgiler */}
      <div className="space-y-4 text-gray-700">
        <div className="flex items-center gap-3">
          <CalendarOutlined className="text-red-400 text-lg" />
          <span>Katılma: 12 Mart 2024</span>
        </div>

        <div className="flex items-center gap-3">
          <TeamOutlined className="text-blue-500 text-lg" />
          <span>Takip Edilen: 150</span>
        </div>

        <div className="flex items-center gap-3">
          <FileTextOutlined className="text-green-500 text-lg" />
          <span>Gönderiler: 34</span>
        </div>
      </div>

      {/* Takip Et Butonu */}
      <div className="mt-6 flex justify-center">
        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition font-medium">
          Takip Et
        </button>
      </div>
    </div>
  );
};

export default PostUserInfo;
