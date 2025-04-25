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
    <div className="flex items-center gap-4 bg-purple-50 border border-purple-200 p-4 rounded-xl hover:shadow-md transition">
      <div className="p-2 bg-purple-100 rounded-full text-purple-600">
        <CalendarOutlined className="text-2xl" />
      </div>
      <div>
        <div className="text-md font-semibold">{formatted}</div>
        <div className="text-gray-500 text-sm">Hesap Açılış</div>
      </div>
    </div>
  );
};

export default AccountOpening;
