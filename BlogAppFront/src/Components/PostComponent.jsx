import {
  LikeFilled,
  LikeOutlined,
  MessageOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";
import React, { useState } from "react";
import photo from "../assets/photo.png";
const PostComponent = () => {
  const [liked, setLiked] = useState(false);

  return (
    <>
      <div className="w-[800px] h-[680px] border ml-[120px] mb-[100px] mt-[28px] bg-white rounded-lg shadow-md hover:shadow-2xl">
        {/* Üst Kısım */}
        <div className="mt-[20px] ml-[19px] flex justify-between">
          <div className="flex gap-2">
            <Avatar size="large" icon={<UserOutlined />} />
            <h2 className="text-lg font-bold mt-1">DemoUser</h2>
          </div>
          <div className="mr-[50px]">
            <h2>6 Gün Önce</h2>
          </div>
        </div>

        {/* Fotoğraf */}
        <div className="border w-[700px] h-[400px] ml-[50px] mt-4">
          <img
            src={photo}
            alt="Post görseli"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Açıklama */}
        <div className="mt-[85px]">
          <div className="w-[700px] ml-[50px]">
            <h5 className="font-Amatic line-clamp-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum,
              error similique a quibusdam ducimus at quidem aperiam impedit vel,
              suscipit, placeat quis totam adipisci ipsa. Debitis similique quam
              voluptate fuga?
            </h5>
          </div>
        </div>

        {/* Beğeni & Yorum */}
        <div className="flex items-center gap-6 mt-4 ml-[50px]">
          <button
            onClick={() => setLiked(!liked)}
            className="flex items-center gap-1 text-gray-700 hover:text-red-600 transition"
          >
            {liked ? (
              <LikeFilled className="text-xl text-red-600" />
            ) : (
              <LikeOutlined className="text-xl" />
            )}
            <span>Beğen</span>
          </button>

          <button className="flex items-center gap-1 text-gray-700 hover:text-red-600 transition">
            <MessageOutlined className="text-xl" />
            <span>Yorum Yap</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default PostComponent;
