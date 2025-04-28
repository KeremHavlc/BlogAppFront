import React, { useEffect, useState } from "react";
import FollowButton from "./FollowButton";
import { StarOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import CommunitiesComponent from "./CommunitiesComponent";
import { useNavigate } from "react-router-dom";

const RightBar = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://localhost:7291/api/Users/getAll", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();

        const shuffled = data.sort(() => 0.5 - Math.random());
        const randomUsers = shuffled.slice(0, 3);

        setUsers(randomUsers);
      } catch (err) {
        console.error("Kullanıcılar çekilemedi:", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="w-[320px] h-[700px] bg-white border ml-[95px] mt-[50px] shadow-lg rounded-lg p-6 mr-[95px]">
      {/* Önerilen Topluluklar */}
      <div className="space-y-6 select-none">
        <div className="flex font-bold items-center gap-4 text-lg hover:text-red-500 cursor-pointer">
          <StarOutlined />
          <h2>Önerilen Topluluklar</h2>
        </div>
        <div className="flex flex-col">
          <CommunitiesComponent />
          <h2
            onClick={() => navigate("/communities")}
            className="hover:text-blue-500 hover:underline select-none cursor-pointer w-[100px]"
          >
            Tümünü Gör
          </h2>
        </div>
      </div>
      {/* Ayraç */}
      <div className="border-t border-gray-300 w-[250px] my-10 select-none" />
      {/* Önerilen Kullanıcılar */}
      <div className="space-y-6 select-none">
        <div className="flex font-bold items-center gap-4 text-lg hover:text-red-500 cursor-pointer">
          <h2>Önerilen Kullanıcılar</h2>
        </div>

        {users.map((user, index) => (
          <div key={index} className="flex justify-between">
            <div>
              <h6 className="text-ellipsis overflow-hidden whitespace-nowrap">
                {user.username}
              </h6>
              <h6 className="whitespace-nowrap overflow-hidden">
                @
                {user.email.length > 6
                  ? user.email.slice(0, 6) + "..."
                  : user.email}
              </h6>
            </div>
            <div>
              <FollowButton user={user} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightBar;
