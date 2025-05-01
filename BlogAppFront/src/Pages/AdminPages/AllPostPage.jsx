import React from "react";
import AdminHeader from "../../Components/AdminComponent/AdminHeader";
import AdminLeftBar from "../../Components/AdminComponent/AdminLeftBar";
import AllPostComponent from "../../Components/AdminComponent/AllPostComponent";

const AllPostPage = () => {
  return (
    <>
      <div>
        <AdminHeader />
        <div className="flex flex-row">
          <AdminLeftBar />
          <AllPostComponent />
        </div>
      </div>
    </>
  );
};

export default AllPostPage;
