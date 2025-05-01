import React, { useState } from "react";
import {
  UserAddOutlined,
  GroupOutlined,
  BarChartOutlined,
  SendOutlined,
  DownOutlined,
  UpOutlined,
  UserOutlined,
  SettingOutlined,
  UnorderedListOutlined,
  AppstoreOutlined,
  PieChartOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { HiPlusCircle, HiViewList, HiCog } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const AdminLeftBar = () => {
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const toggleSubMenu = (menu) => {
    setOpenSubMenu(openSubMenu === menu ? null : menu);
  };
  const navigate = useNavigate();
  return (
    <div className="w-[270px] h-[777px] bg-gray-800 mt-4 rounded-tr-[20px] rounded-br-[20px] select-none">
      <div className="p-6 text-white">
        {/* Topluluk İşlemleri */}
        <div className="mb-4">
          <button
            onClick={() => toggleSubMenu("topluluk")}
            className="flex items-center justify-between gap-2 p-3 w-full rounded-md hover:bg-gray-600 transition duration-200"
          >
            <div className="flex items-center gap-2">
              <GroupOutlined className="text-xl" />
              <span className="text-lg font-medium">Topluluk İşlemleri</span>
            </div>
            {openSubMenu === "topluluk" ? <DownOutlined /> : <UpOutlined />}
          </button>
          {openSubMenu === "topluluk" && (
            <div className="submenu pl-6 mt-2">
              <button
                onClick={() => navigate("/addCommunity")}
                className="submenu-item p-2 hover:bg-gray-700 rounded-md font-medium transition duration-200 flex items-center gap-2"
              >
                <HiPlusCircle className="text-lg" />
                Yeni Topluluk Aç
              </button>
              <button
                onClick={() => navigate("/allCommunity")}
                className="submenu-item p-2 hover:bg-gray-700 rounded-md font-medium transition duration-200 flex items-center gap-2"
              >
                <HiViewList className="text-lg" />
                Toplulukları Listele
              </button>
              <button className="submenu-item p-2 hover:bg-gray-700 rounded-md font-medium transition duration-200 flex items-center gap-2">
                <HiCog className="text-lg" />
                Topluluk Ayarları
              </button>
            </div>
          )}
        </div>

        {/* Kullanıcı İşlemleri */}
        <div className="mb-4">
          <button
            onClick={() => toggleSubMenu("kullanici")}
            className="flex items-center justify-between gap-2 p-3 w-full rounded-md hover:bg-gray-600 transition duration-200"
          >
            <div className="flex items-center gap-2">
              <UserAddOutlined className="text-xl" />
              <span className="text-lg font-medium">Kullanıcı İşlemleri</span>
            </div>
            {openSubMenu === "kullanici" ? <DownOutlined /> : <UpOutlined />}
          </button>
          {openSubMenu === "kullanici" && (
            <div className="submenu pl-6 mt-2">
              <button className="submenu-item p-2 hover:bg-gray-700 rounded-md font-medium transition duration-200 flex items-center gap-2">
                <UnorderedListOutlined className="text-lg" />
                Kullanıcı Listesi
              </button>
              <button className="submenu-item p-2 hover:bg-gray-700 rounded-md font-medium transition duration-200 flex items-center gap-2">
                <SettingOutlined className="text-lg" />
                Kullanıcı Ayarları
              </button>
            </div>
          )}
        </div>

        {/* Gönderi İşlemleri */}
        <div className="mb-4">
          <button
            onClick={() => toggleSubMenu("gonderi")}
            className="flex items-center justify-between gap-2 p-3 w-full rounded-md hover:bg-gray-600 transition duration-200"
          >
            <div className="flex items-center gap-2">
              <SendOutlined className="text-xl" />
              <span className="text-lg font-medium">Gönderi İşlemleri</span>
            </div>
            {openSubMenu === "gonderi" ? <DownOutlined /> : <UpOutlined />}
          </button>
          {openSubMenu === "gonderi" && (
            <div className="submenu pl-6 mt-2">
              <button className="submenu-item p-2 hover:bg-gray-700 rounded-md font-medium transition duration-200 flex items-center gap-2">
                <MessageOutlined className="text-lg" />
                Gönderileri Listele
              </button>
              <button className="submenu-item p-2 hover:bg-gray-700 rounded-md font-medium transition duration-200 flex items-center gap-2">
                <SettingOutlined className="text-lg" />
                Gönderi Ayarları
              </button>
            </div>
          )}
        </div>

        {/* İstatistik Sayfası */}
        <div className="mb-4">
          <button
            onClick={() => toggleSubMenu("istatistik")}
            className="flex items-center justify-between gap-2 p-3 w-full rounded-md hover:bg-gray-600 transition duration-200"
          >
            <div className="flex items-center gap-2">
              <BarChartOutlined className="text-xl" />
              <span className="text-lg font-medium">İstatistik Sayfası</span>
            </div>
            {openSubMenu === "istatistik" ? <DownOutlined /> : <UpOutlined />}
          </button>
          {openSubMenu === "istatistik" && (
            <div className="submenu pl-6 mt-2">
              <button className="submenu-item p-2 hover:bg-gray-700 rounded-md font-medium transition duration-200 flex items-center gap-2">
                <UserOutlined className="text-lg" />
                Kullanıcı İstatistikleri
              </button>
              <button className="submenu-item p-2 hover:bg-gray-700 rounded-md font-medium transition duration-200 flex items-center gap-2">
                <AppstoreOutlined className="text-lg" />
                Topluluk İstatistikleri
              </button>
              <button className="submenu-item p-2 hover:bg-gray-700 rounded-md font-medium transition duration-200 flex items-center gap-2">
                <PieChartOutlined className="text-lg" />
                Gönderi İstatistikleri
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLeftBar;
