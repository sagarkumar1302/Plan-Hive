import { TrendingUp } from "lucide-react";
import React from "react";

const TableSection = () => {
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
                Recent Acitivity
              </p>
            </div>
            <button className="flex items-center space-x-2 py-2 px-4 bg-linear-to-r from-[#BF092F] to-[#8C00FF] text-white rounded-xl hover:shadow-lg translate-all cursor-pointer">
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
              <tr className="border-b border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="p-4">
                  <span className="text-sm text-left font-medium text-[#8C00FF] dark:text-white ">
                    1234
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-sm font-medium text-[#8C00FF] dark:text-white">
                    1234
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-sm font-medium text-[#8C00FF] dark:text-white">
                    1234
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-sm font-medium text-[#8C00FF] dark:text-white">
                    1234
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-sm font-medium text-[#8C00FF] dark:text-white">
                    1234
                  </span>
                </td>
              </tr>
              <tr className="border-b border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="p-4">
                  <span className="text-sm text-left font-medium text-[#8C00FF] dark:text-white">
                    1234
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-sm font-medium text-[#8C00FF] dark:text-white">
                    1234
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-sm font-medium text-[#8C00FF] dark:text-white">
                    1234
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-sm font-medium text-[#8C00FF] dark:text-white">
                    1234
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-sm font-medium text-[#8C00FF] dark:text-white">
                    1234
                  </span>
                </td>
              </tr>
              <tr className="border-b border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="p-4">
                  <span className="text-sm text-left font-medium text-[#8C00FF] dark:text-white">
                    1234
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-sm font-medium text-[#8C00FF] dark:text-white">
                    1234
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-sm font-medium text-[#8C00FF] dark:text-white">
                    1234
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-sm font-medium text-[#8C00FF] dark:text-white">
                    1234
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-sm font-medium text-[#8C00FF] dark:text-white">
                    1234
                  </span>
                </td>
              </tr>
              <tr className="border-b border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="p-4">
                  <span className="text-sm text-left font-medium text-[#8C00FF] dark:text-white">
                    1234
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-sm font-medium text-[#8C00FF] dark:text-white">
                    1234
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-sm font-medium text-[#8C00FF] dark:text-white">
                    1234
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-sm font-medium text-[#8C00FF] dark:text-white">
                    1234
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-sm font-medium text-[#8C00FF] dark:text-white">
                    1234
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* Top Tasks */}
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
            <button className="flex items-center space-x-2 py-2 px-4 bg-linear-to-r from-[#BF092F] to-[#8C00FF] text-white rounded-xl hover:shadow-lg translate-all cursor-pointer">
              View All
            </button>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 dark:bg-slate-800/50 transition-colors dark:hover:bg-slate-800">
            <div className="flex-1">
              <h4 className="text-sm font-medium text-slate-800 dark:text-white">
                Task Name
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Task Productivity
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-800 dark:text-white">
                Task Revenue
              </p>
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-3 h-3 text-emerald-500" />
                <span className="text-xs text-slate-500 dark:text-slate-400">Task Change</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableSection;
