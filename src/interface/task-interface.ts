
// Asi es como luce la estructura de mi tarea
export interface Task {
    id: string; // id de tipo string para permitir uuid
    title: string; // titulo de la tarea
    description: string; // descripcion de la tarea
    status: 'notstarted' | 'finished'  //estatus de la tarea
    priority: 'low' |'medium' | 'high' // prioridad de la tarea
    createdAt: string; // fecha de creacion de la tarea
}