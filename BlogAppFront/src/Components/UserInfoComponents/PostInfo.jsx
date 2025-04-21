import { FileTextOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { toast } from "react-fox-toast";

const PostInfo = () => {
  const [userData, setUserData] = useState(null);
  const getUserFromToken = () => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("authToken="))
        ?.split("=")[1];

      if (!token) return null;

      const payload = JSON.parse(atob(token.split(".")[1]));
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
        `https://localhost:7291/api/Posts/getbyuserid/${userId}`,
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
    <>
      <div className="p-2 bg-indigo-100 rounded-full text-indigo-600">
        <FileTextOutlined className="text-2xl" />
      </div>
      <div>
        <div className="text-xl font-semibold">{userData?.length}</div>
        <div className="text-gray-500 text-sm">Gönderi</div>
      </div>
    </>
  );
};

export default PostInfo;
