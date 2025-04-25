import React, { useEffect, useState } from "react";
import { Avatar, Button } from "antd";
import { UserOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { toast } from "react-fox-toast";

const PendingRequestsComponent = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const userId = "d33b3f4a-6bd6-4552-9905-45573a566044"; // Giriş yapan kullanıcı ID'si

  const fetchPendingRequests = async () => {
    try {
      const res = await fetch(
        `https://localhost:7291/api/FriendShips/getPendingFriends?userId=${userId}`
      );
      if (!res.ok) {
        toast.error("Bekleyen istekler yüklenemedi!");
        return;
      }
      const data = await res.json();
      setPendingRequests(data);
    } catch (error) {
      toast.error("Hata oluştu!");
    }
  };

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const handleAccept = async (senderId) => {
    try {
      const res = await fetch(
        `https://localhost:7291/api/FriendShips/acceptFriend?receiverUserId=${userId}&senderUserId=${senderId}`,
        { method: "POST" }
      );
      if (!res.ok) {
        toast.error("İstek kabul edilemedi!");
        return;
      }
      toast.success("Arkadaşlık isteği kabul edildi!");
      setPendingRequests(pendingRequests.filter((r) => r.userId !== senderId));
    } catch {
      toast.error("Sunucu hatası!");
    }
  };

  const handleReject = async (senderId) => {
    try {
      const res = await fetch(
        `https://localhost:7291/api/FriendShips/rejectFriend?receiverUserId=${userId}&senderUserId=${senderId}`,
        { method: "DELETE" }
      );
      if (!res.ok) {
        toast.error("İstek reddedilemedi!");
        return;
      }
      toast.success("Arkadaşlık isteği reddedildi!");
      setPendingRequests(pendingRequests.filter((r) => r.userId !== senderId));
    } catch {
      toast.error("Sunucu hatası!");
    }
  };

  return (
    <div className="w-[1000px] h-[700px] border bg-white shadow-lg rounded-2xl p-8 flex flex-col justify-between mx-auto mt-10">
      <div className="text-2xl font-semibold mb-4">Gelen İstekler</div>
      <div className="overflow-y-auto grid grid-cols-2 gap-4 pr-2">
        {pendingRequests.length === 0 ? (
          <div className="text-gray-500">Bekleyen isteğin yok 🙂</div>
        ) : (
          pendingRequests.map((request, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border rounded-xl hover:shadow transition"
            >
              <div className="flex items-center gap-4">
                <Avatar size="large" icon={<UserOutlined />} />
                <div>
                  <div className="font-medium">{request.username}</div>
                  <div className="text-gray-500 text-sm">
                    {request.email || "E-posta yok"}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  type="primary"
                  icon={<CheckOutlined />}
                  onClick={() => handleAccept(request.userId)}
                >
                  Kabul Et
                </Button>
                <Button
                  danger
                  icon={<CloseOutlined />}
                  onClick={() => handleReject(request.userId)}
                >
                  Reddet
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PendingRequestsComponent;
