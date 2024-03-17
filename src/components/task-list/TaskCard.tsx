import toast from "react-hot-toast";
import { Task } from "../../interface/task-interface";
import { IoEyeOutline, IoTrashOutline } from "react-icons/io5";
import { useState } from "react";
import { TaskModal } from "../task-modal/TaskModal";
import { formatDate } from "../../utils/formattedDate";

interface Props {
  task: Task;
  tasks: Task[];
  //Lo necesito para tener la referencia
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}
export default function TaskCard({ task, tasks, setTasks }: Props) {
  const [showModal, setShowModal] = useState(false);

  // metodo personalizado para formatear fechas
  const formattedCreatedAt = formatDate(task.createdAt);

  // switch case para hacer dinamicos mis componentes y traducir
  let priority = "";
  let color = "";

  switch (task.priority) {
    case "low":
      priority = "Baja";
      color = "bg-black";
      break;
    case "medium":
      priority = "Media";
      color = "bg-yellow-500";
      break;
    case "high":
      priority = "Alta";
      color = "bg-red-500";
      break;
    default:
      priority = "Baja";
      color = "bg-black";
      break;
  }

  //borro una tarea en especifico y actualizo mi state de tareas
  const handleDelete = (taskToDelete: Task) => {
    const isTaskPresent = tasks.some((t) => t.id === taskToDelete.id);
    if (!isTaskPresent) {
      console.error("Tarea no encontrada");
      return;
    }

    const updatedTasks = tasks.filter((t) => t.id !== taskToDelete.id);

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    toast.success(`Tarea:${taskToDelete.title} borrada correctamente`);
  };

  // actualizo gracias al checkstatus si termino o no la tarea on un if
  const handleChangeStatus = () => {
    const updatedTasks: Task[] = tasks.map((t) => {
      if (t.id === task.id) {
        return {
          ...t,
          status: t.status === "notstarted" ? "finished" : "notstarted",
        };
      }
      return t;
    });

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div
      className={`my-0.2 m-2 bg-white shadow-lg rounded-lg p-2 flex items-center`}
    >
      <input
        onChange={() => handleChangeStatus()}
        type="checkbox"
        checked={task.status === "finished"} // Aquí se establece la condición
        className="m-3 h-6 w-6 accent-green-700  bg-grey-700 focus:ring-4  rounded cursor-pointer"
      />
      <div className="flex-grow flex flex-col">
        <span className="text-xs">
          Importancia:{" "}
          <span
            className={`${color} text-white text-xs font-bold p-1 rounded-lg`}
          >
            {priority}
          </span>
        </span>
        <span className="font-bold">
          {task.title.length > 30
            ? task.title.slice(0, 30) + "..."
            : task.title}
        </span>
        <div className="flex items-end">
          <span className="text-xs">{formattedCreatedAt}</span>
        </div>
      </div>
      <IoEyeOutline
        className="ml-auto hover:bg-gray-100 cursor-pointer rounded-md p-1 transition-all duration-200 mr-1"
        color="gray"
        size={30}
        onClick={() => setShowModal(true)}
      />
      <IoTrashOutline
        className="ml-auto hover:bg-red-100 cursor-pointer rounded-md p-1 transition-all duration-200"
        color="red"
        size={30}
        onClick={() => handleDelete(task)}
      />
      {showModal ? <TaskModal task={task} setShowModal={setShowModal} /> : null}
    </div>
  );
}
