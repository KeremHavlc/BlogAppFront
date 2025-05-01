import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Pagination } from "antd";
import { toast } from "react-fox-toast";

const PostStatisticsComponent = () => {
  const [postsData, setPostsData] = useState([]);
  const [likesData, setLikesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://localhost:7291/api/Posts/getall", {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Postlar çekilemedi.");
      const posts = await response.json();
      setPostsData(posts);
    } catch (error) {
      toast.error("Hata: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchLikes = async () => {
    if (postsData.length === 0) return;
    try {
      const postsWithLikes = await Promise.all(
        postsData.map(async (post) => {
          const response = await fetch(
            `https://localhost:7291/api/PostLikes/getAllPostLikes?postId=${post.id}`,
            { credentials: "include" }
          );
          const likes = await response.json();
          return { postId: post.id, likesCount: likes.length };
        })
      );
      setLikesData(postsWithLikes);
    } catch (error) {
      toast.error("Hata: " + error.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (postsData.length > 0) {
      fetchLikes();
    }
  }, [postsData]);

  const postsPerMonth = postsData.reduce((acc, post) => {
    const month = new Date(post.createdAt).toLocaleString("default", {
      month: "short",
    });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const postsPerMonthData = Object.entries(postsPerMonth).map(
    ([month, count]) => ({
      month,
      count,
    })
  );

  const likesDataForGraph = likesData.map((item) => ({
    name: item.postId.slice(0, 6) + "...",
    value: item.likesCount,
  }));

  const renderChart = () => {
    if (currentPage === 1) {
      return (
        <>
          <h3 className="text-lg mb-2">Postların Aylara Göre Dağılımı</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={postsPerMonthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </>
      );
    } else if (currentPage === 2) {
      return (
        <>
          <h3 className="text-lg mb-2">Postların Beğeni Sayısı</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={likesDataForGraph}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </>
      );
    } else if (currentPage === 3) {
      return (
        <>
          <h3 className="text-lg mb-2">Post Beğeni Dağılımı (Pie)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Tooltip />
              <Pie
                data={likesDataForGraph}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={150}
                label
              >
                {likesDataForGraph.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </>
      );
    }
  };

  return (
    <div className="w-[1270px] bg-white mt-4 select-none ml-[200px] border shadow-lg rounded-lg p-10">
      <h2 className="text-xl font-semibold mb-6">
        Post İstatistikleri Dashboard
      </h2>
      {loading ? <p>Yükleniyor...</p> : renderChart()}
      <div className="mt-6 flex justify-center">
        <Pagination
          current={currentPage}
          total={3}
          pageSize={1}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default PostStatisticsComponent;
