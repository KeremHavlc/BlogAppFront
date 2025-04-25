import { TeamOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { toast } from "react-fox-toast";
import { useNavigate } from "react-router-dom";

const FollowerInfo = () => {
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState();
  const navigate = useNavigate();
  const getUserFromToken = () => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("authToken="))
        ?.split("=")[1];

      if (!token) return null;

      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserId(payload?.id);
      return payload?.id;
    } catch (err) {
      console.error("JWT decode hatası:", err);
      return null;
    }
  };
  const fetchData = async () => {
    const userId = getUserFromToken();
    if (!userId) {
      toast.error("Giriş yapılmamış!");
    }
    try {
      const res = await fetch(
        `https://localhost:7291/api/FriendShips/getFriends?userId=${userId}`,
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
    } catch (error) {
      console.log(error);
      toast.error("Bir hata oluştu!");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      onClick={() => navigate(`/friendships/${userId}`)}
      className="flex items-center gap-4 bg-blue-50 border border-blue-200 p-4 rounded-xl hover:shadow-md transition"
    >
      <div className="p-2 bg-blue-100 rounded-full text-blue-600">
        <TeamOutlined className="text-2xl" />
      </div>
      <div>
        <div className="text-xl font-semibold">{userData?.length}</div>
        <div className="text-gray-500 text-sm">Arkadaş</div>
      </div>
    </div>
  );
};

export default FollowerInfo;
