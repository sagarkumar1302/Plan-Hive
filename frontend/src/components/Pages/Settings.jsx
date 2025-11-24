import React, { useEffect, useState } from "react";
import { Bell, Moon, Globe, User, Lock, LogOut, Camera } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import api from "../../api/axios";
const Settings = () => {
  const user = useAuthStore((e) => e.user);
  const [avatarPreview, setAvatarPreview] = useState(user.avatar);
  const [avatarFile, setAvatarFile] = useState(null);
  const logout = useAuthStore((e) => e.logout);

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const uploadAvatar = async () => {
    if (!avatarFile) return;

    const formData = new FormData();
    formData.append("avatar", avatarFile);

    try {
      const res = await api.patch("/user/update-avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      updateUser(res.data.data);
      setAvatarFile(null);
      alert("Avatar Changed Successfully")
    } catch (e) {
      console.log("Avatar upload error", e);
    }
  };
  const handlePasswordChange = async () => {
    const { oldPassword, newPassword, confirmPassword } = passwordData;

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    try {
      await api.patch("/user/update-password", {
        oldPassword,
        newPassword,
      });

      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      alert("Password updated successfully!");
      logout();
    } catch (error) {
      console.log("Password change error", error);
      alert(error?.response?.data?.message || "Error updating password");
    }
  };

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [profile, setProfile] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
  });
  const { updateUser } = useAuthStore();
  const logoutHanlder = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState(profile);

  const handleEdit = () => {
    setTempData(profile);
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await api.patch("/user/update-user", tempData);
      console.log("Tempdata ", tempData);
      console.log("Profile ", profile);

      updateUser(response.data.data);
      console.log("Data from the Db ", response.data.data);

      setProfile(tempData);
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setTempData(profile);
    setIsEditing(false);
  };
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);
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
        {/* Avatar Section */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white flex items-center gap-2">
            <User size={20} /> Avatar
          </h2>

          <div className="bg-slate-100/60 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/40 rounded-xl p-4 flex items-center gap-6">
            {/* Avatar Preview */}
            <div className="relative">
              <img
                src={avatarPreview || "/default-avatar.png"}
                alt="avatar"
                className="w-20 h-20 rounded-full object-cover border dark:border-slate-700"
              />

              <label className="absolute bottom-0 right-0 bg-white dark:bg-slate-700 p-1 rounded-full cursor-pointer shadow">
                <Camera size={16} className="text-slate-600 dark:text-white" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </label>
            </div>

            <button
              onClick={uploadAvatar}
              className="cursor-pointer px-4 py-2 bg-slate-900 dark:bg-slate-700 text-white rounded-lg text-sm hover:bg-slate-800"
            >
              Update Avatar
            </button>
          </div>
        </div>
        {/* Profile Section */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white flex items-center gap-2">
            <User size={20} /> Profile
          </h2>

          <div className="bg-slate-100/60 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/40 rounded-xl p-4 space-y-4">
            {/* FirstName */}
            <div>
              <label className="text-sm text-slate-600 dark:text-slate-400">
                First Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  className="w-full p-2 mt-1 rounded-lg border bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white"
                  value={tempData.firstName}
                  onChange={(e) =>
                    setTempData({ ...tempData, firstName: e.target.value })
                  }
                />
              ) : (
                <p className="font-medium text-slate-800 dark:text-white">
                  {profile.firstName}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm text-slate-600 dark:text-slate-400">
                Last Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  className="w-full p-2 mt-1 rounded-lg border bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white"
                  value={tempData.lastName}
                  onChange={(e) =>
                    setTempData({ ...tempData, lastName: e.target.value })
                  }
                />
              ) : (
                <p className="font-medium text-slate-800 dark:text-white">
                  {profile.lastName}
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
              <ToggleItem darkMode={darkMode} setDarkMode={setDarkMode} />
            </div>
          </div>
        </div>

        {/* Language */}
        {/* <div className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white flex items-center gap-2">
            <Globe size={20} /> Language
          </h2>

          <select className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white">
            <option>English</option>
            <option>Hindi</option>
            <option>Spanish</option>
          </select>
        </div> */}

        {/* Security */}
        {/* Security */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white flex items-center gap-2">
            <Lock size={20} /> Security
          </h2>

          <div className="bg-slate-100/60 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/40 rounded-xl p-4 space-y-4">
            {/* Old Password */}
            <div>
              <label className="text-sm text-slate-600 dark:text-slate-400">
                Old Password
              </label>
              <input
                type="password"
                value={passwordData.oldPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    oldPassword: e.target.value,
                  })
                }
                className="w-full p-2 mt-1 rounded-lg border bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white"
              />
            </div>

            {/* New Password */}
            <div>
              <label className="text-sm text-slate-600 dark:text-slate-400">
                New Password
              </label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    newPassword: e.target.value,
                  })
                }
                className="w-full p-2 mt-1 rounded-lg border bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm text-slate-600 dark:text-slate-400">
                Confirm New Password
              </label>
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    confirmPassword: e.target.value,
                  })
                }
                className="w-full p-2 mt-1 rounded-lg border bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white"
              />
            </div>

            <button
              onClick={handlePasswordChange}
              className="w-full p-3 bg-slate-900 dark:bg-slate-700 text-white rounded-lg text-sm hover:bg-slate-800"
            >
              Update Password
            </button>
          </div>
        </div>

        {/* Logout */}
        <div className="pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
          <button
            onClick={logoutHanlder}
            className="w-full flex items-center justify-center gap-2 p-3 text-red-600 font-semibold bg-red-100 dark:bg-red-500 rounded-xl hover:bg-red-100 dark:hover:bg-red-500/80 dark:text-white cursor-pointer"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

const ToggleItem = ({ darkMode, setDarkMode }) => {
  return (
    <label className="relative inline-block w-11 h-6">
      <input
        type="checkbox"
        checked={darkMode}
        onChange={() => setDarkMode(!darkMode)}
        className="peer opacity-0 w-0 h-0"
      />
      <span className="absolute cursor-pointer inset-0 bg-slate-300 peer-checked:bg-slate-900 rounded-full transition"></span>
      <span className="absolute left-1 top-1 peer-checked:translate-x-5 bg-white dark:bg-slate-300 w-4 h-4 rounded-full transition"></span>
    </label>
  );
};

export default Settings;
