import React from "react";
import { toast } from "react-fox-toast";

const FollowButton = ({ user }) => {
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

  const handleClick = async () => {
    const senderUserId = getUserFromToken();
    if (!senderUserId) {
      toast.error("Giriş yapılmamış!");
      return;
    }

    try {
      const res = await fetch(
        `https://localhost:7291/api/FriendShips/addFriend?receiverUserId=${user.userId}&senderUserId=${senderUserId}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!res.ok) {
        const message = await res.text();
        toast.error(`Takip işlemi başarısız: ${message}`);
        return;
      }

      toast.success("Takip isteği gönderildi!");
    } catch (error) {
      console.error("Takip isteği hatası:", error);
      toast.error("Bir hata oluştu!");
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="bg-red-500 hover:bg-red-600 text-white text-sm leading-none px-4 py-2 rounded-lg transition font-medium"
      >
        Takip Et
      </button>
    </div>
  );
};

export default FollowButton;
