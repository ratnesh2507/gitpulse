"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  data: { date: string; count: number }[];
};

export default function ActivityChart({ data }: Props) {
  return (
    <div className="p-6 rounded-2xl border border-[#30363d] bg-[#161b22] h-full">
      <h2 className="text-white font-semibold mb-1">Activity</h2>
      <p className="text-[#8b949e] text-sm mb-6">Events in the last 14 days</p>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="activityGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#238636" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#238636" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#21262d" />
          <XAxis
            dataKey="date"
            tick={{ fill: "#8b949e", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#8b949e", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#161b22",
              border: "1px solid #30363d",
              borderRadius: "8px",
              color: "#fff",
            }}
          />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#3fb950"
            strokeWidth={2}
            fill="url(#activityGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
