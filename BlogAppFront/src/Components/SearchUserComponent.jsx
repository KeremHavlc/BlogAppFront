import { UserOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { toast } from "react-fox-toast";
import SearchUserFollowButon from "./SearchUserFollowButon";
import { Avatar } from "antd";

const SearchUserComponent = ({ userId }) => {
  const [userData, setUserData] = useState();
  const [isFollowing, setIsFollowing] = useState(0);
  const [cookieUserId, setCookieUserId] = useState();
  const [userCommunities, setUserCommunities] = useState([]);

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
    }
  };

  const fetchUser = async () => {
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
      console.error(error);
    }
  };

  const fetchCommunities = async () => {
    try {
      const res = await fetch(
        `https://localhost:7291/api/CommunityUsers/getById?userId=${userId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setUserCommunities(data);
      }
    } catch (error) {
      console.error("Topluluklar yüklenemedi", error);
    }
  };

  const checkFriendShips = async () => {
    try {
      if (!cookieUserId) return;
      const check = await fetch(
        `https://localhost:7291/api/FriendShips/check?senderUserId=${cookieUserId}&receiverUserId=${userId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await check.json();
      setIsFollowing(data.status);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserFromToken();
    fetchUser();
    fetchCommunities();
  }, [userId]);

  useEffect(() => {
    if (cookieUserId) {
      checkFriendShips();
    }
  }, [cookieUserId, userId]);

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

      {/* Takip Et / Takipten Çık */}
      <div className="flex gap-4 mt-10">
        <SearchUserFollowButon
          isFollowing={isFollowing}
          setIsFollowing={setIsFollowing}
          cookieUserId={cookieUserId}
          userId={userId}
        />
      </div>

      {/* Dahil Olduğu Topluluklar */}
      <div className="border-t pt-6 mt-10">
        <h3 className="font-semibold text-lg mb-4">
          Dahil Olduğu Topluluklar:
        </h3>
        <ul className="flex gap-4 flex-wrap">
          {userCommunities.map((community) => (
            <li
              key={community.communityId}
              className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg"
            >
              <Avatar
                size={40}
                src={`data:image/jpeg;base64,${community.image}`}
                className="border"
              />
              <span className="font-medium">{community.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchUserComponent;
