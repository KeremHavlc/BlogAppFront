import { MessageOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React, { useEffect, useState } from "react";
import CommunityPostComment from "./CommunityPostComment";
import { useParams } from "react-router-dom";
import { toast } from "react-fox-toast";

const CommunityPostDetailsComponent = () => {
  const { communityId, postId } = useParams();
  const [post, setPost] = useState(null);
  const [username, setUsername] = useState("");

  const fetchPost = async () => {
    try {
      const res = await fetch(
        `https://localhost:7291/api/CommunityPosts/getById?postId=${postId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!res.ok) {
        toast.error("Post verisi alınamadı");
        return;
      }
      const data = await res.json();
      setPost(data);
    } catch (error) {
      toast.error("Post verisi alınırken hata oluştu!");
    }
  };

  const fetchUser = async (userId) => {
    try {
      const res = await fetch(
        `https://localhost:7291/api/Users/getById?id=${userId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!res.ok) {
        toast.error("Kullanıcı bilgisi alınamadı");
        return;
      }
      const userData = await res.json();
      setUsername(userData.username);
    } catch (error) {
      toast.error("Kullanıcı bilgisi alınırken hata oluştu!");
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  useEffect(() => {
    if (post?.userId) {
      fetchUser(post.userId);
    }
  }, [post?.userId]);

  if (!post) {
    return <div className="ml-[220px] mt-[28px]">Yükleniyor...</div>;
  }

  return (
    <>
      <div className="w-[800px] min-h-[200px] border ml-[220px] cursor-pointer mt-[28px] bg-white rounded-lg shadow-md hover:shadow-2xl transition-all duration-300">
        {/* Üst Bilgi */}
        <div className="mt-[20px] ml-[19px] flex justify-between">
          <div className="flex items-center gap-2">
            <Avatar size="large" icon={<UserOutlined />} />
            <h2 className="text-lg font-semibold">{username || "Kullanıcı"}</h2>
          </div>
          <div className="ml-[550px]">
            <h2>{new Date(post.createdAt).toLocaleDateString()}</h2>
          </div>
          <div className="mr-[50px]">{/* Tarih yeri */}</div>
        </div>

        {/* Başlık */}
        <div className="mt-[20px]">
          <div className="w-[700px] ml-[50px]">
            <h3 className="text-xl font-bold">{post.title}</h3>
            <p className="mt-2">{post.description}</p>
          </div>
        </div>

        {/* Butonlar */}
        <div className="flex items-center gap-6 mt-4 ml-[50px] mb-4">
          <button className="flex items-center gap-1 text-gray-700 hover:text-red-600 transition">
            <MessageOutlined />
            <span>Yorum Yap</span>
          </button>
        </div>
      </div>
      <div>
        <CommunityPostComment />
      </div>
    </>
  );
};

export default CommunityPostDetailsComponent;
