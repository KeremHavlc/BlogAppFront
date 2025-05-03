import React from "react";
import Header from "../Components/Header";
import LeftBar from "../Components/LeftBar";
import CommunityDetailsHeader from "../Components/CommunityDetailsComponent/CommunityDetailsHeader";

const CommunityPostDetailsPage = () => {
  return (
    <>
      <div className="h-screen bg-gray-100 flex flex-col">
        {/* Sabit Header */}
        <div className="sticky top-0 z-50">
          <Header />
        </div>

        {/* Alt içerik alanı: Sidebar + Ana içerik */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sabit Sol Sidebar */}
          <div className="sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
            <LeftBar />
          </div>

          {/* Kaydırılabilir Ana içerik alanı */}
          <div className="flex-1 p-6 overflow-y-auto h-[calc(100vh-64px)]">
            <CommunityDetailsHeader />
          </div>
        </div>
      </div>
    </>
  );
};

export default CommunityPostDetailsPage;
