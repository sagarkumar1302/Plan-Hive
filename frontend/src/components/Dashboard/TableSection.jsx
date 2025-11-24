import { TrendingUp } from "lucide-react";
import React from "react";

const TableSection = ({ tasks, onPageChange }) => {
  // Normalize tasks: accept either tasks (array) or API response { data: [...] }
  const tasksArray = Array.isArray(tasks)
    ? tasks
    : Array.isArray(tasks?.data)
    ? tasks.data
    : [];

  // Sort tasks by createdAt (latest first) and take top 5
  const recentTasks = tasksArray
    .slice() // clone to avoid mutating props
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const isLoading = !tasks && tasks !== null; // if tasks === undefined, probably loading
  const priorityOrder = { high: 1, medium: 2, low: 3 };

  const topTasks = tasksArray
    .slice()
    .sort((a, b) => {
      const pa = priorityOrder[a.priority?.toLowerCase()] || 99;
      const pb = priorityOrder[b.priority?.toLowerCase()] || 99;
      return pa - pb; // high → medium → low
    })
    .slice(0, 5);
  return (
    <div className="space-y-6">
      {/* Recent Task */}
      <div
        className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl
        rounded-b-2xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden"
      >
        <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                Recent Tasks
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Recent Activity
              </p>
            </div>
            <button
              className="flex items-center space-x-2 py-2 px-4 
              bg-linear-to-r from-[#BF092F] to-[#8C00FF] text-white rounded-xl 
              hover:shadow-lg cursor-pointer"
              onClick={() => {
                onPageChange("all-users");
              }}
            >
              View All
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-4 text-sm font-semibold text-slate-600 dark:text-white">
                  Task Id
                </th>
                <th className="text-left p-4 text-sm font-semibold text-slate-600 dark:text-white">
                  Task Name
                </th>
                <th className="text-left p-4 text-sm font-semibold text-slate-600 dark:text-white">
                  Task Deadline
                </th>
                <th className="text-left p-4 text-sm font-semibold text-slate-600 dark:text-white">
                  Task Priority
                </th>
                <th className="text-left p-4 text-sm font-semibold text-slate-600 dark:text-white">
                  Task Status
                </th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="p-4 text-center text-slate-500 dark:text-slate-400"
                  >
                    Loading tasks...
                  </td>
                </tr>
              ) : recentTasks?.length > 0 ? (
                recentTasks.map((task) => (
                  <tr
                    key={task._id}
                    className="border-b border-slate-200/50 dark:border-slate-700/50 
                    hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="p-4">
                      <span className="text-sm font-medium text-[#8C00FF] dark:text-white">
                        {task._id?.slice(-5)}
                      </span>
                    </td>

                    <td className="p-4">
                      <span className="text-sm font-medium text-slate-800 dark:text-white">
                        {task.title}
                      </span>
                    </td>

                    <td className="p-4">
                      <span className="text-sm font-medium text-slate-700 dark:text-white">
                        {task.deadline
                          ? new Date(task.deadline).toLocaleDateString("en-IN")
                          : "—"}
                      </span>
                    </td>

                    <td className="p-4">
                      <span className="text-sm font-medium text-[#8C00FF]">
                        {task.priority ?? "—"}
                      </span>
                    </td>

                    <td className="p-4">
                      <span
                        className={`text-sm font-medium ${
                          task.isCompleted
                            ? "text-emerald-600"
                            : "text-amber-600"
                        }`}
                      >
                        {task.isCompleted ? "Completed" : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="p-4 text-center text-slate-500 dark:text-slate-400"
                  >
                    No recent tasks found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Tasks (unchanged) */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
        <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                Top Tasks
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Overview of Top Tasks
              </p>
            </div>
            <button
              onClick={() => {
                onPageChange("all-users");
              }}
              className="flex items-center space-x-2 py-2 px-4 bg-linear-to-r from-[#BF092F] to-[#8C00FF] text-white rounded-xl hover:shadow-lg cursor-pointer"
            >
              View All
            </button>
          </div>
        </div>
        <div className="p-4 space-y-4">
          {topTasks.map((task) => (
            <div
              key={task._id}
              className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 dark:bg-slate-800/50 transition-colors dark:hover:bg-slate-800"
            >
              <div className="flex-1">
                <h4 className="text-sm font-medium text-slate-800 dark:text-white mb-1">
                  {task.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Task Productivity:{" "}
                  {task.deadline
                    ? new Date(task.deadline).toLocaleDateString("en-IN")
                    : "—"}
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm font-semibold text-slate-800 dark:text-white mb-1">
                  {task.priority}
                </p>
                <div className="flex items-center space-x-1">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {new Date(task.createdAt).toLocaleDateString("en-IN")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableSection;
