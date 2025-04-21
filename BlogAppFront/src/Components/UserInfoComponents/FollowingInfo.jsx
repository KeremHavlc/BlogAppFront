import { UserOutlined } from "@ant-design/icons";
import React from "react";

const FollowingInfo = () => {
  return (
    <>
      <div className="p-2 bg-green-100 rounded-full text-green-600">
        <UserOutlined className="text-2xl" />
      </div>
      <div>
        <div className="text-xl font-semibold">98</div>
        <div className="text-gray-500 text-sm">Takip Edilen</div>
      </div>
    </>
  );
};

export default FollowingInfo;
