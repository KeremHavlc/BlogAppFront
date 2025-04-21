import React from "react";
import Header from "../Components/Header";
import LeftBar from "../Components/LeftBar";
import UserInfo from "../Components/UserInfo";

const ProfilePage = () => {
  return (
    <>
      <div className="h-screen bg-gray-100 flex flex-col">
        {/* Sabit Header */}
        <div className="sticky top-0 z-50">
          <Header />
        </div>
        {/* Sabit Sol Sidebar */}
        <div className="sticky top-16 h-[calc(100vh-64px)] overflow-y-auto flex flex-row">
          <LeftBar />
          <div className="ml-[145px] mt-[50px]">
            <UserInfo />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
