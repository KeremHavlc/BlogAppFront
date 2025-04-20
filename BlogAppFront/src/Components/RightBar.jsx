import { StarOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React from "react";

const RightBar = () => {
  return (
    <>
      <div className="w-[300px] h-[700px] bg-white border ml-[95px] mt-[50px] shadow-lg rounded-lg p-6 mr-[95px]">
        {/* Üst menü: Önerilen Topluluklar */}
        <div className="space-y-6 select-none">
          <div className="flex font-bold items-center gap-4 text-lg hover:text-red-500 cursor-pointer">
            <StarOutlined />
            <h2>Önerilen Topluluklar</h2>
          </div>

          {/* Topluluk 1 */}
          <div className="flex justify-between">
            <div>
              <Avatar size={38} icon={<UserOutlined />} />
            </div>
            <div className="flex flex-col w-[140px] overflow-hidden ml-4">
              <h6 className="text-ellipsis overflow-hidden whitespace-nowrap">
                Teknoloji
              </h6>
              <div className="flex">
                <TeamOutlined className="text-sm" />
                <h6>11</h6>
              </div>
            </div>
            <div>
              <button className="border w-[75px] h-[40px] decoration-dotted hover:bg-red-400">
                Katıl
              </button>
            </div>
          </div>

          {/* Topluluk 2 */}
          <div className="flex justify-between">
            <div>
              <Avatar size={38} icon={<UserOutlined />} />
            </div>
            <div className="flex flex-col w-[140px] overflow-hidden ml-4">
              <h6 className="text-ellipsis overflow-hidden whitespace-nowrap">
                Yazılım Geliştirme
              </h6>
              <div className="flex">
                <TeamOutlined className="text-sm" />
                <h6>20</h6>
              </div>
            </div>
            <div>
              <button className="border w-[75px] h-[40px] decoration-dotted hover:bg-red-400">
                Katıl
              </button>
            </div>
          </div>

          {/* Topluluk 3 */}
          <div className="flex justify-between">
            <div>
              <Avatar size={38} icon={<UserOutlined />} />
            </div>
            <div className="flex flex-col w-[140px] overflow-hidden ml-4">
              <h6 className="text-ellipsis overflow-hidden whitespace-nowrap">
                UI/UX Tasarım
              </h6>
              <div className="flex">
                <TeamOutlined className="text-sm" />
                <h6>7</h6>
              </div>
            </div>
            <div>
              <button className="border w-[75px] h-[40px] decoration-dotted hover:bg-red-400">
                Katıl
              </button>
            </div>
          </div>
        </div>

        {/* Ayraç */}
        <div className="border-t border-gray-300 w-[250px] my-10 select-none" />

        {/* Üst menü: Önerilen Kullanıcılar */}
        <div className="space-y-6 select-none">
          <div className="flex font-bold items-center gap-4 text-lg hover:text-red-500 cursor-pointer">
            <UserOutlined />
            <h2>Önerilen Kullanıcılar</h2>
          </div>

          {/* Kullanıcı 1 */}
          <div className="flex justify-between">
            <div>
              <Avatar size={38} icon={<UserOutlined />} />
            </div>
            <div className="flex flex-col w-[140px] overflow-hidden ml-4">
              <h6 className="text-ellipsis overflow-hidden whitespace-nowrap">
                John Doe
              </h6>
              <div className="flex">
                <TeamOutlined className="text-sm" />
                <h6>3 Takipçi</h6>
              </div>
            </div>
            <div>
              <button className="border w-[75px] h-[40px] decoration-dotted hover:bg-red-400">
                Takip Et
              </button>
            </div>
          </div>

          {/* Kullanıcı 2 */}
          <div className="flex justify-between">
            <div>
              <Avatar size={38} icon={<UserOutlined />} />
            </div>
            <div className="flex flex-col w-[140px] overflow-hidden ml-4">
              <h6 className="text-ellipsis overflow-hidden whitespace-nowrap">
                Alice Johnson
              </h6>
              <div className="flex">
                <TeamOutlined className="text-sm" />
                <h6>15 Takipçi</h6>
              </div>
            </div>
            <div>
              <button className="border w-[75px] h-[40px] decoration-dotted hover:bg-red-400">
                Takip Et
              </button>
            </div>
          </div>

          {/* Kullanıcı 3 */}
          <div className="flex justify-between">
            <div>
              <Avatar size={38} icon={<UserOutlined />} />
            </div>
            <div className="flex flex-col w-[140px] overflow-hidden ml-4">
              <h6 className="text-ellipsis overflow-hidden whitespace-nowrap">
                Bob Smith
              </h6>
              <div className="flex">
                <TeamOutlined className="text-sm" />
                <h6>5 Takipçi</h6>
              </div>
            </div>
            <div>
              <button className="border w-[75px] h-[40px] decoration-dotted hover:bg-red-400">
                Takip Et
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RightBar;
