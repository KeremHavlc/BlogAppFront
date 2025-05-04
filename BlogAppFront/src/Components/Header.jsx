import React, { useEffect, useState } from "react";
import { UserOutlined, BellOutlined, LogoutOutlined } from "@ant-design/icons";
import { Avatar, Badge, List, AutoComplete, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { usePendingRequest } from "../Context/PendingRequestContext ";
import { toast } from "react-fox-toast";
import logo from "../Utilities/logo-transparent.png";
const Header = () => {
  const [searchUser, setSearchUser] = useState("");
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState();
  const navigate = useNavigate();
  const { pendingCount } = usePendingRequest();

  const getUserFromToken = () => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("authToken="))
        ?.split("=")[1];

      if (!token) return null;

      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserId(payload?.id);
      return payload?.id;
    } catch (err) {
      console.error("JWT decode hatası:", err);
      return null;
    }
  };

  useEffect(() => {
    getUserFromToken();
  }, []);

  useEffect(() => {
    if (searchUser.trim().length === 0) {
      setUsers([]);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      fetchData();
    }, 200);

    return () => clearTimeout(delayDebounceFn);
  }, [searchUser]);

  const fetchData = async () => {
    try {
      const res = await fetch(
        `https://localhost:7291/api/Users/getByUsernameFront?username=${searchUser}`,
        { method: "GET", credentials: "include" }
      );
      if (!res.ok) return;
      const data = await res.json();
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error("Kullanıcılar yüklenemedi");
    }
  };

  const handleSearch = (value) => {
    setSearchUser(value);
  };

  const onSelect = (userId) => {
    navigate(`/searhcuser/${userId}`);
  };
  return (
    <div className="w-full bg-white shadow-lg py-4 flex items-center justify-between border-b-2 px-8 relative">
      {/* Logo */}
      <div
        onClick={() => navigate("/home")}
        className="select-none cursor-pointer flex items-center justify-start pl-16 text-4xl text-red-600 font-bold"
        style={{ height: "60px" }} // Header'ın yüksekliğini koruyarak logoyu büyütüyoruz
      >
        <img src={logo} style={{ width: "100px", height: "auto" }} />
      </div>

      {/* Arama kutusu */}
      <div className="flex-grow flex ml-[310px]">
        <AutoComplete
          value={searchUser}
          onSearch={handleSearch}
          onSelect={onSelect}
          style={{ width: 800, height: 30 }}
          options={
            Array.isArray(users)
              ? users.map((user) => ({
                  value: user.id,
                  label: (
                    <div className="flex items-center">
                      <Avatar
                        size="small"
                        icon={<UserOutlined />}
                        className="mr-3"
                      />
                      {user.username}
                    </div>
                  ),
                }))
              : []
          }
        >
          <Input placeholder="Kullanıcı Arayın..." />
        </AutoComplete>
      </div>

      {/* Bekleyen İstekler */}
      <div
        onClick={() => navigate(`/pending-requests/${userId}`)}
        className="flex flex-col items-center cursor-pointer pr-4"
      >
        <Badge count={pendingCount} size="small" offset={[2, 0]}>
          <Avatar
            size="large"
            icon={<BellOutlined />}
            className="hover:text-red-500"
          />
        </Badge>
        <h2 className="mt-1 text-sm">İstekler</h2>
      </div>

      {/* Profil */}
      <div
        onClick={() => navigate("/profile")}
        className=" flex justify-end pr-4 cursor-pointer"
      >
        <div className="flex flex-col items-center">
          <Avatar
            size="large"
            icon={<UserOutlined />}
            className="hover:text-red-500"
          />
          <h2 className="mt-1 text-sm">Profil</h2>
        </div>
      </div>

      {/* Çıkış */}
      <div
        onClick={() => navigate("/login")}
        className="flex flex-col items-center cursor-pointer"
      >
        <Avatar
          size="large"
          icon={<LogoutOutlined />}
          className="hover:text-red-500"
        />
        <h2 className="mt-1 text-sm">Çıkış</h2>
      </div>
    </div>
  );
};

export default Header;
