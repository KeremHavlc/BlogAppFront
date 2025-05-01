import React from "react";
import AdminHeader from "../../Components/AdminComponent/AdminHeader";
import AdminLeftBar from "../../Components/AdminComponent/AdminLeftBar";
import CommunityStatisticsComponent from "../../Components/AdminComponent/CommunityStatisticsComponent";

const CommunityStatisticsPage = () => {
  return (
    <>
      <div>
        <AdminHeader />
        <div className="flex flex-row">
          <AdminLeftBar />
          <CommunityStatisticsComponent />
        </div>
      </div>
    </>
  );
};

export default CommunityStatisticsPage;
