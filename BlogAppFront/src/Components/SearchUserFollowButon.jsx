import React from "react";
import { toast } from "react-fox-toast";

const SearchUserFollowButon = ({
  isFollowing,
  setIsFollowing,
  cookieUserId,
  userId,
}) => {
  const toggleFollow = async () => {
    try {
      if (isFollowing === 0) {
        // Takip etme isteği gönder
        const res = await fetch(
          `https://localhost:7291/api/FriendShips/addFriend?senderUserId=${cookieUserId}&receiverUserId=${userId}`,
          {
            method: "POST",
            credentials: "include",
          }
        );
        if (res.ok) {
          setIsFollowing(1); // Takip isteği gönderildi
          toast.success("Takip isteği gönderildi!");
        } else {
          toast.error("Takip isteği gönderilemedi!");
        }
      } else if (isFollowing === 1) {
        // Takip isteğini iptal et
        const res = await fetch(
          `https://localhost:7291/api/FriendShips/removeFriend?senderUserId=${cookieUserId}&receiverUserId=${userId}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );
        if (res.ok) {
          setIsFollowing(0); // İstek iptal edildi
          toast.success("Takip isteği iptal edildi!");
        } else {
          toast.error("Takip isteği iptal edilemedi!");
        }
      } else if (isFollowing === 2) {
        // Takipten çıkma işlemi
        const res = await fetch(
          `https://localhost:7291/api/FriendShips/removeFriend?senderUserId=${cookieUserId}&receiverUserId=${userId}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );
        if (res.ok) {
          setIsFollowing(0); // Takipten çıkıldı
          toast.success("Takipten çıkıldı!");
        } else {
          toast.error("Takipten çıkılamadı!");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Bir hata oluştu!");
    }
  };

  return (
    <div>
      <button
        onClick={toggleFollow}
        className={`${
          isFollowing === 0
            ? "bg-blue-500"
            : isFollowing === 1
            ? "bg-yellow-500"
            : "bg-red-500"
        } text-white py-2 px-6 rounded-full transition-colors`}
      >
        {isFollowing === 0
          ? "Takip Et"
          : isFollowing === 1
          ? "İstek Bekleniyor"
          : "Takipten Çık"}
      </button>
    </div>
  );
};

export default SearchUserFollowButon;
