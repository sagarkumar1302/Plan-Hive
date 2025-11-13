import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const TaskPieChart = () => {
  // Dummy task data
  const data = [
    { name: "Completed", value: 15 },
    { name: "In Progress", value: 10 },
    { name: "Pending", value: 65 },
    { name: "Overdue", value: 10 },
  ];

  // Colors for the pie segments
  const COLORS = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444"];

  return (
    <div className="bg-white dark:bg-slate-800 backdrop-blur-xl rounded-b-2xl p-6 border border-slate-200/50 dark:border-slate-700/50">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white">
          Tasks by Category
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Overview of task distribution
        </p>
      </div>

      <div className="h-64 sm:h-80 md:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius="75%"
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              style={{fontSize: "14px"}}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="none"
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255,255,255,0.9)",
                borderRadius: "10px",
                border: "1px solid #E5E7EB",
              }}
              itemStyle={{ color: "#1F2937" }}
            />
            <Legend
              verticalAlign="bottom"
              height={56}
              wrapperStyle={{
                color: "var(--text-color)",
                fontSize: "0.875rem",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TaskPieChart;
