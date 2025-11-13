import React, { useState } from "react";

const AddNewTask = ({onChangeAddNewTaskModel}) => {
  const [task, setTask] = useState("");
  const handleAddTask = () => {
    if (task.trim()) {
      console.log("New Task:", task);
      setTask("");
      setShowModal(false);
    }
  };
  return (
    <div className="fixed h-screen inset-0 flex items-center justify-center z-800">
      {/* Background Blur / Transparent Black */}
      <div
        onClick={onChangeAddNewTaskModel}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      ></div>

      {/* Modal Box */}
      <div className="relative z-10 bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 w-80">
        <h2 className="text-xl font-semibold text-center mb-4 text-slate-800 dark:text-white">
          Add New Task
        </h2>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task name..."
          className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2 mb-4 outline-none focus:ring-2 focus:ring-blue-500 bg-transparent text-slate-900 dark:text-white"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onChangeAddNewTaskModel}
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-slate-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleAddTask}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewTask;
