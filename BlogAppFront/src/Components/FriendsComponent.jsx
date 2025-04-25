import React, { useEffect, useState } from "react";
import { toast } from "react-fox-toast";
import { useParams } from "react-router-dom";
import { Avatar, Button } from "antd";
import { UserOutlined, DeleteOutlined } from "@ant-design/icons";

const FriendsComponent = () => {
  const { userId } = useParams();
  const [friendShips, setFriendShips] = useState([]);

  const fetchData = async () => {
    try {
      const res = await fetch(
        `https://localhost:7291/api/FriendShips/getFriends?userId=${userId}`
      );
      if (!res.ok) {
        toast.error("Veriler yüklenemedi!");
        return;
      }
      const data = await res.json();
      setFriendShips(data);
    } catch (error) {
      toast.error("Bir hata oluştu!");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleRemoveFriend = async (receiverUserId) => {
    try {
      const res = await fetch(
        `https://localhost:7291/api/FriendShips/removeFriend?receiverUserId=${receiverUserId}&senderUserId=${userId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!res.ok) {
        toast.error("Arkadaşlıktan çıkarılamadı!");
        return;
      }
      if (res.ok) {
        toast.success("Arkadaşlıktan çıkarıldı!");
        window.location.reload();
      }
      setFriendShips((prev) => prev.filter((f) => f.id !== receiverUserId));
    } catch (error) {
      toast.error("Bir hata oluştu!");
    }
  };
  return (
    <div className="w-[1000px] h-[700px] select-none border bg-white shadow-lg rounded-2xl p-8 flex flex-col">
      <div className="text-2xl font-semibold mb-4">Arkadaşlar</div>
      <div className="overflow-y-auto grid grid-cols-2 gap-4 pr-2">
        {friendShips.length === 0 ? (
          <div className="text-gray-500">Hiç arkadaşın yok gibi 😢</div>
        ) : (
          friendShips.map((friend, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border rounded-xl hover:shadow transition"
            >
              <div className="flex items-center gap-4">
                <Avatar size="large" icon={<UserOutlined />} />
                <div>
                  <div className="font-medium">{friend.username}</div>
                  <div className="text-gray-500 text-sm">
                    {friend.email || "E-posta yok"}
                  </div>
                </div>
              </div>
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleRemoveFriend(friend.userId)}
              >
                Çıkar
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FriendsComponent;
