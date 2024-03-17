import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Task } from "../../interface/task-interface";
import { z } from "zod";
import toast from "react-hot-toast";
import { IoAddCircleOutline } from "react-icons/io5";

interface Props {
  //uso un dispatch para actualizar el valor de mi state en
  //el componente padre desde un componente hijo
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export function CreateTask({ setTasks }: Props) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [task, setTask] = useState<Task>({
    //valores iniciales de la tarea
    id: "",
    title: "",
    description: "",
    priority: "low",
    status: "notstarted",
    createdAt: new Date().toISOString(),
  });

  // uso de Zod para controlar mi formulario
  const TaskSchema = z.object({
    id: z.string().uuid(),
    title: z
      .string()
      .min(5, "Titulo debe ser mayor a 5 caracteres")
      .max(50, "Titulo debe ser menor a 50 caracteres"),
    description: z
      .string()
      .min(5, "Descripcion debe ser mayor a 5 caracteres")
      .max(255, "Descripcion debe ser menor a 255 caracteres"),
    priority: z.enum(["low", "medium", "high"]),
    status: z.enum(["notstarted", "finished"]),
    createdAt: z.string(),
  });

  //guardo la tarea en el state y en el local storage
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //evito que la pagina se recargue

    try {
      //agrego la nueva tarea a la lista de tareas
      task.id = uuidv4();
      TaskSchema.parse(task);
      setTasks((prev: Task[]) => {
        const list = [...prev, task];
        localStorage.setItem("tasks", JSON.stringify(list));
        return list;
      });
      // Reinicio el formulario después de la creacion de la tarea
      toast.success(`Tu tarea ${task.title} se ha creado con exito`);
      setTask({
        id: "",
        title: "",
        description: "",
        priority: "low",
        status: "notstarted",
        createdAt: new Date().toISOString(),
      });
      setError("");
    } catch (error) {
      console.error("Error de validación:", error);
      if (error instanceof z.ZodError) {
        setError(`${error.issues[0].message}`);
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask, // Copiar el objeto task existente
      [name]: value, // Actualizar el campo específico
    }));
  };

  return (
    <div className="p-4 mt-16">
      <div>
        <h1 className="font-bold text-2xl">TODO LIST</h1>
        <h2>
          Una plataforma web que te ayudara a controlar tus actividades diarias
          de una manera intuitiva.
        </h2>
        <button
          className="flex flex-row mt-1 bg-blue-600 hover:opacity-80 transition-all duration-500 text-white font-bold p-2 px-4 rounded-sm justify-center items-center"
          onClick={() => setShowModal(true)}
        >
          <IoAddCircleOutline className=" pr-1" size={30} />
          Crear tarea
        </button>
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-md shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    {/* Titulo */}
                    <h3 className="text-3xl font-semibold">
                      Formulario de tareas.
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/* body */}
                  <div className="p-4">
                    <form onSubmit={handleSubmit}>
                      <div className="my-2">
                        <label htmlFor="title" className="block font-bold">
                          Titulo
                        </label>
                        <input
                          type="text"
                          id="title"
                          name="title"
                          value={task.title}
                          onChange={handleChange}
                          placeholder="Titulo de la tarea"
                          className="mt-1 rounded-sm border-0 py-1 pl-7 pr-20 text-gray-900 ring-1 ring-gray-300 focus:ring-red-400 sm:text-sm sm:leading-6"
                        />
                      </div>

                      <div className="my-2">
                        <label
                          htmlFor="description"
                          className="block font-bold"
                        >
                          Descripcion
                        </label>
                        <textarea
                          name="description"
                          value={task.description}
                          onChange={handleChange}
                          placeholder="Description"
                          className="mt-1 rounded-sm border-0 py-1 pl-7 pr-20 text-gray-900 ring-1 ring-gray-300 focus:ring-red-400 sm:text-sm sm:leading-6"
                        />
                      </div>

                      <div className="my-2">
                        <label htmlFor="priority" className="block font-bold">
                          Prioridad
                        </label>
                        <select
                          name="priority"
                          value={task.priority}
                          onChange={handleChange}
                        >
                          <option value="low">Baja</option>
                          <option value="medium">Media</option>
                          <option value="high">Alta</option>
                        </select>
                      </div>

                      <div className="my-2">
                        <label htmlFor="status" className="block font-bold">
                          Estatus
                        </label>
                        <select
                          name="status"
                          value={task.status}
                          onChange={handleChange}
                        >
                          <option value="notstarted">Sin iniciar</option>
                          <option value="finished">Finalizada</option>
                        </select>
                      </div>
                      {error && <div style={{ color: "red" }}>{error}</div>}
                      <button
                        className=" mt-1 bg-blue-600 hover:opacity-80 transition-all duration-500 text-white font-bold p-2 px-4 rounded-sm justify-center items-center"
                        type="submit"
                      >
                        Crear
                      </button>
                    </form>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 hover:opacity-80 hover:bg-slate-200 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black" />
            <div className="backdrop-blur-sm fixed inset-0 z-40" />
          </>
        ) : null}
      </div>
    </div>
  );
}
