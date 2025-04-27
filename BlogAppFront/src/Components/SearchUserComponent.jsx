import { UserOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { toast } from "react-fox-toast";

const SearchUserComponent = ({ userId }) => {
  const [userData, setUserData] = useState();
  const [isFollowing, setIsFollowing] = useState();
  const [cookieUserId, setCookieUserId] = useState();
  const checkFriendShips = async () => {
    try {
      const check = await fetch(
        `https://localhost:7291/api/FriendShips/check?senderUserId=${cookieUserId}&receiverUserId=${userId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!check.ok) {
        console.log("Veriler Yüklenemedi!");
      }
      const data = await check.json();
      setIsFollowing(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getUserFromToken = () => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("authToken="))
        ?.split("=")[1];

      if (!token) return null;

      const payload = JSON.parse(atob(token.split(".")[1]));
      setCookieUserId(payload?.id);
    } catch (err) {
      console.error("JWT decode hatası:", err);
      return null;
    }
  };
  const fetchData = async () => {
    try {
      const res = await fetch(
        `https://localhost:7291/api/Users/getByIdFront?id=${userId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setUserData(data);
      } else {
        toast.error("Veriler yüklenirken bir hata oluştu!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleFollow = () => {
    // Takip et / takipten çık işlemi
    setIsFollowing((prevState) => !prevState);
    toast.success(isFollowing ? "Takipten çıkıldı!" : "Takip edildi!");
  };

  useEffect(() => {
    fetchData();
    getUserFromToken();
    checkFriendShips();
  }, [userId]);

  return (
    <div className="w-[1000px] h-[700px] border bg-white shadow-lg rounded-2xl p-8 flex flex-col">
      {/* Üst Bilgi */}
      <div className="flex items-center gap-6 border-b pb-6">
        <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-4xl">
          <UserOutlined />
        </div>
        <div>
          <h2 className="text-2xl font-semibold">{userData?.username}</h2>
          <p className="text-gray-500">@{userData?.username}</p>
        </div>
      </div>

      {/* Takip Et / Takipten Çık Butonları */}
      <div className="flex gap-4 mt-10">
        <button
          onClick={toggleFollow}
          className={`${
            isFollowing ? "bg-red-500" : "bg-blue-500"
          } text-white py-2 px-6 rounded-full transition-colors`}
        >
          {isFollowing ? "Takipten Çık" : "Takip Et"}
        </button>
      </div>

      {/* Kullanıcının Dahil Olduğu Topluluklar */}

      <div className="border-t pt-6 mt-10">
        <h3 className="font-semibold text-lg">Dahil Olduğu Topluluklar:</h3>
        <ul className="mt-4 space-y-2">
          <li className="bg-gray-100 p-4 rounded-xl">deneme</li>
        </ul>
      </div>

      {/* Ayarlar */}
      <div className="mt-10 border-t pt-6 flex justify-between items-center"></div>
    </div>
  );
};

export default SearchUserComponent;
