import React from "react";
import { Link } from "react-router-dom";
import notFoundImage from "../utilities/notfound.png";
import logo from "../Utilities/horizontal.png";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      {/* Logo */}
      <img src={logo} alt="Logo" className="" />

      {/* Not Found Image */}
      <img src={notFoundImage} alt="Not Found" className="w-96 h-auto mb-8" />

      <p className="text-2xl text-gray-600 mb-6">
        Üzgünüz, aradığınız sayfa bulunamadı.
      </p>
      <Link to="/" className="text-red-600 underline font-bold">
        Anasayfaya dön
      </Link>
    </div>
  );
};

export default NotFoundPage;
