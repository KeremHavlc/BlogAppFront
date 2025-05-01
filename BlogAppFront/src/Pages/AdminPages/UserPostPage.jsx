import React from "react";
import AdminHeader from "../../Components/AdminComponent/AdminHeader";
import AdminLeftBar from "../../Components/AdminComponent/AdminLeftBar";
import UserPostsComponent from "../../Components/AdminComponent/UserPostsComponent";

const UserPostPage = () => {
  return (
    <>
      <div>
        <AdminHeader />
        <div className="flex flex-row">
          <AdminLeftBar />
          <UserPostsComponent />
        </div>
      </div>
    </>
  );
};

export default UserPostPage;
