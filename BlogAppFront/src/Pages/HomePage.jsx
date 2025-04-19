import React from "react";
import Header from "../Components/Header";
import LeftBar from "../Components/LeftBar";

const HomePage = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-100">
        {/* Üst Header */}
        <Header />

        {/* Alt içerik alanı: Sidebar + Ana içerik */}
        <div className="flex">
          {/* Sol Sidebar */}
          <LeftBar />

          {/* Ana içerik alanı */}
          <div className="flex-1 p-6">
            <h1 className="text-2xl font-semibold"></h1>
            {/* Buraya içerik eklersin */}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
