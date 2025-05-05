import React, { useState } from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-fox-toast";
import logo from "../../Utilities/logo.png";
import { motion } from "framer-motion";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const onFinish = async (values) => {
    try {
      const res = await fetch("https://localhost:7291/api/Auths/login", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json; charset=UTF-8" },
      });
      if (!res.ok) {
        const data = await res.text();
        if (data.message) {
          toast.error(data.message);
        } else {
          toast.error("Kullanıcı adı veya şifre hatalı!");
        }
        return;
      }
      const data = await res.json();
      const token = data.accessToken;
      navigate("/home");
      toast.success("Giriş Başarılı!");
    } catch (error) {
      console.log(error);
      toast.error("Bir hata oluştu, lütfen tekrar deneyin!");
    }
  };

  return (
    <motion.div
      initial={{ x: "-100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="min-h-screen select-none flex flex-col items-center justify-center bg-gradient-to-br from-red-400 to-pink-500 px-4">
        <div className="font-GF text-8xl mb-10 text-white">
          <img src={logo} alt="" className="w-32 h-auto rounded-xl shadow-xl" />
        </div>
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 space-y-6">
          <h2 className="font-GF text-3xl font-bold text-center text-gray-800">
            Giriş Yap
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
            onClick={() => onFinish({ username, password })}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg transition duration-300"
          >
            Giriş Yap
          </button>

          <div className="text-center text-sm text-gray-600 mt-4">
            Hesabınız yok mu?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-red-500 hover:underline"
            >
              Kayıt Ol
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPage;
