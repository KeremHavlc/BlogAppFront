import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { toast } from "react-fox-toast";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

const UserStatisticsComponent = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [cumulativeData, setCumulativeData] = useState([]);
  const [roleData, setRoleData] = useState([]);

  useEffect(() => {
    fetchUserStats();
  }, []);

  const fetchUserStats = async () => {
    try {
      const response = await fetch("https://localhost:7291/api/Users/getAll", {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Kullanıcılar çekilemedi.");
      const users = await response.json();

      const monthMap = {};
      const cumulative = [];

      users.forEach((user) => {
        const date = new Date(user.createdAt);
        const key = `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}`;

        if (!monthMap[key]) monthMap[key] = 0;
        monthMap[key]++;
      });

      const sortedMonths = Object.keys(monthMap).sort();
      let total = 0;
      const cumulativeTemp = sortedMonths.map((month) => {
        total += monthMap[month];
        return { month, total };
      });

      const roleMap = {};
      users.forEach((user) => {
        const role = user.role || "Bilinmeyen";
        if (!roleMap[role]) roleMap[role] = 0;
        roleMap[role]++;
      });

      const pieData = Object.keys(roleMap).map((role, i) => ({
        name: role,
        value: roleMap[role],
      }));

      setMonthlyData(
        sortedMonths.map((m) => ({ month: m, count: monthMap[m] }))
      );
      setCumulativeData(cumulativeTemp);
      setRoleData(pieData);
    } catch (error) {
      toast.error("Hata: " + error.message);
    }
  };

  return (
    <div className="w-[1270px] min-h-[600px] bg-white mt-4 ml-[200px] border shadow-lg rounded-lg p-10">
      <h2 className="text-2xl font-semibold mb-6">Kullanıcı İstatistikleri</h2>

      <div className="grid grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="h-[300px]">
          <h3 className="mb-2 font-medium">Aylık Kayıtlar</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="h-[300px]">
          <h3 className="mb-2 font-medium">
            Toplam Kullanıcı Sayısı (Zamanla)
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={cumulativeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#82ca9d"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="h-[300px] col-span-2">
          <h3 className="mb-2 font-medium">Kullanıcı Rolleri Dağılımı</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={roleData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {roleData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default UserStatisticsComponent;
