import type { newTask, Task } from "@/lib/types";

const DB_NAME = "TaskManagerDB";
const DB_VERSION = 1;
const STORE_NAME = "tasks";

let db: IDBDatabase | null = null;

async function init(): Promise<void> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db = request.result;
      resolve();
    };

    request.onupgradeneeded = event => {
      const database = (event.target as IDBOpenDBRequest).result;
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };
  });
}

async function addTask(task: newTask): Promise<number> {
  if (!db) throw new Error("Database not initialized");
  return new Promise((resolve, reject) => {
    const transaction = db!.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.add(task);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result as number);
  });
}

async function getTasks(): Promise<Task[]> {
  if (!db) throw new Error("Database not initialized");
  return new Promise((resolve, reject) => {
    const transaction = db!.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result as Task[]);
  });
}

async function getTaskById(id: number): Promise<Task | undefined> {
  if (!db) throw new Error("Database not initialized");
  return new Promise((resolve, reject) => {
    const transaction = db!.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(id);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result as Task | undefined);
  });
}

async function updateTask(task: Task): Promise<void> {
  if (!db) throw new Error("Database not initialized");
  return new Promise((resolve, reject) => {
    const transaction = db!.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(task);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

async function deleteTask(id: number): Promise<void> {
  if (!db) throw new Error("Database not initialized");
  return new Promise((resolve, reject) => {
    const transaction = db!.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(id);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

export const taskDB = {
  init,
  addTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
