import React from "react";
import AdminLeftBar from "../../Components/AdminComponent/AdminLeftBar";
import AdminHeader from "../../Components/AdminComponent/AdminHeader";
import AllCommunityComponent from "../../Components/AdminComponent/AllCommunityComponent";

const AllCommunitYPage = () => {
  return (
    <>
      <div>
        <AdminHeader />
        <div className="flex flex-row">
          <AdminLeftBar />
          <AllCommunityComponent />
        </div>
      </div>
    </>
  );
};

export default AllCommunitYPage;
