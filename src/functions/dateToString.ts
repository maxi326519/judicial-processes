export function dateToString(date: Date) {
  console.log(date);

  const year = date.getFullYear().toString().slice(-2);
  const month = `0${date.getMonth()}`.slice(-2);
  const day = `0${date.getDay()}`.slice(-2);

  const format = `${day}/${month}/${year}`;

  return format;
}
