import { CheckOutlined, CloseOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Image } from "antd"; // 👈 Image'ı import ettim
import React, { useEffect, useState } from "react";
import { toast } from "react-fox-toast";
import { useNavigate } from "react-router-dom";

const AllCommunitiesComponent = () => {
  const [communities, setCommunities] = useState([]);
  const [joinedCommunities, setJoinedCommunities] = useState(new Set());
  const [cookieUserId, setCookieUserId] = useState(null);
  const navigate = useNavigate();
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
    }
  };

  const fetchAllCommunities = async () => {
    try {
      const res = await fetch(
        "https://localhost:7291/api/Communities/getAllCommunities",
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!res.ok) {
        toast.error("Topluluklar yüklenemedi!");
        return;
      }

      const data = await res.json();
      setCommunities(data);
    } catch (error) {
      console.log(error);
      toast.error("Toplulukları çekerken bir hata oluştu!");
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
      if (data.status) {
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

  const handleJoinOrLeave = async (communityId) => {
    const createdAt = new Date().toISOString();
    const isJoined = joinedCommunities.has(communityId);

    try {
      let res;

      if (isJoined) {
        res = await fetch(
          `https://localhost:7291/api/CommunityUsers/deleteCommunityUser?communityId=${communityId}&userId=${cookieUserId}`,
          {
            method: "DELETE",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              communityId,
              userId: cookieUserId,
              createdAt,
            }),
          }
        );
      } else {
        res = await fetch(
          `https://localhost:7291/api/CommunityUsers/addCommunityUser`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              communityId,
              userId: cookieUserId,
              createdAt,
            }),
          }
        );
      }

      if (res.ok) {
        toast.success(
          isJoined ? "Takibi bıraktınız!" : "Topluluğa katıldınız!"
        );
        setJoinedCommunities((prev) => {
          const updated = new Set(prev);
          if (isJoined) {
            updated.delete(communityId);
          } else {
            updated.add(communityId);
          }
          return updated;
        });
      } else {
        toast.error(
          isJoined ? "Takibi bırakamadınız!" : "Topluluğa katılamadınız."
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(
        isJoined ? "Takibi bırakırken hata oluştu!" : "Katılırken hata oluştu!"
      );
    }
  };

  useEffect(() => {
    fetchAllCommunities();
    getUserFromToken();
  }, []);

  useEffect(() => {
    if (cookieUserId && communities.length > 0) {
      communities.forEach((community) => {
        checkCommunityJoined(community.communityId);
      });
    }
  }, [cookieUserId, communities]);
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("tr-TR", options);
  };
  return (
    <div className="w-[1000px] h-[700px] select-none border bg-white shadow-lg rounded-2xl p-8 flex flex-col mx-auto">
      <div className="text-2xl font-semibold mb-4">Topluluklar</div>
      <div className="overflow-y-auto grid grid-cols-2 gap-4 pr-2">
        {communities.map((community) => {
          console.log(community);
          const isJoined = joinedCommunities.has(community.communityId);
          return (
            <div
              key={community.communityId}
              className="flex items-center justify-between cursor-pointer p-4 border rounded-xl hover:shadow transition"
            >
              <div
                onClick={() => navigate(`/community/${community.communityId}`)}
                className="flex items-center gap-4"
              >
                <Image
                  width={50}
                  height={50}
                  style={{ borderRadius: "50%", objectFit: "cover" }}
                  src={
                    community.image
                      ? `data:image/png;base64,${community.image}`
                      : undefined
                  }
                  fallback={<UserOutlined />}
                  alt="community"
                />
                <div>
                  <div className="font-medium">{community.name}</div>
                  <div className="text-gray-500 text-sm">
                    {community.description}
                  </div>
                  <div className="text-gray-400 text-xs">
                    Oluşturulma Tarihi: {formatDate(community.createdAt)}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  className={`border w-[90px] h-[40px] decoration-dotted ${
                    isJoined
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-green-500 hover:bg-green-600"
                  } text-white rounded-lg shadow-lg transition-colors duration-300`}
                  onClick={() => handleJoinOrLeave(community.communityId)}
                >
                  {isJoined ? "Takibi Bırak" : "Katıl"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllCommunitiesComponent;
