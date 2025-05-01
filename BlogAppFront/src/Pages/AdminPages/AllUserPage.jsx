import React from "react";
import AdminHeader from "../../Components/AdminComponent/AdminHeader";
import AdminLeftBar from "../../Components/AdminComponent/AdminLeftBar";
import AllUsersComponent from "../../Components/AdminComponent/AllUsersComponent";

const AllUserPage = () => {
  return (
    <>
      <div>
        <AdminHeader />
        <div className="flex flex-row">
          <AdminLeftBar />
          <AllUsersComponent />
        </div>
      </div>
    </>
  );
};

export default AllUserPage;
