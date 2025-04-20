import React from "react";
import Header from "../Components/Header";
import LeftBar from "../Components/LeftBar";
import PostComponent from "../Components/PostComponent";
import AddComments from "../Components/AddComments";
import AllComments from "../Components/AllComments";

const PostDetailsPage = () => {
  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      <div className="sticky top-0 z-50">
        <Header />
      </div>
      {/* Alt içerik alanı: Sidebar + Ana içerik */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sabit Sol Sidebar */}
        <div className="sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
          <LeftBar />
        </div>
        {/* Kaydırılabilir Ana içerik alanı */}
        <div className="flex-1 p-6 overflow-y-auto h-[calc(100vh-64px)]">
          <PostComponent />
          <AddComments />
          <AllComments />
        </div>
      </div>
    </div>
  );
};

export default PostDetailsPage;
