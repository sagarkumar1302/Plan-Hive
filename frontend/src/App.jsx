import React, { useState } from "react";
import Sidebar from "./components/Layout/Sidebar";
import Header from "./components/Layout/Header";
import Dashboard from "./components/Dashboard/Dashboard";
import Settings from "./components/Pages/Settings";
import AllTasks from "./components/Users/AllTasks";

const App = () => {
  const [sidebarCollapsed, setSideBarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [toggleMobile, setToggleMobile] = useState(true);
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500">
      <div className="overflow-hidden h-screen flex relative">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSideBarCollapsed(!sidebarCollapsed)}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onMobileToggler={() => setToggleMobile(!toggleMobile)}
          mobileToggler={toggleMobile}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header
            sidebarCollapsed={sidebarCollapsed}
            onToggleSidebar={() => setSideBarCollapsed(!sidebarCollapsed)}
            onMobileToggler={() => setToggleMobile(!toggleMobile)}
            mobileToggled={toggleMobile}
          />
          <main className="flex-1 overflow-y-auto bg-transparent">
            <div className="p-6 space-y-6">
              {currentPage === "dashboard" && <Dashboard />}
              {currentPage === "settings" && <Settings />}
              {currentPage === "all-users" && <AllTasks />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
