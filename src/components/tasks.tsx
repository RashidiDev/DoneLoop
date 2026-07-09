import { useTaskDB } from "@/context/TaskDBContext";
import EmptyTasks from "./emptyTasks";
import TaskComponent from "./task";
import type { categoriesType } from "@/lib/types";

const Tasks = ({ tasksFilter }: { tasksFilter: categoriesType }) => {
  const loading = useTaskDB().loading;
  const tasks = useTaskDB().tasks;

  const filteredTasks = tasks.filter(task => {
    if (tasksFilter === "completed") {
      return task.completed;
    } else if (tasksFilter === "uncompleted") {
      return !task.completed;
    }
    return task;
  });
  const sortedTasks = filteredTasks?.sort((a, b) => b.createdAt - a.createdAt);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-solid border-t-transparent"></div>
      </div>
    );
  }

  if (!sortedTasks || !sortedTasks.length) {
    return (
      <div>
        <EmptyTasks />
      </div>
    );
  }

  return (
    <div>
      {sortedTasks.map(task => (
        <TaskComponent key={task.id} task={task} />
      ))}
    </div>
  );
};

export default Tasks;
