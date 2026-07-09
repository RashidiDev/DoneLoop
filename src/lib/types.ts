export type categoriesType = "all" | "completed" | "uncompleted";

export interface Task {
  id: number;
  name: string;
  description: string | undefined;
  completed: boolean;
  isImportant: boolean;
  createdAt: number;
}

export type newTask = {
  name: string;
  description: string | undefined;
  completed?: boolean;
  isImportant?: boolean;
  createdAt: number;
};

export interface TaskDBContextValue {
  isReady: boolean;
  tasks: Task[];
  loading: boolean;
  error: Error | null;
  refreshTasks: () => Promise<void>;
  addTask: (task: newTask) => Promise<number>;
  updateTask: (task: Task) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  getTaskById: (id: number) => Promise<Task | undefined>;
}
