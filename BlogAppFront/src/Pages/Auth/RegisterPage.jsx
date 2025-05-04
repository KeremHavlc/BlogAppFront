import React, { useState } from "react";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-fox-toast";
import logo from "../../Utilities/logo.png";
const RegisterPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [roleId, setRoleId] = useState("3fa85f64-5717-4562-b3fc-2c963f66afa6");
  const handleRegister = async () => {
    if (password !== repeatPassword) {
      toast.error("Şifreler eşleşmiyor!");
      return;
    }

    try {
      // POST isteği gönderiyoruz
      const res = await fetch("https://localhost:7291/api/Auths/register", {
        method: "POST",
        body: JSON.stringify({
          email,
          username,
          password,
          roleId,
        }),
        headers: { "Content-Type": "application/json; charset=UTF-8" },
      });

      const data = await res.text();
      console.log(data);
      // Başarılı ise
      if (res.status === 200 || res.status === 201) {
        toast.success("Kayıt başarılı! Giriş yapabilirsiniz.");
        navigate("/login");
      } else {
        // Backend'den gelen hata mesajını kontrol et
        toast.error(data || "Kayıt sırasında bir hata oluştu.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Sunucuya bağlanılamıyor. Lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="min-h-screen select-none flex flex-col items-center justify-center bg-gradient-to-br from-red-400 to-pink-500 px-4">
      <div className="font-GF text-8xl mb-10 text-white">
        <img
          src={logo}
          alt=""
          className="w-32 h-auto rounded-xl shadow-xl select-none"
        />
      </div>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 space-y-6">
        <h2 className="font-GF text-3xl font-bold text-center text-gray-800">
          Kayıt Ol
        </h2>

        <div className="space-y-4">
          <div className="flex items-center border border-gray-300 rounded-lg bg-gray-100 px-3 py-2 focus-within:ring-2 focus-within:ring-red-400">
            <UserOutlined className="text-gray-500 text-lg mr-2" />
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Kullanıcı Adı"
              className="bg-transparent outline-none w-full"
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-lg bg-gray-100 px-3 py-2 focus-within:ring-2 focus-within:ring-red-400">
            <MailOutlined className="text-gray-500 text-lg mr-2" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="E-mail"
              className="bg-transparent outline-none w-full"
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-lg bg-gray-100 px-3 py-2 focus-within:ring-2 focus-within:ring-red-400">
            <LockOutlined className="text-gray-500 text-lg mr-2" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Şifre"
              className="bg-transparent outline-none w-full"
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-lg bg-gray-100 px-3 py-2 focus-within:ring-2 focus-within:ring-red-400">
            <LockOutlined className="text-gray-500 text-lg mr-2" />
            <input
              onChange={(e) => setRepeatPassword(e.target.value)}
              type="password"
              placeholder="Şifre Tekrar"
              className="bg-transparent outline-none w-full"
            />
          </div>
        </div>

        <button
          onClick={handleRegister}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg transition duration-300"
        >
          Kayıt Ol
        </button>

        <div className="text-center text-sm text-gray-600 mt-4">
          Zaten Hesabınız Var mı?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-red-500 hover:underline"
          >
            Giriş Yap
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
