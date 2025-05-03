import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-fox-toast";
import { Avatar } from "antd";
import { MessageOutlined, UserOutlined } from "@ant-design/icons";

const CommunityPostsComponent = () => {
  const { communityId } = useParams();
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const res = await fetch(
        `https://localhost:7291/api/CommunityPosts/getPostByCommunity?communityId=${communityId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!res.ok) {
        toast.error("Topluluk gönderileri alınırken hata oluştu.");
        return;
      }

      const data = await res.json();

      // Her post için kullanıcı adını çek
      const postsWithUsernames = await Promise.all(
        data.map(async (post) => {
          try {
            const userRes = await fetch(
              `https://localhost:7291/api/Users/getById?id=${post.userId}`,
              {
                method: "GET",
                credentials: "include",
              }
            );

            let username = "Bilinmeyen Kullanıcı";
            if (userRes.ok) {
              const userData = await userRes.json();
              username = userData.username || "Bilinmeyen Kullanıcı";
            }

            return {
              ...post,
              username,
            };
          } catch (err) {
            console.error("Kullanıcı verisi alınırken hata:", err);
            return {
              ...post,
              username: "Bilinmeyen Kullanıcı",
            };
          }
        })
      );

      setPosts(postsWithUsernames);
    } catch (err) {
      toast.error("Veriler alınırken bir hata oluştu: " + err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [communityId]);

  return (
    <>
      {posts.map((post, index) => (
        <div
          key={index}
          className="w-[800px] min-h-[200px] border ml-[220px] cursor-pointer mt-[28px] bg-white rounded-lg shadow-md hover:shadow-2xl transition-all duration-300"
        >
          {/* Üst Bilgi */}
          <div
            onClick={() => navigate(`/community/${communityId}/${post.id}`)}
            className="mt-[20px] ml-[19px] flex justify-between"
          >
            <div className="flex items-center gap-2">
              <Avatar size="large" icon={<UserOutlined />} />
              <h2 className="text-lg font-semibold">{post.username}</h2>
            </div>
            <div className="mr-[50px]">
              <h2>{new Date(post.createdAt).toLocaleDateString()}</h2>
            </div>
          </div>

          {/* Başlık */}
          <div
            onClick={() => navigate(`/community/${communityId}/${post.id}`)}
            className="mt-[20px]"
          >
            <div className="w-[700px] ml-[50px]">
              <h3 className="text-xl font-bold">{post.title}</h3>
              <p className="mt-2">{post.description}</p>
            </div>
          </div>

          {/* Butonlar */}
          <div className="flex items-center gap-6 mt-4 ml-[50px] mb-4">
            <button
              onClick={() => navigate(`/community/${communityId}/${post.id}`)}
              className="flex items-center gap-1 text-gray-700 hover:text-red-600 transition"
            >
              <MessageOutlined className="text-xl" />
              <span>Yorum Yap</span>
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default CommunityPostsComponent;
