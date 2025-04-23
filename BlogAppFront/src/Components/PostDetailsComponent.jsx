import {
  ArrowLeftOutlined,
  LikeFilled,
  LikeOutlined,
  MessageOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-fox-toast";
import { Image } from "antd";

const PostDetailsComponent = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const navigate = useNavigate();
  const { postId } = useParams();

  const fetchPostData = async () => {
    try {
      // Post verilerini çek
      const postRes = await fetch(
        `https://localhost:7291/api/Posts/getBypostId?postId=${postId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!postRes.ok) {
        toast.error("Gönderi bulunamadı!");
        navigate("/home");
        return;
      }

      const postData = await postRes.json();

      // Kullanıcı verilerini çek
      const userRes = await fetch(
        `https://localhost:7291/api/Users/getById?id=${postData.userId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      let username = "Bilinmeyen Kullanıcı";
      if (userRes.ok) {
        const userData = await userRes.json();
        username = userData.username || username;
      }

      // Beğeni verilerini çek
      const likeRes = await fetch(
        `https://localhost:7291/api/PostLikes/getAllPostLikes?postId=${postId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      let likes = [];
      if (likeRes.ok) {
        likes = await likeRes.json();
      }

      // Kullanıcının beğenip beğenmediğini kontrol et
      const isLikedRes = await fetch(
        `https://localhost:7291/api/PostLikes/isLiked?postId=${postId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      let isLiked = false;
      if (isLikedRes.ok) {
        isLiked = await isLikedRes.json();
      }

      // Base64 resim kontrolü
      const isValidBase64 = (str) => {
        try {
          return btoa(atob(str)) === str;
        } catch (e) {
          return false;
        }
      };

      setPost({
        ...postData,
        username,
        imageUrl:
          postData.image && isValidBase64(postData.image)
            ? `data:image/png;base64,${postData.image}`
            : null,
        likeCount: likes.length,
        liked: isLiked,
      });

      setLiked(isLiked);
      setLikeCount(likes.length);
      setLoading(false);
    } catch (error) {
      toast.error("Bir hata oluştu: " + error.message);
      navigate("/home");
    }
  };

  const handleLike = async () => {
    try {
      const endpoint = liked
        ? `https://localhost:7291/api/PostLikes/removeLike?postId=${postId}`
        : `https://localhost:7291/api/PostLikes/addLike?postId=${postId}`;

      const method = liked ? "DELETE" : "POST";

      const res = await fetch(endpoint, {
        method,
        credentials: "include",
      });

      if (res.ok) {
        setLiked(!liked);
        setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
        if (post) {
          setPost((prev) => ({
            ...prev,
            liked: !liked,
            likeCount: liked ? prev.likeCount - 1 : prev.likeCount + 1,
          }));
        }
      } else {
        toast.error("İşlem başarısız oldu");
      }
    } catch (error) {
      toast.error("Hata: " + error.message);
    }
  };

  useEffect(() => {
    fetchPostData();
  }, [postId]);

  if (loading) {
    return <div className="text-center mt-8">Yükleniyor...</div>;
  }

  if (!post) {
    return null;
  }

  return (
    <div
      className={`w-[800px] ${
        post.image && post.image !== "null" ? "h-[680px]" : "h-[200px]"
      } border ml-[120px] cursor-pointer mt-[28px] bg-white rounded-lg shadow-md hover:shadow-2xl transition-all duration-300`}
    >
      {/* Üst Kısım */}
      <div className="mt-[20px] ml-[19px] flex justify-between">
        <div onClick={() => navigate(-1)} className="cursor-pointer">
          <Avatar
            size="large"
            icon={<ArrowLeftOutlined />}
            className="hover:text-red-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <Avatar size="large" icon={<UserOutlined />} />
          <h2 className="text-lg font-semibold">{post.username}</h2>
        </div>
        <div className="mr-[50px]">
          <h2>{new Date(post.createdAt).toLocaleDateString()}</h2>
        </div>
      </div>

      {/* Fotoğraf (Varsa) */}
      {post.image && post.image !== "null" && (
        <div className="border mt-6 w-[700px] h-[400px] ml-[50px]">
          <Image
            src={post.imageUrl}
            width={700}
            height={400}
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
      <div className="flex items-center gap-6 mt-4 ml-[50px] mb-6">
        <button
          onClick={handleLike}
          className="flex items-center gap-1 text-gray-700 hover:text-red-600 transition"
        >
          {liked ? (
            <LikeFilled className="text-xl text-red-600" />
          ) : (
            <LikeOutlined className="text-xl" />
          )}
          <span>Beğen</span>
        </button>
        <span className="text-gray-700 ml-0">({likeCount})</span>

        <button className="flex items-center gap-1 text-gray-700 hover:text-red-600 transition">
          <MessageOutlined className="text-xl" />
          <span>Yorum Yap</span>
        </button>
      </div>
    </div>
  );
};

export default PostDetailsComponent;
