import React, { useEffect, useState } from "react";
import StatusGrid from "./StatusGrid";
import ChartSection from "./ChartSection";
import TableSection from "./TableSection";
import Activity from "./Activity";
import api from "../../api/axios";

const Dashboard = ({onPageChange, onSendTasks }) => {
  const [tasks, setTasks] = useState();
  useEffect(() => {
    const getAllTasks = async () => {
      try {
        const response = await api.get("/todo/get-todo");
        console.log(response.data.data);
        setTasks(response.data.data);
        onSendTasks(response.data.data);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    getAllTasks();
  }, []);
  return (
    <div className="space-y-6">
      <StatusGrid tasks={tasks}/>
      <div className="min-w-0">
        <ChartSection tasks={tasks} />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <TableSection onPageChange={onPageChange} tasks={tasks} />
        </div>
        <div className="min-w-0">
          <Activity onPageChange={onPageChange} tasks={tasks} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
