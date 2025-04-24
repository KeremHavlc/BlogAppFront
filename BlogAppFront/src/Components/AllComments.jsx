import React, { useEffect, useState } from "react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { toast } from "react-fox-toast";

const AllComments = () => {
  const { postId } = useParams();
  const [comments, setComments] = useState([]);

  const fetchUsername = async (userId) => {
    try {
      const res = await fetch(
        `https://localhost:7291/api/Users/getById?id=${userId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!res.ok) return "Anonim";
      const data = await res.json();
      return data.username || "Anonim";
    } catch (error) {
      console.error("Username alınamadı:", error);
      return "Anonim";
    }
  };

  const fetchData = async () => {
    try {
      const res = await fetch(
        `https://localhost:7291/api/Comments/getbypostid/${postId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!res.ok) {
        toast.error("Yorumlar alınamadı!");
        return;
      }
      const fetchingData = await res.json();

      // Her bir yorum için username'leri al
      const commentsWithUsernames = await Promise.all(
        fetchingData.map(async (comment) => {
          const username = await fetchUsername(comment.userId);
          return { ...comment, username };
        })
      );

      setComments(commentsWithUsernames);
    } catch (error) {
      toast.error("Bir hata oluştu!", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-[800px] ml-[120px] bg-white p-4 rounded-lg shadow mt-6 mb-[70px]">
      <h3 className="text-lg font-semibold mb-4">Yorumlar</h3>
      {comments.length === 0 ? (
        <p className="text-gray-500">Henüz yorum yok.</p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-start gap-3">
              <Avatar icon={<UserOutlined />} />
              <div>
                <h4 className="font-semibold">{comment.username}</h4>
                <p className="text-gray-700">{comment.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllComments;
