import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { toast } from "react-fox-toast";

const AllUsersComponent = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://localhost:7291/api/Users/getAll", {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Kullanıcılar çekilemedi");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      toast.error("Hata: " + error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    {
      title: "Kullanıcı Adı",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "UserId",
      dataIndex: "userId",
      key: "userId",
      render: (text) => (
        <span
          onClick={() => {
            navigator.clipboard.writeText(text);
            toast.success("User ID panoya kopyalandı!");
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
      <h2 className="text-xl font-semibold mb-4">Tüm Kullanıcılar</h2>
      <Table
        dataSource={users}
        columns={columns}
        rowKey="email"
        pagination={{ pageSize: 8 }}
      />
    </div>
  );
};

export default AllUsersComponent;
