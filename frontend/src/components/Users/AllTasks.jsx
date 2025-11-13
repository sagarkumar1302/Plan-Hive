import React, { useState } from "react";
import { Filter, Search, Edit, Trash2, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// 🧩 Dummy data (mimics your todoSchema)
const dummyTasks = [
  {
    _id: 1,
    title: "Design Dashboard UI",
    description: "Create the layout and theme for dashboard analytics page.",
    isCompleted: false,
    priority: "High",
    deadline: "2025-11-20",
  },
  {
    _id: 2,
    title: "Fix Login Bug",
    description: "Resolve the token refresh issue in user authentication.",
    isCompleted: true,
    priority: "Medium",
    deadline: "2025-11-16",
  },
  {
    _id: 3,
    title: "Write Unit Tests",
    description: "Add tests for user and task APIs.",
    isCompleted: false,
    priority: "Low",
    deadline: "2025-11-25",
  },
];

const AllTasks = () => {
  const [tasks, setTasks] = useState(dummyTasks);
  const [searchTerm, setSearchTerm] = useState("");

  const handleToggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t._id === id ? { ...t, isCompleted: !t.isCompleted } : t
      )
    );
  };

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  const handleEdit = (id) => {
    alert("Edit feature coming soon! Task ID: " + id);
  };

  // Filtered tasks based on search
  const filteredTasks = tasks.filter(
    (t) =>
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "text-red-500 bg-red-50 dark:bg-red-900/20";
      case "Medium":
        return "text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20";
      default:
        return "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Search Bar */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#8C00FF] focus:border-transparent transition-all"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 p-1.5 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
            <Filter />
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredTasks.map((task) => (
            <motion.div
              key={task._id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`relative group p-6 rounded-2xl backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:shadow-xl transition-all duration-200 ${
                task.isCompleted ? "opacity-75" : ""
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <h3
                  className={`text-lg font-semibold ${
                    task.isCompleted
                      ? "line-through text-slate-500 dark:text-slate-400"
                      : "text-slate-800 dark:text-white"
                  }`}
                >
                  {task.title}
                </h3>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${getPriorityColor(
                    task.priority
                  )}`}
                >
                  {task.priority}
                </span>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                {task.description}
              </p>

              <div className="flex justify-between items-center text-sm text-slate-500 dark:text-slate-400 mb-4">
                <p>
                  Deadline:{" "}
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {new Date(task.deadline).toLocaleDateString()}
                  </span>
                </p>
                <p>
                  Status:{" "}
                  <span
                    className={`font-semibold ${
                      task.isCompleted
                        ? "text-emerald-500"
                        : "text-amber-500"
                    }`}
                  >
                    {task.isCompleted ? "Completed" : "Pending"}
                  </span>
                </p>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleToggleComplete(task._id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1 transition-all duration-200 ${
                    task.isCompleted
                      ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-white hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:text-emerald-600"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {task.isCompleted ? "Undo" : "Mark Done"}
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleEdit(task._id)}
                  className="px-3 py-2 rounded-lg text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all flex items-center gap-1"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDelete(task._id)}
                  className="px-3 py-2 rounded-lg text-sm font-medium bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-all flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredTasks.length === 0 && (
        <p className="text-center text-slate-500 dark:text-slate-400 mt-10">
          No tasks found.
        </p>
      )}
    </div>
  );
};

export default AllTasks;
