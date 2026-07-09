import { useTaskDB } from "@/context/TaskDBContext";
import { Button } from "@/components/ui/button";

import { Check, Star, Trash2 } from "lucide-react";
import type { Task } from "@/lib/types";

interface TaskComponentProps {
  task: Task;
}

const TaskComponent = ({ task }: TaskComponentProps) => {
  const tasksDb = useTaskDB();

  const handleToggleDone = async () => {
    if (tasksDb) {
      await tasksDb.updateTask({
        ...task,
        completed: !task.completed,
      });
    }
  };

  const handleToggleImportant = async () => {
    if (tasksDb) {
      await tasksDb.updateTask({
        ...task,
        isImportant: !task.isImportant,
      });
    }
  };

  const handleDelete = async () => {
    if (tasksDb) {
      await tasksDb.deleteTask(task.id);
    }
  };

  return (
    <div
      className={`group/task relative mb-3 flex items-start gap-2 rounded-lg border transition-all duration-200 ${
        task.completed
          ? "border-muted bg-muted/50"
          : "border-border bg-background hover:border-primary/50 hover:shadow-md"
      }`}
    >
      {/* Left accent bar for important tasks */}
      {task.isImportant && (
        <div className="absolute top-0 bottom-0 left-0 w-1 rounded-l-lg bg-linear-to-b from-amber-400 to-orange-500" />
      )}

      {/* Content area */}
      <div
        className={`flex-1 px-4 py-4 ${
          task.description ? "" : "flex h-15 flex-col justify-center"
        }`}
      >
        <h3
          className={`text-base leading-tight font-semibold transition-all ${
            task.completed
              ? "text-muted-foreground line-through"
              : "text-foreground"
          }`}
        >
          {task.name}
        </h3>
        {task.description && (
          <p
            className={`mt-1 text-sm ${
              task.completed
                ? "text-muted-foreground"
                : "text-secondary-foreground"
            }`}
          >
            {task.description}
          </p>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-1 px-3 py-3 opacity-0 transition-opacity duration-200 group-hover/task:opacity-100">
        {/* Done button */}
        <Button
          variant={task.completed ? "default" : "ghost"}
          size="icon"
          onClick={handleToggleDone}
          title={task.completed ? "Mark as incomplete" : "Mark as done"}
          className={`transition-all ${
            task.completed
              ? "bg-green-500/20 text-green-600 hover:bg-green-500/30 dark:bg-green-500/30 dark:text-green-400"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <Check className="size-5" />
        </Button>

        {/* Important button */}
        <Button
          variant={task.isImportant ? "default" : "ghost"}
          size="icon"
          onClick={handleToggleImportant}
          title={task.isImportant ? "Remove importance" : "Mark as important"}
          className={`transition-all ${
            task.isImportant
              ? "bg-amber-500/20 text-amber-600 hover:bg-amber-500/30 dark:bg-amber-500/30 dark:text-amber-400"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <Star
            className="size-5"
            fill={task.isImportant ? "currentColor" : "none"}
          />
        </Button>

        {/* Delete button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDelete}
          title="Delete task"
          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
        >
          <Trash2 className="size-5" />
        </Button>
      </div>
    </div>
  );
};

export default TaskComponent;
