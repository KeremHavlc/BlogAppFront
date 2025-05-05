import React from "react";
import { useNavigate } from "react-router-dom";
import image1 from "../Utilities/landing1.png";
import image2 from "../Utilities/landing2.png";
import image3 from "../Utilities/landing3.png";
import backgroundImage from "../Utilities/background.png";
import { toast } from "react-fox-toast";
const LandingPage = () => {
  const navigate = useNavigate();
  const handleCopyEmail = () => {
    navigator.clipboard.writeText("keremhvlc@gmail.com");
    toast.success("Mail panoya kopyalandı", {
      position: "top-right",
      style: {
        marginRight: "500px",
        marginTop: "2px",
      },
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="w-full bg-white shadow-sm fixed top-0 left-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-red-600">Parrot</h1>
          <nav className="space-x-6 text-gray-700">
            <button onClick={handleCopyEmail} className="hover:text-red-600">
              İletişim
            </button>
            <button
              onClick={() => navigate("/login")}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
            >
              Giriş Yap
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <img
          src={backgroundImage} // veya "/background.png"
          alt="Landing Background"
          className="absolute inset-0 w-[2000px] h-[2000px] object-cover"
        />
        <div className="absolute inset-0 bg-gray-900 bg-opacity-60" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 flex flex-col items-center justify-center h-full text-white text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Sosyal Medyada Yeni Bir Dönem
          </h2>
          <p className="text-lg md:text-2xl text-gray-200 mb-8">
            Özgürce paylaş, keşfet, bağlantı kur. Yepyeni bir deneyim seni
            bekliyor!
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate("/register")}
              className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-lg font-semibold transition"
            >
              Hemen Katıl
            </button>
            <button
              onClick={() => {
                const element = document.getElementById("features");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="border border-white hover:bg-white hover:text-black px-6 py-3 rounded-lg font-semibold transition"
            >
              Keşfet
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-12 text-gray-800">
            Neler Sunuyoruz?
          </h3>
          <div className="grid md:grid-cols-3 gap-10">
            {/* Kart 1 */}
            <div className="relative h-64 rounded-xl overflow-hidden shadow hover:shadow-lg transition">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${image1})` }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-40" />
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
                <h4 className="text-xl font-semibold mb-2">Topluluklar</h4>
                <p className="text-sm">
                  İlgi alanına uygun gruplara katıl, yeni insanlarla tanış.
                </p>
              </div>
            </div>

            {/* Kart 2 */}
            <div className="relative h-64 rounded-xl overflow-hidden shadow hover:shadow-lg transition">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${image2})` }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-40" />
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
                <h4 className="text-xl font-semibold mb-2">Anlık Paylaşım</h4>
                <p className="text-sm">
                  Fotoğraflarını, fikirlerini, videolarını kolayca paylaş.
                </p>
              </div>
            </div>

            {/* Kart 3 */}
            <div className="relative h-64 rounded-xl overflow-hidden shadow hover:shadow-lg transition">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${image3})` }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-40" />
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
                <h4 className="text-xl font-semibold mb-2">Güvenli Ortam</h4>
                <p className="text-sm">
                  Verilerin güvende. Kapsamlı gizlilik ve güvenlik önlemleriyle
                  korunuyorsun.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-red-500 text-white py-20 text-center">
        <h3 className="text-3xl md:text-4xl font-bold mb-4">
          Hemen katıl, sosyal medyayı yeniden keşfet!
        </h3>
        <p className="mb-8 text-lg">
          ParrotMedia ailesine sen de katıl ve farkı hisset.
        </p>
        <button
          onClick={() => navigate("/register")}
          className="bg-white text-red-600 px-8 py-3 rounded-xl font-semibold text-lg hover:bg-gray-100 transition"
        >
          Üye Ol
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-600 text-gray-300 py-10 mt-auto">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} ParrotMedia. Tüm hakları saklıdır.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">
              Gizlilik
            </a>
            <a href="#" className="hover:text-white">
              Şartlar
            </a>
            <a href="#" className="hover:text-white">
              Destek
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
