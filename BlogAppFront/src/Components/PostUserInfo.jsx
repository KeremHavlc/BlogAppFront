import React, { useEffect, useState } from "react";
import {
  UserOutlined,
  CalendarOutlined,
  TeamOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-fox-toast";

const PostUserInfo = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState();
  const [postCount, setPostCount] = useState();
  const [friends, setFriends] = useState([]); // Arkadaşları tutacak state

  const fetchData = async () => {
    try {
      const res = await fetch(
        `https://localhost:7291/api/Posts/getBypostId?postId=${postId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!res.ok) {
        toast.error("Gönderi bulunamadı!");
        navigate("/home");
        return;
      }
      const postData = await res.json();
      const userRes = await fetch(
        `https://localhost:7291/api/Users/getById?id=${postData.userId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (userRes.ok) {
        const userData = await userRes.json();
        setData(userData);
      }

      // Post count
      const postCount = await fetch(
        `https://localhost:7291/api/Posts/getbyuserid/${postData.userId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (postCount.ok) {
        const postCountData = await postCount.json();
        setPostCount(postCountData);
      }

      // Arkadaşları al
      const friendsRes = await fetch(
        `https://localhost:7291/api/FriendShips/getFriends?userId=${postData.userId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (friendsRes.ok) {
        const friendsData = await friendsRes.json();
        setFriends(friendsData); // Arkadaşları set et
      }
    } catch (error) {
      toast.error("Bir hata oluştu!", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-[300px] h-auto bg-white border mr-[95px] ml-[95px] mt-[50px] shadow-lg rounded-2xl p-6 select-none">
      {/* Kullanıcı Bilgileri */}
      <div className="flex flex-col items-center text-center mb-6">
        <Avatar size={80} icon={<UserOutlined />} className="mb-2" />
        <h2 className="text-xl font-semibold text-gray-800">
          {data?.username}
        </h2>
        <p className="text-sm text-gray-500">@{data?.username}</p>
      </div>

      {/* Diğer Bilgiler */}
      <div className="space-y-4 text-gray-700">
        {data?.createdAt && (
          <div className="flex items-center gap-3">
            <CalendarOutlined className="text-red-400 text-lg" />
            <span>
              Katılma:{" "}
              {new Date(data.createdAt).toLocaleDateString("tr-TR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        )}
        <div className="flex items-center gap-3">
          <TeamOutlined className="text-blue-500 text-lg" />
          <span>Arkadaşlar: {friends.length}</span>{" "}
          {/* Arkadaş sayısını göster */}
        </div>

        <div className="flex items-center gap-3">
          <FileTextOutlined className="text-green-500 text-lg" />
          <span>Gönderiler: {postCount?.length}</span>
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
