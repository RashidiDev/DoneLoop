import Header from "./components/header";
import TasksContainer from "./components/tasks-container";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useOnlineStatus } from "./hooks/useOnlineStatus";

function App() {
  const onlineStatus = useOnlineStatus();

  if (onlineStatus == true) {
    toast("You Now Online", {
      closeButton: true,
      position: "top-center",
    });
  } else {
    toast("You are Offline", {
      description: "You can still use the app",
      position: "top-center",
    });
  }

  return (
    <div className="App">
      <Header />
      <TasksContainer />
      <Toaster
        toastOptions={{
          classNames: {
            description: "!text-muted-foreground",
          },
        }}
      />
    </div>
  );
}

export default App;
