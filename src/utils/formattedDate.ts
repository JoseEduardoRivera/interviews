export const formatDate = (date: string): string => {
    const parsedDate = Date.parse(date);
    if (isNaN(parsedDate)) {
      throw new Error("La fecha proporcionada no es válida.");
    }
  
    return new Date(parsedDate).toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };
  
  