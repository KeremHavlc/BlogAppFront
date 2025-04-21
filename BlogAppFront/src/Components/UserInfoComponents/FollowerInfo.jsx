import { TeamOutlined } from "@ant-design/icons";
import React from "react";

const FollowerInfo = () => {
  return (
    <>
      <div className="p-2 bg-blue-100 rounded-full text-blue-600">
        <TeamOutlined className="text-2xl" />
      </div>
      <div>
        <div className="text-xl font-semibold">124</div>
        <div className="text-gray-500 text-sm">Takipçi</div>
      </div>
    </>
  );
};

export default FollowerInfo;
