import React from "react";
import Header from "../Components/Header";
import LeftBar from "../Components/LeftBar";
import PendingRequestsComponent from "../Components/PendingRequestsComponent";

const PendingRequestsPage = () => {
  return (
    <>
      <div className="h-screen bg-gray-100 flex flex-col">
        <div className="sticky top-0 z-50">
          <Header />
        </div>
        <div className="flex flex-1 overflow-hidden">
          {/* Sabit Sol Sidebar */}
          <div className="sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
            <LeftBar />
          </div>
          <div className="ml-[145px] mt-[50px]">
            <PendingRequestsComponent />
          </div>
        </div>
      </div>
    </>
  );
};

export default PendingRequestsPage;
