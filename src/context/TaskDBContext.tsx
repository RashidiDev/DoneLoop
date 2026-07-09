"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { taskDB } from "@/db/indexedDB";
import type { newTask, Task, TaskDBContextValue } from "@/lib/types";

const TaskDBContext = createContext<TaskDBContextValue | undefined>(undefined);

export const TaskDBProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isReady, setIsReady] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refreshTasks = useCallback(async () => {
    try {
      setLoading(true);
      const storedTasks = await taskDB.getTasks();
      setTasks(storedTasks);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to load tasks"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const initDb = async () => {
      try {
        await taskDB.init();
        setIsReady(true);
        await refreshTasks();
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("Failed to initialize database"),
        );
        setLoading(false);
      }
    };

    initDb();
  }, [refreshTasks]);

  const addTask = useCallback(
    async (task: newTask) => {
      const taskToSave: newTask = {
        ...task,
        completed: false,
        isImportant: task.isImportant ?? false,
      };

      const id = await taskDB.addTask(taskToSave);
      await refreshTasks();
      return id;
    },
    [refreshTasks],
  );

  const updateTask = useCallback(
    async (task: Task) => {
      await taskDB.updateTask(task);
      await refreshTasks();
    },
    [refreshTasks],
  );

  const deleteTask = useCallback(
    async (id: number) => {
      await taskDB.deleteTask(id);
      await refreshTasks();
    },
    [refreshTasks],
  );

  const getTaskById = useCallback(async (id: number) => {
    const task = await taskDB.getTaskById(id);
    return task;
  }, []);

  const value = useMemo(
    () => ({
      isReady,
      tasks,
      loading,
      error,
      refreshTasks,
      addTask,
      updateTask,
      deleteTask,
      getTaskById,
    }),
    [
      isReady,
      tasks,
      loading,
      error,
      refreshTasks,
      addTask,
      updateTask,
      deleteTask,
      getTaskById,
    ],
  );

  return <TaskDBContext value={value}>{children}</TaskDBContext>;
};

export const useTaskDB = (): TaskDBContextValue => {
  const context = useContext(TaskDBContext);
  if (!context) {
    throw new Error("useTaskDB must be used within a TaskDBProvider");
  }
  return context;
};
