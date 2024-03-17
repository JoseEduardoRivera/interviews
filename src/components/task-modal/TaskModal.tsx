import { Task } from "../../interface/task-interface";
import { formatDate } from "../../utils/formattedDate";

interface Props {
  task: Task;
  setShowModal: React.Dispatch<boolean>;
}
export function TaskModal({ task, setShowModal }: Props) {
  const formatedDate = formatDate(task.createdAt);

  // lo mismo que en taskcard, estos switch case me permiten usar estilos dinamicos
  let priority = "";
  let color = "";
  let status = "";
  let statusColor = "";

  switch (task.status) {
    case "notstarted":
      status = "En curso";
      statusColor = "bg-red-400";
      break;
    case "finished":
      status = "Finalizado";
      statusColor = "bg-green-500";
      break;
    default:
      status = "notstarted";
      statusColor = "bg-red-400";
      break;
  }

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
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-md shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              {/* Titulo */}
              <h3 className="text-3xl font-semibold">{task.title}</h3>
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
            <div className="p-4 flex flex-col">
              <p className="mb-1 text-lg font-semibold">Descripción:</p>
              <p className="mb-2">{task.description}</p>

              <p className="mb-1 text-lg font-semibold">Prioridad:</p>
              <span
                className={`${color} text-white text-base text-center font-bold p-1 rounded-lg`}
              >
                {priority}
              </span>

              <p className="mb-1 text-lg font-semibold">Estatus:</p>
              <span
                className={`${statusColor} text-white text-base text-center font-bold p-1 rounded-lg`}
              >
                {status}
              </span>

              <p className="mb-1 text-lg font-semibold">Creado el:</p>
              <p>{formatedDate}</p>
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
  );
}
