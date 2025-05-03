import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { toast } from "react-fox-toast";
import { useParams } from "react-router-dom";

const JoinCommunityButton = () => {
  const [joined, setJoined] = useState(false);
  const [userId, setUserId] = useState(null);
  const { communityId } = useParams();

  // JWT token'ından kullanıcı ID'sini al
  const getUserFromToken = () => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("authToken="))
        ?.split("=")[1];

      if (!token) return null;

      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserId(payload?.id);
    } catch (err) {
      console.error("JWT decode hatası:", err);
    }
  };

  // Kullanıcının topluluğa katılıp katılmadığını kontrol et
  const checkData = async () => {
    if (!userId) {
      toast.error("Kullanıcı bilgisi alınamadı!");
      return;
    }

    try {
      const res = await fetch(
        `https://localhost:7291/api/CommunityUsers/check?communityId=${communityId}&joinUserId=${userId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();

      // API'den dönen "status" değerini kontrol et
      if (res.ok && data) {
        if (data.status === 0) {
          setJoined(false); // Kullanıcı toplulukta değilse
        } else if (data.status === 1) {
          setJoined(true); // Kullanıcı toplulukta ise
        }
      } else {
        toast.error("Topluluk durumu alınırken bir hata oluştu!");
        console.error("API yanıtı:", data);
      }
    } catch (error) {
      toast.error("Bir hata oluştu!");
      console.error(error);
    }
  };

  // Katılma/Ayrılma işlemi
  const handleJoin = async () => {
    if (!userId) {
      toast.error("Kullanıcı bilgisi alınamadı!");
      return;
    }

    try {
      const url = `https://localhost:7291/api/CommunityUsers/${
        joined ? "deleteCommunityUser" : "addCommunityUser"
      }`;
      const method = joined ? "DELETE" : "POST";
      const body = JSON.stringify({
        communityId,
        userId,
        createdAt: !joined ? new Date().toISOString() : undefined,
      });

      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      if (res.ok) {
        setJoined(!joined); // Durum güncellemesi
        toast.success(
          joined ? "Topluluktan ayrıldınız!" : "Topluluğa katıldınız!"
        );
      } else {
        toast.error(joined ? "Ayrılma başarısız!" : "Katılma başarısız!");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        joined ? "Ayrılırken hata oluştu!" : "Katılırken hata oluştu!"
      );
    }
  };

  useEffect(() => {
    getUserFromToken();
  }, []);

  useEffect(() => {
    if (userId) {
      checkData(); // Kullanıcı ID'si belirlendikten sonra checkData fonksiyonu çağrılacak
    }
  }, [userId]);

  return (
    <button
      className={`border w-[90px] h-[40px] decoration-dotted ${
        joined
          ? "bg-red-500 hover:bg-red-600"
          : "bg-green-500 hover:bg-green-600"
      } text-white rounded-lg shadow-lg transition-colors duration-300`}
      onClick={handleJoin} // handleJoin fonksiyonu doğrudan çağrılıyor
    >
      {joined ? "Takibi Bırak" : "Katıl"}
    </button>
  );
};

export default JoinCommunityButton;
