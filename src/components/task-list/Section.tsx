import React, { useState } from "react";
import { Task } from "../../interface/task-interface";
import TaskCard from "./TaskCard";

interface Props {
  tasks: Task[];
  //vuelvo a usar el dispatch para actualizar el state del padre
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export function Section({ tasks, setTasks }: Props) {
  const [sortOption, setSortOption] = useState("");

  // ordeno por fecha, mas reciente primero
  const handleSortByDate = () => {
    const sortedTasks = [...tasks].sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
    setTasks(sortedTasks);
    setSortOption("date");
  };

  // ordeno por titulo en orden alfabetico
  const handleSortByTitle = () => {
    const sortedTasks = [...tasks].sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
    setTasks(sortedTasks);
    setSortOption("title");
  };

  // ordeno por el estatus, marcada o no
  const handleSortByStatus = () => {
    const sortedTasks = [...tasks].sort((a, b) => {
      return a.status.localeCompare(b.status);
    });
    setTasks(sortedTasks);
    setSortOption("status");
  };

  // ordeno por la prioridad en orden alfabetico
  const handleSortbyPriority = () => {
    const sortedTasks = [...tasks].sort((a, b) => {
      return a.priority.localeCompare(b.priority);
    });
    setTasks(sortedTasks);
    setSortOption("priority");
  };

  return (
    <div className="flex justify-center mb-20">
      <div className="max-w-screen-md w-full bg-gray-400 rounded-lg shadow-lg">
        <div className="p-4 m-2 bg-white text-center shadow-md rounded-xl">
          <p className="font-bold text-2xl">MIS TAREAS</p>
          {tasks.length > 0 ? (
            <p>Ahora mismo cuentas con {tasks.length} tarea(s).</p>
          ) : (
            <p>Tu lista está vacía. ¡Crea tu primera tarea! :D</p>
          )}

          <div className="flex justify-center mt-4">
            <button
              className={`mx-2 p-2 rounded-sm text-xs ${
                sortOption === "date"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
              onClick={handleSortByDate}
            >
              Ordenar por Fecha
            </button>
            <button
              className={`mx-2 p-2 rounded-sm text-xs ${
                sortOption === "title"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
              onClick={handleSortByTitle}
            >
              Ordenar por Título
            </button>
            <button
              className={`mx-2 p-2 rounded-sm text-xs ${
                sortOption === "status"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
              onClick={handleSortByStatus}
            >
              Ordenar por Estatus
            </button>
            <button
              className={`mx-2 p-2 rounded-sm text-xs ${
                sortOption === "priority"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
              onClick={handleSortbyPriority}
            >
              Ordenar por Prioridad
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              tasks={tasks}
              setTasks={setTasks}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
