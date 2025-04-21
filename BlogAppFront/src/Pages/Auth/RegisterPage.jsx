import React from "react";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const RegisterPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-400 to-pink-500 px-4">
      <div className="font-GF text-8xl mb-10 text-white">LOGO</div>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 space-y-6">
        <h2 className="font-GF text-3xl font-bold text-center text-gray-800">
          Kayıt Ol
        </h2>

        <div className="space-y-4">
          <div className="flex items-center border border-gray-300 rounded-lg bg-gray-100 px-3 py-2 focus-within:ring-2 focus-within:ring-red-400">
            <UserOutlined className="h-5 w-5 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Kullanıcı Adı"
              className="bg-transparent outline-none w-full"
            />
          </div>
          <div className="flex items-center border border-gray-300 rounded-lg bg-gray-100 px-3 py-2 focus-within:ring-2 focus-within:ring-red-400">
            <MailOutlined className="h-5 w-5 text-gray-500 mr-2" />
            <input
              type="email"
              placeholder="E-mail"
              className="bg-transparent outline-none w-full"
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-lg bg-gray-100 px-3 py-2 focus-within:ring-2 focus-within:ring-red-400">
            <LockOutlined className="h-5 w-5 text-gray-500 mr-2" />
            <input
              type="password"
              placeholder="Şifre"
              className="bg-transparent outline-none w-full"
            />
          </div>
          <div className="flex items-center border border-gray-300 rounded-lg bg-gray-100 px-3 py-2 focus-within:ring-2 focus-within:ring-red-400">
            <LockOutlined className="h-5 w-5 text-gray-500 mr-2" />
            <input
              type="password"
              placeholder="Şifre Tekrar"
              className="bg-transparent outline-none w-full"
            />
          </div>
        </div>

        <button className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg transition duration-300">
          Kayıt Ol
        </button>

        <div className="text-center text-sm text-gray-600 mt-4">
          Zaten Hesabınız Var mı ?{" "}
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
