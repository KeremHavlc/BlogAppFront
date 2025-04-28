import React from "react";
import Header from "../Components/Header";
import LeftBar from "../Components/LeftBar";
import AllCommunitiesComponent from "../Components/AllCommunitiesComponent";

const CommunitiesPage = () => {
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
          <div className="ml-[145px] mt-[50px]">
            <AllCommunitiesComponent />
          </div>
        </div>
      </div>
    </>
  );
};

export default CommunitiesPage;
