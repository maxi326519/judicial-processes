export function dateToTime(date: Date | null) {
  if (date instanceof Date) {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const formattedTime = `${hours}:${minutes}`;
    return formattedTime;
  }
  return "";
}
