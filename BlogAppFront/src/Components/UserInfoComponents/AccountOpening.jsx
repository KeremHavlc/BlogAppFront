import { CalendarOutlined } from "@ant-design/icons";
import React from "react";

const AccountOpening = ({ accountOpening }) => {
  const date = new Date(accountOpening);
  const formatted = date.toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <div className="p-2 bg-purple-100 rounded-full text-purple-600">
        <CalendarOutlined className="text-2xl" />
      </div>
      <div>
        <div className="text-md font-semibold">{formatted}</div>
        <div className="text-gray-500 text-sm">Hesap Açılış</div>
      </div>
    </>
  );
};

export default AccountOpening;
