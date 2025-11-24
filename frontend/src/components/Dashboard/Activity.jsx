import React from "react";
import {
  Clock,
  CheckCircle,
  AlertTriangle,
  PlusCircle,
  Edit3,
  Trash2,
} from "lucide-react";

const Activity = ({ tasks, onPageChange }) => {
  // Safety if tasks is undefined
  const safeTasks = Array.isArray(tasks) ? tasks : [];

  // Sort tasks by latest updatedAt (fallback to createdAt)
  const recentActivities = safeTasks
    .map((task) => ({
      ...task,
      lastChange: task.updatedAt || task.createdAt,
    }))
    .sort((a, b) => new Date(b.lastChange) - new Date(a.lastChange))
    .slice(0, 5); // show latest 5 changes only

  // Detect what happened — created, updated, completed, etc.
  const detectActivityType = (task) => {
    if (task.isCompleted) return "Task completed";
    if (task.updatedAt && task.updatedAt !== task.createdAt)
      return "Task updated";
    return "New task added";
  };

  const getIcon = (task) => {
    if (task.isCompleted)
      return <CheckCircle className="w-5 h-5 text-emerald-500" />;
    return <Edit3 className="w-5 h-5 text-blue-500" />;
  };

  const getColor = (task) => {
    if (task.isCompleted) return "bg-emerald-100 dark:bg-emerald-900/40";
    return "bg-blue-100 dark:bg-blue-900/40";
  };

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">
            Activity Feed
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Recent Task Activities
          </p>
        </div>
        <button
          onClick={() => {
            onPageChange("all-users");
          }}
          className="flex items-center space-x-2 py-2 px-4 bg-linear-to-r from-[#BF092F] to-[#8C00FF] text-white rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer"
        >
          View All
        </button>
      </div>

      {/* Activity List */}
      <div className="p-6 space-y-4">
        {recentActivities.map((task) => (
          <div
            key={task._id}
            className="flex items-start space-x-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          >
            <div className={`p-2 rounded-lg ${getColor(task)}`}>
              {getIcon(task)}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-slate-800 dark:text-white">
                {detectActivityType(task)}
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
                {task.title}
              </p>

              <div className="flex items-center space-x-1 mt-1">
                <Clock className="w-3 h-3 text-slate-400" />
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {new Date(task.lastChange).toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata",
                    hour12: true,
                  })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activity;
