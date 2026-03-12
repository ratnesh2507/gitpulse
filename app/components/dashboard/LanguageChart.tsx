"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#3fb950",
  "#58a6ff",
  "#e3b341",
  "#bc8cff",
  "#ff7b72",
  "#79c0ff",
  "#56d364",
  "#ffa657",
];

type Props = {
  data: { name: string; count: number }[];
};

export default function LanguageChart({ data }: Props) {
  return (
    <div className="p-6 rounded-2xl border border-[#30363d] bg-[#161b22] h-full">
      <h2 className="text-white font-semibold mb-1">Top Languages</h2>
      <p className="text-[#8b949e] text-sm mb-4">By repository count</p>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={3}
            dataKey="count"
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#161b22",
              border: "1px solid #30363d",
              borderRadius: "8px",
              color: "#fff",
            }}
          />
          <Legend
            formatter={(value) => (
              <span style={{ color: "#8b949e", fontSize: 12 }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
