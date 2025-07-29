export function formatDateTime(isoDateString) {
  if (!isoDateString) return "N/A";

  const date = new Date(isoDateString);

  const options = {
    day: "2-digit",
    month: "short", 
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, 
  };
 
  return date.toLocaleString("en-US", options);
}
