import AddTasksButton from "./addTasksButton";
import Tasks from "./tasks";
import TasksCategory from "./TasksCategory";
import { useState } from "react";

const TasksContainer = () => {
  const [taskFilter, setTaskFilter] = useState<string>("All");

  const handleTasksCategory = (taskFilter: string) => {
    if (taskFilter === "completed") {
      setTaskFilter("completed");
    } else if (taskFilter === "uncompleted") {
      setTaskFilter("uncompleted");
    } else {
      setTaskFilter("all");
    }
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
