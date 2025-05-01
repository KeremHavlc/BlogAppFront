import React, { useEffect, useState } from "react";
import { Card } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const CommunityStatisticsComponent = () => {
  const [chartData, setChartData] = useState([]);
  console.log(chartData);
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const userCountRes = await fetch(
          "https://localhost:7291/api/CommunityUsers/getAllCommunityUsersCount",
          {
            credentials: "include",
          }
        );
        const userCounts = await userCountRes.json();

        console.log(userCounts);

        const userCountsArray = Object.entries(userCounts).map(
          ([communityId, count]) => ({
            communityId,
            count,
          })
        );

        const dataWithNames = await Promise.all(
          userCountsArray.map(async (item) => {
            const communityRes = await fetch(
              `https://localhost:7291/api/Communities/getCommunityById?id=${item.communityId}`,
              { credentials: "include" }
            );
            const communityData = await communityRes.json();

            const postRes = await fetch(
              `https://localhost:7291/api/CommunityPosts/getPostByCommunity?communityId=${item.communityId}`,
              { credentials: "include" }
            );
            const posts = await postRes.json();

            return {
              name: communityData.name,
              users: item.count,
              posts: posts.length,
            };
          })
        );

        setChartData(dataWithNames);
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="w-[1270px] bg-gray-200 mt-4 select-none ml-[200px] border shadow-lg rounded-lg p-10">
      <h2 className="text-xl font-semibold mb-6">Topluluk İstatistikleri</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card title="Topluluklara Göre Kullanıcı Sayısı">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="users" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Topluluklara Göre Post Sayısı">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="posts" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};

export default CommunityStatisticsComponent;
