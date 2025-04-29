import React from "react";
import AdminHeader from "../../Components/AdminComponent/AdminHeader";
import AdminLeftBar from "../../Components/AdminComponent/AdminLeftBar";
import AddCommunityComponent from "../../Components/AdminComponent/AddCommunityComponent";

const AddComunityPage = () => {
  return (
    <>
      <div>
        <AdminHeader />
        <div className="flex flex-row">
          <AdminLeftBar />
          <AddCommunityComponent />
        </div>
      </div>
    </>
  );
};

export default AddComunityPage;
