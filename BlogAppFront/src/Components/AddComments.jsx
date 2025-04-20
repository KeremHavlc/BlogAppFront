import React, { useState } from "react";
import { SendOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

const AddComments = () => {
  const [comment, setComment] = useState("");

  return (
    <div className="w-[800px] min-h-[100px] border bg-white ml-[120px] mt-6 rounded-lg p-4 shadow-md">
      <div className="flex items-start gap-3">
        {/* Kullanıcı Avatarı */}
        <Avatar size="large" icon={<UserOutlined />} />

        {/* Yorum Alanı */}
        <div className="flex-1">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Yorumunuzu yazın..."
            rows={1}
            maxLength={500}
            className="w-full resize-none overflow-hidden border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all"
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
          ></textarea>

          {/* Paylaş Butonu */}
          <div className="flex justify-end mt-2">
            <button
              className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
              onClick={() => {
                if (comment.trim()) {
                  console.log("Yorum paylaşıldı:", comment);
                  setComment(""); // Yorum sıfırla
                }
              }}
            >
              <SendOutlined />
              <span>Paylaş</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddComments;
