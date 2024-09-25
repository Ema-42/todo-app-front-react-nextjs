export const formatDate = (dateString: string, includeSeconds: boolean = false): string => {
  // Opciones para el formato de la fecha
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    ...(includeSeconds && { second: "2-digit" }), // Añade segundos si se solicita
  };

  return new Date(dateString).toLocaleString("es-ES", options);
};