import React, { useState, useEffect } from "react";
import { toast } from "react-fox-toast";

const JoinCommunityButton = ({ isJoined, communityId, cookieUserId }) => {
  const [isJoinedState, setIsJoinedState] = useState(isJoined);

  // Dışarıdan gelen isJoined değişirse, içeriği de güncelle
  useEffect(() => {
    setIsJoinedState(isJoined);
  }, [isJoined]);

  const handleClick = async () => {
    const createdAt = new Date().toISOString();

    if (isJoinedState) {
      // Takibi bırak
      try {
        const res = await fetch(
          `https://localhost:7291/api/CommunityUsers/deleteCommunityUser`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              communityId: communityId,
              userId: cookieUserId,
              createdAt: createdAt,
            }),
          }
        );

        if (res.ok) {
          toast.success("Takibi bıraktınız!");
          setIsJoinedState(false); // Durumu değiştir
        } else {
          toast.error("Takibi bırakma başarısız oldu.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Takibi bırakırken hata oluştu!");
      }
    } else {
      // Katıl
      try {
        const res = await fetch(
          `https://localhost:7291/api/CommunityUsers/addCommunityUser`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              communityId: communityId,
              userId: cookieUserId,
              createdAt: createdAt,
            }),
          }
        );

        if (res.ok) {
          toast.success("Topluluğa katıldınız!");
          setIsJoinedState(true); // Durumu değiştir
        } else {
          toast.error("Topluluğa katılamadınız.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Katılırken hata oluştu!");
      }
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className={`border w-[90px] h-[40px] decoration-dotted ${
          isJoinedState
            ? "bg-red-500 hover:bg-red-600"
            : "bg-green-500 hover:bg-green-600"
        } text-white rounded-lg shadow-lg transition-colors duration-300`}
      >
        {isJoinedState ? "Takibi Bırak" : "Katıl"}
      </button>
    </div>
  );
};

export default JoinCommunityButton;
