import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1515169067865-5387ec356754?auto=format&fit=crop&w=1950&q=80"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          Sosyal Medyanın Yeni Yüzü
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl animate-fade-in delay-150">
          Yeni insanlarla tanış, topluluklara katıl, paylaşımlarını yap. Hepsi
          burada!
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/home")}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl text-lg font-semibold transition duration-300"
          >
            Keşfet
          </button>
          <button
            onClick={() => navigate("/login")}
            className="bg-transparent border border-white hover:bg-white hover:text-black px-8 py-3 rounded-xl text-lg font-semibold transition duration-300"
          >
            Giriş Yap
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
