import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CommunityPostAllComments = () => {
  const { postId } = useParams();
  const [comments, setComments] = useState([]);
  const [usernames, setUsernames] = useState({});

  const fetchUsername = async (userId) => {
    try {
      const res = await fetch(
        `https://localhost:7291/api/Users/getById?id=${userId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!res.ok) {
        console.error("Kullanıcı ismi alınamadı");
        return;
      }
      const userData = await res.json();
      setUsernames((prev) => ({ ...prev, [userId]: userData.username }));
    } catch (error) {
      console.error("Kullanıcı ismi alınırken hata oluştu", error);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await fetch(
        `https://localhost:7291/api/CommunityComments/getByPostId?communityPostId=${postId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!res.ok) {
        console.error("Yorumlar alınamadı");
        return;
      }
      const data = await res.json();
      setComments(data);

      data.forEach((comment) => {
        fetchUsername(comment.userId);
      });
    } catch (error) {
      console.error("Yorumlar çekilirken hata oluştu", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  return (
    <div className="w-[800px] ml-[220px] bg-white p-4 rounded-lg shadow mt-6 mb-[70px]">
      <h3 className="text-lg font-semibold mb-4">Yorumlar</h3>
      {comments.length === 0 ? (
        <p className="text-gray-500">Henüz yorum yok.</p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-start gap-3">
              <Avatar icon={<UserOutlined />} />
              <div>
                <h4 className="font-semibold">
                  {usernames[comment.userId] || "Yükleniyor..."}{" "}
                </h4>
                <p className="text-gray-700">{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommunityPostAllComments;
