import React, { useEffect, useState } from "react";
import { Table, Tooltip } from "antd";
import { toast } from "react-fox-toast";

const AllPostComponent = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch("https://localhost:7291/api/Posts/getall", {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Postlar çekilemedi");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      toast.error("Hata: " + error.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const truncateText = (text, maxLength = 100) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const columns = [
    {
      title: "Başlık",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "İçerik",
      dataIndex: "description",
      key: "description",
      render: (text) => (
        <Tooltip title={text}>
          <span>{truncateText(text, 70)}</span>
        </Tooltip>
      ),
    },
    {
      title: "Post ID",
      dataIndex: "id",
      key: "id",
      render: (text) => (
        <span
          onClick={() => {
            navigator.clipboard.writeText(text);
            toast.success("Post ID panoya kopyalandı!");
          }}
          style={{ cursor: "pointer", color: "#1890ff" }}
        >
          {text}
        </span>
      ),
    },
  ];

  return (
    <div className="w-[1270px] bg-gray-200 mt-4 select-none ml-[200px] border shadow-lg rounded-lg p-10">
      <h2 className="text-xl font-semibold mb-4">Tüm Postlar</h2>
      <Table
        dataSource={posts}
        columns={columns}
        rowKey="postId"
        pagination={{ pageSize: 7 }}
      />
    </div>
  );
};

export default AllPostComponent;
