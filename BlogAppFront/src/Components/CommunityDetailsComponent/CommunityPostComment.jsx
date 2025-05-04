import { SendOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-fox-toast";

const CommunityPostComment = () => {
  const [comment, setComment] = useState("");
  const [userId, setUserId] = useState();
  const { communityId, postId } = useParams();
  console.log(postId);
  const getUserFromToken = () => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("authToken="))
        ?.split("=")[1];

      if (!token) return;

      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserId(payload?.id);
    } catch (err) {
      console.error("JWT decode hatası:", err);
      toast.error("Giriş yapılmamış!");
    }
  };

  const addComment = async () => {
    try {
      const res = await fetch(
        `https://localhost:7291/api/CommunityComments/addCommunityComment`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            comment,
            communityPostId: postId,
            userId,
          }),
        }
      );

      if (!res.ok) {
        toast.error("Yorum gönderilirken bir hata oluştu!");
      } else {
        toast.success("Yorum gönderildi!");
        setComment(""); // Yorumu temizle
        window.location.reload(); // Sayfayı yenile
      }
    } catch (error) {
      toast.error("Bir hata oluştu!");
    }
  };

  useEffect(() => {
    getUserFromToken();
  }, []);

  return (
    <div className="w-[800px] min-h-[100px] border bg-white ml-[220px] mt-6 rounded-lg p-4 shadow-md">
      <div className="flex items-start gap-3">
        <Avatar size="large" icon={<UserOutlined />} />

        <div className="flex-1">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Yorumunuzu yazın..."
            rows={1}
            maxLength={500}
            className="w-full resize-none overflow-hidden border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all"
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
          ></textarea>

          <div className="flex justify-end mt-2">
            <button
              className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
              onClick={() => {
                if (comment.trim()) {
                  addComment();
                } else {
                  toast.error("Yorum boş olamaz!");
                }
              }}
            >
              <SendOutlined />
              <span>Paylaş</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPostComment;
