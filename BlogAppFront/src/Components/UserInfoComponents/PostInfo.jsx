import { FileTextOutlined } from "@ant-design/icons";
import React from "react";

const PostInfo = ({ postInfo }) => {
  const postCount = Array.isArray(postInfo) ? postInfo.length : 0;
  console.log("Gelen postInfo:", postInfo);
  return (
    <>
      <div className="p-2 bg-indigo-100 rounded-full text-indigo-600">
        <FileTextOutlined className="text-2xl" />
      </div>
      <div>
        <div className="text-xl font-semibold">
          {postCount === 0 ? "Hiç gönderi yok" : postCount}
        </div>
        <div className="text-gray-500 text-sm">Gönderi</div>
      </div>
    </>
  );
};

export default PostInfo;
