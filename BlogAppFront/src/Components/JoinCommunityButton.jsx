import React, { useState, useEffect } from "react";
import { toast } from "react-fox-toast";

const JoinCommunityButton = ({ isJoined, communityId, cookieUserId }) => {
  const [isJoinedState, setIsJoinedState] = useState(isJoined);
  const [createdAtState, setCreatedAtState] = useState(null);

  useEffect(() => {
    setIsJoinedState(isJoined);
  }, [isJoined]);

  const handleClick = async () => {
    if (isJoinedState) {
      try {
        const res = await fetch(
          `https://localhost:7291/api/CommunityUsers/deleteCommunityUser`,
          {
            method: "DELETE",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              communityId: communityId,
              userId: cookieUserId,
            }),
          }
        );

        if (res.ok) {
          toast.success("Takibi bıraktınız!");
          setIsJoinedState(false);
        } else {
          toast.error("Takibi bırakma başarısız oldu.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Takibi bırakırken hata oluştu!");
      }
    } else {
      const newCreatedAt = new Date().toISOString();

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
              createdAt: newCreatedAt,
            }),
          }
        );

        if (res.ok) {
          toast.success("Topluluğa katıldınız!");
          setIsJoinedState(true);
          setCreatedAtState(newCreatedAt);
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
