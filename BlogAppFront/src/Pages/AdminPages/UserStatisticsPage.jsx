import React from "react";
import AdminHeader from "../../Components/AdminComponent/AdminHeader";
import AdminLeftBar from "../../Components/AdminComponent/AdminLeftBar";
import UserStatisticsComponent from "../../Components/AdminComponent/UserStatisticsComponent";

const UserStatisticsPage = () => {
  return (
    <>
      <div>
        <AdminHeader />
        <div className="flex flex-row">
          <AdminLeftBar />
          <UserStatisticsComponent />
        </div>
      </div>
    </>
  );
};

export default UserStatisticsPage;
