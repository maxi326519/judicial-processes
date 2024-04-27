export function dateToString(date: Date | null) {
  if (date) {
    const year = date.getFullYear().toString().slice(-2);
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);

    const format = `${day}/${month}/${year}`;

    return format;
  }

  return "";
}
