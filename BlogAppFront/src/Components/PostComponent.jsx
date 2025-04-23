import {
  LikeFilled,
  LikeOutlined,
  MessageOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-fox-toast";

const PostComponent = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await fetch(`https://localhost:7291/api/Posts/getall`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        toast.error("Bir hata oluştu!");
        return;
      }

      const data = await res.json();

      const postsWithUsers = await Promise.all(
        data.map(async (post) => {
          try {
            // Kullanıcı adı
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

            // Beğeni sayısı
            const likeRes = await fetch(
              `https://localhost:7291/api/PostLikes/getAllPostLikes?postId=${post.id}`,
              {
                method: "GET",
                credentials: "include",
              }
            );

            let likeCount = 0;
            if (likeRes.ok) {
              const likesData = await likeRes.json();
              likeCount = likesData.length;
            }

            // KENDİSİ BEĞENDİ Mİ?
            const isLikedRes = await fetch(
              `https://localhost:7291/api/PostLikes/isLiked?postId=${post.id}`,
              {
                method: "GET",
                credentials: "include",
              }
            );

            let liked = false;
            if (isLikedRes.ok) {
              liked = await isLikedRes.json();
            }

            return {
              ...post,
              username,
              imageUrl: post.image || null,
              liked,
              likeCount,
            };
          } catch (err) {
            console.error("Veri alınırken hata oluştu:", err);
            return {
              ...post,
              username: "Bilinmeyen Kullanıcı",
              imageUrl: null,
              liked: false,
              likeCount: 0,
            };
          }
        })
      );

      setPosts(postsWithUsers);
    } catch (error) {
      toast.error("Hata: " + error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLike = async (index, postId) => {
    const updated = [...posts];

    const endpoint = posts[index].liked
      ? `https://localhost:7291/api/PostLikes/removeLike?postId=${postId}`
      : `https://localhost:7291/api/PostLikes/addLike?postId=${postId}`;

    const method = posts[index].liked ? "DELETE" : "POST";

    const res = await fetch(endpoint, {
      method: method,
      credentials: "include",
    });

    if (res.ok) {
      updated[index].liked = !updated[index].liked;
      updated[index].likeCount = updated[index].liked
        ? updated[index].likeCount + 1
        : updated[index].likeCount - 1;
      setPosts(updated);
    } else {
      toast.error("İşlem sırasında hata oluştu.");
    }
  };

  return (
    <>
      {posts?.map((post, index) => (
        <div
          key={index}
          className={`w-[800px] ${
            post.imageUrl ? "h-[680px]" : "h-[200px]"
          } border ml-[120px] cursor-pointer mt-[28px] bg-white rounded-lg shadow-md hover:shadow-2xl transition-all duration-300`}
        >
          {/* Üst Kısım - Kullanıcı Bilgisi ve Tarih */}
          <div className="mt-[20px] ml-[19px] flex justify-between">
            <div className="flex items-center gap-2">
              <Avatar size="large" icon={<UserOutlined />} />
              <h2 className="text-lg font-semibold">{post.username}</h2>
            </div>
            <div className="mr-[50px]">
              <h2>{new Date(post.createdAt).toLocaleDateString()}</h2>
            </div>
          </div>

          {/* Fotoğraf (Varsa) */}
          {post.imageUrl && (
            <div
              onClick={() => navigate("/postDetails")}
              className="border mt-6 w-[700px] h-[400px] ml-[50px]"
            >
              <img
                src={post.imageUrl}
                alt="Post görseli"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Açıklama */}
          <div className="mt-[20px]">
            <div className="w-[700px] ml-[50px]">
              <h5 className="font-Amatic line-clamp-3">{post.description}</h5>
            </div>
          </div>

          {/* Beğeni & Yorum Butonları */}
          <div className="flex items-center gap-6 mt-4 ml-[50px]">
            <button
              onClick={() => handleLike(index, post.id)}
              className="flex items-center gap-1 text-gray-700 hover:text-red-600 transition"
            >
              {post.liked ? (
                <LikeFilled className="text-xl text-red-600" />
              ) : (
                <LikeOutlined className="text-xl" />
              )}
              <span>Beğen</span>
            </button>
            <span className="text-gray-700 ml-0">({post.likeCount})</span>{" "}
            {/* Beğeni sayısı burada */}
            <button
              onClick={() => navigate("/postDetails")}
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

export default PostComponent;
