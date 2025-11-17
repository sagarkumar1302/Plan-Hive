import React, { useState } from "react";

const AddNewTask = ({ onChangeAddNewTaskModel }) => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    deadline: "",
    priority: "Medium",
    completed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTaskData({
      ...taskData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAddTask = () => {
    if (!taskData.title.trim()) {
      alert("Task title is required!");
      return;
    }

    console.log("New Task:", taskData);

    // Reset after add
    setTaskData({
      title: "",
      description: "",
      deadline: "",
      priority: "Medium",
      completed: false,
    });

    onChangeAddNewTaskModel(); 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center h-screen z-999">
      
      {/* Background Overlay */}
      <div
        onClick={onChangeAddNewTaskModel}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      ></div>

      {/* Modal Box */}
      <div className="relative z-10 bg-white dark:bg-slate-800 shadow-2xl p-6 w-[450px] rounded-2xl">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white text-center">
            Add New Task
          </h3>

        {/* Title */}
        <div className="mb-4">
          <label className="text-sm font-semibold text-slate-700 dark:text-white">
            Task Title
          </label>
          <input
            type="text"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            placeholder="Enter task title..."
            className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2 mt-1 bg-transparent outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="text-sm font-semibold text-slate-700 dark:text-white">
            Description
          </label>
          <textarea
            name="description"
            value={taskData.description}
            onChange={handleChange}
            rows="3"
            placeholder="Write task description..."
            className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2 mt-1 bg-transparent outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
          ></textarea>
        </div>

        {/* Deadline */}
        <div className="mb-4">
          <label className="text-sm font-semibold text-slate-700 dark:text-white">
            Deadline
          </label>
          <input
            type="date"
            name="deadline"
            value={taskData.deadline}
            onChange={handleChange}
            className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2 mt-1 bg-transparent outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
          />
        </div>

        {/* Priority */}
        <div className="mb-4">
          <label className="text-sm font-semibold text-slate-700 dark:text-white">
            Priority
          </label>
          <select
            name="priority"
            value={taskData.priority}
            onChange={handleChange}
            className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2 mt-1 bg-transparent outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        {/* Completed */}
        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            name="completed"
            checked={taskData.completed}
            onChange={handleChange}
            className="w-4 h-4 accent-blue-600"
          />
          <label className="ml-2 text-sm font-semibold text-slate-700 dark:text-white">
            Mark as Completed
          </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onChangeAddNewTaskModel}
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-slate-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
          >
            Cancel
          </button>

          <button
            onClick={handleAddTask}
            className="px-4 py-2 rounded-lg bg-linear-to-r from-[#BF092F] to-[#8C00FF] text-white  transition-all"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewTask;
