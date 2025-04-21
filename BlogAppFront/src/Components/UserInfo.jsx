import React, { useEffect, useState } from "react";
import { UserOutlined, SettingOutlined } from "@ant-design/icons";
import AccountDeleteModal from "./AccountDeleteModal";
import AccountUpdateModal from "./AccountUpdateModal";
import FollowerInfo from "./UserInfoComponents/FollowerInfo";
import FollowingInfo from "./UserInfoComponents/FollowingInfo";
import AccountOpening from "./UserInfoComponents/AccountOpening";
import PostInfo from "./UserInfoComponents/PostInfo";
import CommentInfo from "./UserInfoComponents/CommentInfo";
import { toast } from "react-fox-toast";

const UserInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  const getUserFromToken = () => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("authToken="))
        ?.split("=")[1];

      if (!token) return null;

      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload?.username;
    } catch (err) {
      console.error("JWT decode hatası:", err);
      return null;
    }
  };
  const fetchUserData = async () => {
    const username = getUserFromToken();
    if (!username) {
      toast.error("Giriş yapılmamış!");
      return;
    }
    try {
      const res = await fetch(
        `https://localhost:7291/api/Users/getByUsername?username=${username}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!res.ok) {
        const text = await res.text();
        toast.error(text || "Kullanıcı bilgileri alınamadı!");
        return;
      }
      const data = await res.json();
      setUserData(data);
    } catch (err) {
      console.error(err);
      toast.error("Bir hata oluştu!");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <div className="w-[1000px] h-[700px] border bg-white shadow-lg rounded-2xl p-8 flex flex-col justify-between">
        {/* Üst Bilgi */}
        <div className="flex items-center gap-6 border-b pb-6">
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-4xl">
            <UserOutlined />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">
              {userData?.username || "Ad Soyad"}
            </h2>
            <p className="text-gray-500">
              @{userData?.username || "kullaniciadi"}
            </p>
          </div>
        </div>

        {/* Kullanıcı İstatistikleri */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          <div className="flex items-center gap-4 bg-blue-50 border border-blue-200 p-4 rounded-xl hover:shadow-md transition">
            <FollowerInfo />
          </div>
          <div className="flex items-center gap-4 bg-green-50 border border-green-200 p-4 rounded-xl hover:shadow-md transition">
            <FollowingInfo />
          </div>
          <div className="flex items-center gap-4 bg-purple-50 border border-purple-200 p-4 rounded-xl hover:shadow-md transition">
            <AccountOpening accountOpening={userData?.createdAt} />
          </div>
          <div className="flex items-center gap-4 bg-indigo-50 border border-indigo-200 p-4 rounded-xl hover:shadow-md transition">
            <PostInfo postInfo={userData?.posts ?? 0} />
          </div>
          <div className="flex items-center gap-4 bg-pink-50 border border-pink-200 p-4 rounded-xl hover:shadow-md transition">
            <CommentInfo />
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
