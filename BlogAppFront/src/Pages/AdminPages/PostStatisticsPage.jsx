import React from "react";
import PostStatisticsComponent from "../../Components/AdminComponent/PostStatisticsComponent";
import AdminHeader from "../../Components/AdminComponent/AdminHeader";
import AdminLeftBar from "../../Components/AdminComponent/AdminLeftBar";

const PostStatisticsPage = () => {
  return (
    <>
      <div>
        <AdminHeader />
        <div className="flex flex-row">
          <AdminLeftBar />
          <PostStatisticsComponent />
        </div>
      </div>
    </>
  );
};

export default PostStatisticsPage;
