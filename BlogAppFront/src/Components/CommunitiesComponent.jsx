import { TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-fox-toast";
import JoinCommunityButton from "./JoinCommunityButton"; // Butonu import ediyoruz

const CommunitiesComponent = () => {
  const [count, setCount] = useState([]);
  const [top3Communities, setTop3Communities] = useState([]);
  const [communityNames, setCommunityNames] = useState({});
  const [cookieUserId, setCookieUserId] = useState(null);
  const [joinedCommunities, setJoinedCommunities] = useState(new Set());

  const getUserFromToken = () => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("authToken="))
        ?.split("=")[1];

      if (!token) return null;

      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload?.id) {
        setCookieUserId(payload.id);
      }
    } catch (err) {
      console.error("JWT decode hatası:", err);
      return null;
    }
  };

  const fetchData = async () => {
    try {
      const res = await fetch(
        `https://localhost:7291/api/CommunityUsers/getAllCommunityUsersCount`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!res.ok) {
        toast.error("Veriler yüklenemedi!");
      }
      const data = await res.json();
      setCount(data);

      const top3 = Object.entries(data)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);

      setTop3Communities(top3);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCommunityName = async (communityId) => {
    try {
      const res = await fetch(
        `https://localhost:7291/api/Communities/getCommunityById?id=${communityId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!res.ok) {
        toast.error("Topluluk adı alınamadı!");
      }
      const data = await res.json();
      setCommunityNames((prev) => ({
        ...prev,
        [communityId]: data.name,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const checkCommunityJoined = async (communityId) => {
    try {
      const res = await fetch(
        `https://localhost:7291/api/CommunityUsers/check?communityId=${communityId}&joinUserId=${cookieUserId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!res.ok) {
        throw new Error("Katılım kontrolü başarısız oldu!");
      }
      const data = await res.json();
      if (data.success) {
        setJoinedCommunities((prev) => {
          const updated = new Set(prev);
          updated.add(communityId);
          return updated;
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
    getUserFromToken(); // Buraya almak daha doğru
  }, []);

  useEffect(() => {
    if (top3Communities.length > 0) {
      top3Communities.forEach(([communityId]) => {
        fetchCommunityName(communityId);
        checkCommunityJoined(communityId); // HER topluluk için kontrol yap
      });
    }
  }, [top3Communities, cookieUserId]);

  return (
    <>
      {top3Communities.length > 0 ? (
        top3Communities.map(([communityId, userCount]) => {
          const communityName = communityNames[communityId];
          const isJoined = joinedCommunities.has(communityId);
          return (
            <div
              key={communityId}
              className="community-card flex justify-between items-center mb-4 p-2 border rounded-lg shadow-md"
            >
              <div>
                <Avatar size={38} icon={<UserOutlined />} />
              </div>
              <div className="flex flex-col w-[140px] overflow-hidden ml-4">
                <h6 className="text-ellipsis overflow-hidden whitespace-nowrap font-semibold">
                  {communityName || "Yükleniyor..."}
                </h6>
                <div className="flex items-center gap-1">
                  <TeamOutlined className="text-sm" />
                  <h6>{userCount}</h6>
                </div>
              </div>
              <JoinCommunityButton
                isJoined={isJoined}
                communityId={communityId}
                cookieUserId={cookieUserId}
              />
            </div>
          );
        })
      ) : (
        <p>Yükleniyor...</p>
      )}
    </>
  );
};

export default CommunitiesComponent;
