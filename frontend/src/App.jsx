import React, { useEffect, useState } from "react";
import Sidebar from "./components/Layout/Sidebar";
import Header from "./components/Layout/Header";
import Dashboard from "./components/Dashboard/Dashboard";
import Settings from "./components/Pages/Settings";
import AllTasks from "./components/Users/AllTasks";
import AddNewTask from "./components/Components/AddNewTask";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Pages/Login";
import Register from "./components/Pages/Register";
import ProtectedRoute from "./components/Components/ProtectedRoute";
import { isTokenExpired } from "./utils/checkTokenExpiry";
import { useAuthStore } from "./store/authStore";
const App = () => {
  const [sidebarCollapsed, setSideBarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [toggleMobile, setToggleMobile] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { logout, accessToken } = useAuthStore();
  const [allTasks, setAllTasks] = useState([]);
  const handleTasksFromDashboard = (tasks) => {
    setAllTasks(tasks); // now App.jsx stores tasks
    console.log("Tasks received in App.jsx:", tasks);
  };

  useEffect(() => {
    const checkToken = async () => {
      if (isTokenExpired(accessToken)) {
        await logout();
      }
    };
    checkToken();
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500">
                <div className="overflow-hidden h-screen flex relative">
                  <Sidebar
                    collapsed={sidebarCollapsed}
                    onToggle={() => setSideBarCollapsed(!sidebarCollapsed)}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    onMobileToggler={() => setToggleMobile(!toggleMobile)}
                    mobileToggler={toggleMobile}
                    totalTasks={allTasks.length}
                  />
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <Header
                      sidebarCollapsed={sidebarCollapsed}
                      onToggleSidebar={() =>
                        setSideBarCollapsed(!sidebarCollapsed)
                      }
                      onMobileToggler={() => setToggleMobile(!toggleMobile)}
                      mobileToggled={toggleMobile}
                      onChangeAddNewTaskModel={() => {
                        setShowModal(!showModal);
                      }}
                      isModelShow={showModal}
                      onPageChange={setCurrentPage}
                      totalTasks={allTasks}
                    />
                    <main className="flex-1 overflow-y-auto bg-transparent">
                      <div className="p-6 space-y-6">
                        {currentPage === "dashboard" && (
                          <Dashboard onPageChange={setCurrentPage}
                          onSendTasks={handleTasksFromDashboard} />
                        )}
                        {currentPage === "settings" && <Settings />}
                        {currentPage === "all-users" && <AllTasks />}
                      </div>
                    </main>
                  </div>
                </div>
                {showModal && (
                  <AddNewTask
                    onChangeAddNewTaskModel={() => {
                      setShowModal(!showModal);
                    }}
                    isModelShow={showModal}
                  />
                )}
              </div>
            </ProtectedRoute>
          }
        />
        {/* <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} /> */}
      </Routes>
    </div>
  );
};

export default App;
