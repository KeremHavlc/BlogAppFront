import React, { useState } from "react";
import {
  UserAddOutlined,
  GroupOutlined,
  BarChartOutlined,
  SendOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { HiPlusCircle, HiViewList, HiCog } from "react-icons/hi";
const AdminLeftBar = () => {
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const toggleSubMenu = (menu) => {
    if (openSubMenu === menu) {
      setOpenSubMenu(null);
    } else {
      setOpenSubMenu(menu);
    }
  };
  return (
    <div className="w-[270px] h-[777px] bg-gray-800 mt-4 rounded-tr-[20px] rounded-br-[20px] select-none">
      <div className="p-6 text-white">
        <div className="mb-4">
          <button
            onClick={() => toggleSubMenu("topluluk")}
            className="flex items-center gap-2 p-3 w-full rounded-md hover:bg-gray-600 transition duration-200"
          >
            <GroupOutlined className="text-xl" />
            <span className="text-lg font-medium">Topluluk İşlemleri</span>
            <span>
              {openSubMenu === "topluluk" ? <DownOutlined /> : <UpOutlined />}
            </span>
          </button>
          {openSubMenu === "topluluk" && (
            <div className="submenu pl-6">
              <button className="submenu-item p-2 hover:bg-gray-700 rounded-md font-medium transition duration-200 flex items-center gap-2">
                <HiPlusCircle className="text-lg" />
                Yeni Topluluk Aç
              </button>
              <button className="submenu-item p-2 hover:bg-gray-700 rounded-md font-medium transition duration-200 flex items-center gap-2">
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

        <div className="mb-4">
          <button className="flex items-center gap-4 p-3 w-full rounded-md hover:bg-gray-600 transition duration-200">
            <UserAddOutlined className="text-xl" />
            <span className="text-lg font-medium">Kullanıcı İşlemleri</span>
          </button>
        </div>

        <div className="mb-4">
          <button className="flex items-center gap-4 p-3 w-full rounded-md hover:bg-gray-600 transition duration-200">
            <SendOutlined className="text-xl" />
            <span className="text-lg font-medium">Gönderi İşlemleri</span>
          </button>
        </div>

        <div className="mb-4">
          <button className="flex items-center gap-4 p-3 w-full rounded-md hover:bg-gray-600 transition duration-200">
            <BarChartOutlined className="text-xl" />
            <span className="text-lg font-medium">İstatistik Sayfası</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLeftBar;
