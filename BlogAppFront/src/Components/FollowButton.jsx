import React, { useState, useEffect } from "react";
import { toast } from "react-fox-toast";

const FollowButton = ({ user }) => {
  const [status, setStatus] = useState(0); // default status

  useEffect(() => {
    const checkFriendShipStatus = async () => {
      const senderUserId = getUserFromToken();
      if (!senderUserId) return;

      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/api/FriendShips/check?senderUserId=${senderUserId}&receiverUserId=${
            user.userId
          }`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!res.ok) {
          toast.error("Veriler yüklenirken bir hata oluştu!");
          return;
        }

        const check = await res.json(); // 👈 json parse
        setStatus(check.status); // 👈 direkt status ata (0, 1, 2)
      } catch (error) {
        toast.error("Bir hata oluştu!");
        setStatus(0); // default none
      }
    };

    checkFriendShipStatus();
  }, [user]);
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

  const handleClick = async () => {
    const senderUserId = getUserFromToken();
    if (!senderUserId) {
      toast.error("Giriş yapılmamış!");
      return;
    }
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/FriendShips/addFriend?receiverUserId=${
          user.userId
        }&senderUserId=${senderUserId}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!res.ok) {
        const message = await res.text();
        toast.error(`${message}`);
        return;
      }

      setStatus(1);
      toast.success("Takip isteği gönderildi!");
    } catch (error) {
      console.error("Takip isteği hatası:", error);
      toast.error("Bir hata oluştu!");
    }
  };

  const renderButtonText = () => {
    if (status === 2) return "Takipstesin";
    if (status === 1) return "İstek Bekleniyor";
    return "Takip Et";
  };
  const getButtonClass = () => {
    if (status === 2) {
      return "bg-green-500 hover:bg-green-600 text-white";
    }
    if (status === 1) {
      return "bg-red-500 hover:bg-red-600 text-white";
    }
    return "bg-red-500 hover:bg-red-600 text-white";
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className={`${getButtonClass()} text-sm leading-none px-4 py-2 rounded-lg shadow-lg transition font-medium`}
        disabled={status === 1 || status === 2}
      >
        {renderButtonText()}
      </button>
    </div>
  );
};

export default FollowButton;
