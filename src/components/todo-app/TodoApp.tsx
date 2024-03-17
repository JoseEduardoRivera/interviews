import { useEffect, useState } from "react";
import { CreateTask } from "./CreateTask";
import { Task } from "../../interface/task-interface";
import { Toaster } from "react-hot-toast";
import { Header } from "../layout/Header";
import { Footer } from "../layout/Footer";
import { Section } from "../task-list";

export function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>([]); //mi arreglo principal de tareas

  console.log({ tasks });

  //persistencia de tareas al recargar la pagina
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks !== null) {
      const parsedTasks = JSON.parse(storedTasks); // parsea solo si no es null
      setTasks(parsedTasks);
    }
  }, []);

  return (
    <div className="bg-gray-100 w-screen h-screen">
      <Toaster />
      <Header />
      <CreateTask setTasks={setTasks} />
      <div className="mx-4 my-4 border-1 h-0.5 bg-gray-400 rounded-full" />
      <div className="p-2">
        <Section tasks={tasks} setTasks={setTasks} />
      </div>
      <Footer />
    </div>
  );
}
