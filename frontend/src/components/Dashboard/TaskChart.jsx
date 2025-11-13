import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { month: "Jan", completed: 120, pending: 45 },
  { month: "Feb", completed: 98, pending: 52 },
  { month: "Mar", completed: 135, pending: 40 },
  { month: "Apr", completed: 150, pending: 35 },
  { month: "May", completed: 165, pending: 30 },
  { month: "Jun", completed: 175, pending: 25 },
  { month: "Jul", completed: 190, pending: 20 },
  { month: "Aug", completed: 200, pending: 18 },
  { month: "Sep", completed: 180, pending: 22 },
  { month: "Oct", completed: 170, pending: 28 },
  { month: "Nov", completed: 160, pending: 32 },
  { month: "Dec", completed: 210, pending: 15 },
];

const TaskChart = () => {
  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-bl-2xl border border-slate-200/50 dark:border-slate-700/50 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">
            Task Overview
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Monthly Task Summary
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-linear-to-r from-[#BF092F] to-[#8C00FF] rounded-full"></div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              <span>Completed Tasks</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-linear-to-r from-slate-500 to-slate-400 rounded-full"></div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              <span>Pending Tasks</span>
            </div>
          </div>
        </div>
      </div>

      <div className="h-64 sm:h-80 md:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 8, right: 20, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8C00FF" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#8C00FF" stopOpacity={0.08} />
              </linearGradient>
              <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#64748b" stopOpacity={0.45} />
                <stop offset="95%" stopColor="#64748b" stopOpacity={0.06} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e6edf3"
              opacity={0.6}
            />
            <XAxis dataKey="month" tick={{ fill: "#475569" }} />
            <YAxis tick={{ fill: "#475569" }} />
            <Tooltip
              formatter={(value, name) => [
                `${value} tasks`,
                name.charAt(0).toUpperCase() + name.slice(1),
              ]}
              contentStyle={{
                background: "rgba(255,255,255,0.95)",
                borderRadius: 8,
                border: "1px solid rgba(15,23,42,0.05)",
              }}
            />
            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ paddingBottom: 8 }}
            />
            <Area
              type="monotone"
              dataKey="completed"
              stroke="#8C00FF"
              strokeWidth={2}
              fill="url(#colorCompleted)"
            />
            <Area
              type="monotone"
              dataKey="pending"
              stroke="#64748b"
              strokeWidth={2}
              fill="url(#colorPending)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TaskChart;
