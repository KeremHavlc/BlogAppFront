import { CommentOutlined } from "@ant-design/icons";
import React from "react";

const CommentInfo = () => {
  return (
    <>
      <div className="p-2 bg-pink-100 rounded-full text-pink-600">
        <CommentOutlined className="text-2xl" />
      </div>
      <div>
        <div className="text-xl font-semibold">120</div>
        <div className="text-gray-500 text-sm">Yorum</div>
      </div>
    </>
  );
};

export default CommentInfo;
