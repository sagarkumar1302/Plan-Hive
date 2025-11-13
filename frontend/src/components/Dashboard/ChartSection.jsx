import React from "react";
import TaskChart from "./TaskChart";
import TaskPieChart from "./TaskPieChart";

const ChartSection = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="xl:col-span-2">
        <TaskChart />
      </div>
      <div className="space-y-6">
        <TaskPieChart />
      </div>
    </div>
  );
};

export default ChartSection;
