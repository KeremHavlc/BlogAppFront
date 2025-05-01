import React, { useState } from "react";
import { Table, Input, Button } from "antd";
import { toast } from "react-fox-toast";

const UserPostsComponent = () => {
  const [userId, setUserId] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUserPosts = async () => {
    if (!userId) {
      toast.error("Kullanıcı ID'sini girin.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `https://localhost:7291/api/Posts/getbyuserid/${userId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) throw new Error("Gönderiler çekilemedi.");
      const data = await response.json();
      setPosts(data);
      toast.success("Gönderiler başarıyla getirildi.");
    } catch (error) {
      toast.error("Hata: " + error.message);
    } finally {
      setLoading(false);
    }
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
    },
    {
      title: "Görsel",
      dataIndex: "image",
      key: "image",
      render: (image) =>
        image ? (
          <img
            src={`data:image/jpeg;base64,${image}`}
            alt="Post"
            style={{
              width: 60,
              height: 60,
              objectFit: "cover",
              borderRadius: "8px",
              border: "1px solid #ddd",
            }}
          />
        ) : (
          "Yok"
        ),
    },
  ];

  return (
    <div className="w-[1270px] bg-gray-200 mt-4 select-none ml-[200px] border shadow-lg rounded-lg p-10">
      <h2 className="text-xl font-semibold mb-4">Gönderi Listesi</h2>
      <Input
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Kullanıcı ID'sini girin"
        style={{ width: 300, marginBottom: 20 }}
      />
      <Button
        type="primary"
        onClick={fetchUserPosts}
        loading={loading}
        style={{ marginBottom: 20 }}
      >
        Gönderileri Getir
      </Button>
      <Table
        dataSource={posts}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 8 }}
      />
    </div>
  );
};

export default UserPostsComponent;
