import React from "react";
import {
  Clock,
  CheckCircle,
  AlertTriangle,
  PlusCircle,
  Edit3,
  Trash2,
} from "lucide-react";

const activities = [
  {
    id: 1,
    title: "New task added",
    description: "Task 'Design Landing Page' was added to the project.",
    time: "2 minutes ago",
    icon: <PlusCircle className="w-5 h-5 text-emerald-500" />,
    color: "bg-emerald-100 dark:bg-emerald-900/40",
  },
  {
    id: 2,
    title: "Task updated",
    description: "Task 'Fix login issue' was updated by John.",
    time: "10 minutes ago",
    icon: <Edit3 className="w-5 h-5 text-blue-500" />,
    color: "bg-blue-100 dark:bg-blue-900/40",
  },
  {
    id: 3,
    title: "Task completed",
    description: "Task 'Create API endpoints' marked as complete.",
    time: "30 minutes ago",
    icon: <CheckCircle className="w-5 h-5 text-emerald-600" />,
    color: "bg-emerald-100 dark:bg-emerald-900/40",
  },
  {
    id: 4,
    title: "Task deleted",
    description: "Task 'Setup CI/CD pipeline' was removed.",
    time: "1 hour ago",
    icon: <Trash2 className="w-5 h-5 text-rose-500" />,
    color: "bg-rose-100 dark:bg-rose-900/40",
  },
  {
    id: 5,
    title: "Deadline approaching",
    description: "Task 'Frontend refactor' is due in 2 hours.",
    time: "2 hours ago",
    icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
    color: "bg-amber-100 dark:bg-amber-900/40",
  },
];

const Activity = () => {
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
        <button className="flex items-center space-x-2 py-2 px-4 bg-gradient-to-r from-[#BF092F] to-[#8C00FF] text-white rounded-xl hover:shadow-lg transition-all duration-300">
          View All
        </button>
      </div>

      {/* Activity List */}
      <div className="p-6 space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start space-x-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          >
            <div className={`p-2 rounded-lg ${activity.color}`}>
              {activity.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-slate-800 dark:text-white">
                {activity.title}
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
                {activity.description}
              </p>
              <div className="flex items-center space-x-1 mt-1">
                <Clock className="w-3 h-3 text-slate-400" />
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {activity.time}
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
