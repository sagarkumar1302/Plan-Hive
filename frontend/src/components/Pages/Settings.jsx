import React, { useState } from "react";
import { Bell, Moon, Globe, User, Lock, LogOut } from "lucide-react";

const Settings = () => {
  const [profile, setProfile] = useState({
    name: "Sagar Kumar",
    username: "sagar123",
    email: "sagar@example.com",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState(profile);

  const handleEdit = () => {
    setTempData(profile);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfile(tempData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData(profile);
    setIsEditing(false);
  };

  return (
    <div className="flex justify-center p-4">
      <div className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6 space-y-8">
        {/* Header */}
        <div className="border-b border-slate-200/50 dark:border-slate-700/50 pb-4">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            Settings
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manage your preferences
          </p>
        </div>

        {/* Profile Section */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white flex items-center gap-2">
            <User size={20} /> Profile
          </h2>

          <div className="bg-slate-100/60 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/40 rounded-xl p-4 space-y-4">
            {/* Name */}
            <div>
              <label className="text-sm text-slate-600 dark:text-slate-400">
                Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  className="w-full p-2 mt-1 rounded-lg border bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white"
                  value={tempData.name}
                  onChange={(e) =>
                    setTempData({ ...tempData, name: e.target.value })
                  }
                />
              ) : (
                <p className="font-medium text-slate-800 dark:text-white">
                  {profile.name}
                </p>
              )}
            </div>

            {/* Username */}
            <div>
              <label className="text-sm text-slate-600 dark:text-slate-400">
                Username
              </label>
              {isEditing ? (
                <input
                  type="text"
                  className="w-full p-2 mt-1 rounded-lg border bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white"
                  value={tempData.username}
                  onChange={(e) =>
                    setTempData({ ...tempData, username: e.target.value })
                  }
                />
              ) : (
                <p className="font-medium text-slate-800 dark:text-white">
                  @{profile.username}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-slate-600 dark:text-slate-400">
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  className="w-full p-2 mt-1 rounded-lg border bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white"
                  value={tempData.email}
                  onChange={(e) =>
                    setTempData({ ...tempData, email: e.target.value })
                  }
                />
              ) : (
                <p className="text-slate-800 dark:text-white">
                  {profile.email}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-2">
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 bg-slate-900 dark:bg-slate-700 text-white rounded-lg text-sm hover:bg-slate-800"
                >
                  Edit
                </button>
              ) : (
                <>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white rounded-lg text-sm hover:bg-slate-300 dark:hover:bg-slate-600"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
                  >
                    Save
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Appearance Section */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white flex items-center gap-2">
            <Moon size={20} /> Appearance
          </h2>

          <div className="bg-slate-100/60 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/40 rounded-xl p-4 space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-slate-700 dark:text-slate-300 font-medium">
                Dark Mode
              </p>
              <ToggleItem />
            </div>
          </div>
        </div>

        {/* Language */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white flex items-center gap-2">
            <Globe size={20} /> Language
          </h2>

          <select className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white">
            <option>English</option>
            <option>Hindi</option>
            <option>Spanish</option>
          </select>
        </div>

        {/* Security */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white flex items-center gap-2">
            <Lock size={20} /> Security
          </h2>

          <div className="bg-slate-100/60 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/40 rounded-xl p-4 space-y-4">
            <button className="w-full text-left p-3 bg-white dark:bg-slate-900 rounded-lg shadow text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800">
              Change Password
            </button>
            <button className="w-full text-left p-3 bg-white dark:bg-slate-900 rounded-lg shadow text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800">
              Two-Factor Authentication
            </button>
          </div>
        </div>

        {/* Logout */}
        <div className="pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
          <button className="w-full flex items-center justify-center gap-2 p-3 text-red-600 font-semibold bg-red-100 dark:bg-red-500 rounded-xl hover:bg-red-100 dark:hover:bg-red-500/80 dark:text-white">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

const ToggleItem = () => {
  return (
    <label className="relative inline-block w-11 h-6">
      <input type="checkbox" className="peer opacity-0 w-0 h-0" />
      <span className="absolute cursor-pointer inset-0 bg-slate-300 peer-checked:bg-slate-900 rounded-full transition"></span>
      <span className="absolute left-1 top-1 peer-checked:translate-x-5 bg-white dark:bg-slate-300 w-4 h-4 rounded-full transition"></span>
    </label>
  );
};

export default Settings;
