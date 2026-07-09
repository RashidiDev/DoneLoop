import type { categoriesType } from "@/lib/types";
import AddTasksButton from "./addTasksButton";
import Tasks from "./tasks";
import TasksCategory from "./TasksCategory";
import { useState } from "react";

const TasksContainer = () => {
  const [taskFilter, setTaskFilter] = useState<categoriesType>("all");

  const handleTasksCategory = (taskFilter: categoriesType) => {
    setTaskFilter(taskFilter);
  };

  return (
    <div className="mx-auto mt-10 max-w-4xl px-4 sm:px-6">
      <div className="mb-10 flex items-center justify-between">
        <TasksCategory taskCategoryHandler={handleTasksCategory} />

        <AddTasksButton />
      </div>
      <Tasks tasksFilter={taskFilter} />
    </div>
  );
};

export default TasksContainer;
