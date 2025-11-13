import { Filter, Search } from "lucide-react";
import React from "react";

const AllTasks = () => {
  return (
    <div className="flex">
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#8C00FF] focus:border-transparent transition-all"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 p-1.5 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
            <Filter />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllTasks;
