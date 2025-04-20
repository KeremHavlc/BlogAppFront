import React from "react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const AllComments = () => {
  const dummyComments = [
    { id: 1, username: "Kerem", content: "Bu gönderi harika olmuş!" },
    {
      id: 2,
      username: "Ayşe",
      content: "Ellerine sağlık, çok güzel yazmışsın.",
    },
    { id: 3, username: "Mert", content: "Bence de çok güzel bir paylaşım." },
  ];

  return (
    <div className="w-[800px] ml-[120px] bg-white p-4 rounded-lg shadow mt-6 mb-[70px]">
      <h3 className="text-lg font-semibold mb-4">Yorumlar</h3>
      <div className="space-y-4">
        {dummyComments.map((comment) => (
          <div key={comment.id} className="flex items-start gap-3">
            <Avatar icon={<UserOutlined />} />
            <div>
              <h4 className="font-semibold">{comment.username}</h4>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllComments;
