import {
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  CheckSquare,
  Clock,
  ListChecks,
} from "lucide-react";
import React from "react";

const stats = [
  {
    title: "Total Tasks",
    value: "1,248",
    change: "+8.2%",
    trend: "up",
    icon: ListChecks,
    color: "from-blue-400 to-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    textColor: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Completed Tasks",
    value: "932",
    change: "+5.6%",
    trend: "up",
    icon: CheckSquare,
    color: "from-emerald-400 to-emerald-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
    textColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Pending Tasks",
    value: "276",
    change: "-2.1%",
    trend: "down",
    icon: Clock,
    color: "from-amber-400 to-amber-600",
    bgColor: "bg-amber-50 dark:bg-amber-900/20",
    textColor: "text-amber-600 dark:text-amber-400",
  },
  {
    title: "Productivity Rate",
    value: "84.3%",
    change: "+3.4%",
    trend: "up",
    icon: TrendingUp,
    color: "from-purple-400 to-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    textColor: "text-purple-600 dark:text-purple-400",
  },
];
const StatusGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stats, index) => (
        <div
          key={index}
          className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl hover:shadow-slate-200/20 dark:hover:shadow-slate-900/20 transition-all duration-200 group"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                {stats.title}
              </p>
              <p className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
                {stats.value}
              </p>
              <div className="flex items-center space-x-2">
                {stats.trend === "up" ? (
                  <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-500" />
                )}
                <span
                  className={`${
                    stats.trend === "up" ? "text-emerald-500" : "text-red-500"
                  }`}
                >
                  {stats.change}
                </span>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  vs Last Month
                </span>
              </div>
            </div>
            <div
              className={`p-4 rounded-xl group-hover:scale-110 transition-all duration-200 ${stats.bgColor}`}
            >
              {<stats.icon className={`h-6 w-6 ${stats.textColor}`} />}
            </div>
          </div>
          {/* Progress Bar  */}
          <div className="mt-4 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`w-full h-2 bg-linear-to-r rounded-full transition-all duration-100 ${stats.color}`}
              style={{ width: stats.trend === "up" ? "75%" : "45%" }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatusGrid;
