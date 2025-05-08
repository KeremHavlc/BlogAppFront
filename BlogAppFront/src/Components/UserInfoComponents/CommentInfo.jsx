import { CommentOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { toast } from "react-fox-toast";

const CommentInfo = () => {
  const [userData, setUserData] = useState(null);
  const getUserFromToken = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/Auth/me`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      setCookieUserId(data.id);
    } catch (err) {
      console.error("Me endpoint hatası:", err);
    }
  };
  const fetchData = async () => {
    const userId = getUserFromToken();
    if (!userId) {
      toast.error("Giriş yapılmamış!");
    }
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/Comments/getbyuserid/${userId}`,
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
    <div className="flex items-center gap-4 bg-pink-50 border border-pink-200 p-4 rounded-xl hover:shadow-md transition">
      <div className="p-2 bg-pink-100 rounded-full text-pink-600">
        <CommentOutlined className="text-2xl" />
      </div>
      <div>
        <div className="text-xl font-semibold">{userData?.length}</div>
        <div className="text-gray-500 text-sm">Yorum</div>
      </div>
    </div>
  );
};

export default CommentInfo;
