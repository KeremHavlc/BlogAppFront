import { LockOutlined, UserOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-fox-toast";

const AdminLoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://localhost:7291/api/Admin/loginadmin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        toast.error("Giriş başarısız! Lütfen bilgileri kontrol et.");
        return;
      }

      const data = await response.json();
      toast.success("Başarıyla giriş yapıldı!");
      navigate(`/adminhome`);
    } catch (error) {
      console.error(error);
      toast.error("Bir hata oluştu!");
    }
  };

  return (
    <div className="min-h-screen select-none flex flex-col items-center justify-center bg-gradient-to-br from-red-400 to-pink-500 px-4">
      <div className="font-GF text-8xl mb-10 text-white">Admin</div>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 space-y-6">
        <h2 className="font-GF text-3xl font-bold text-center text-gray-800">
          Admin Giriş
        </h2>

        <div className="space-y-4">
          <div className="flex items-center border border-gray-300 rounded-lg bg-gray-100 px-3 py-2 focus-within:ring-2 focus-within:ring-red-400">
            <UserOutlined className="h-5 w-5 text-gray-500 mr-2" />
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Kullanıcı Adı"
              className="bg-transparent outline-none w-full"
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-lg bg-gray-100 px-3 py-2 focus-within:ring-2 focus-within:ring-red-400">
            <LockOutlined className="h-5 w-5 text-gray-500 mr-2" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Şifre"
              className="bg-transparent outline-none w-full"
            />
          </div>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg transition duration-300"
        >
          Giriş Yap
        </button>
      </div>
    </div>
  );
};

export default AdminLoginPage;
