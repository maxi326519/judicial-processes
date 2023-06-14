import { Timestamp } from "firebase/firestore";

export default function getLimitDate(
  fechaInicial: Timestamp,
  diasFestivos: string[],
  dias: number
): Timestamp {
  const fecha = fechaInicial.toDate();
  let diasRestantes = dias; // Mantener un seguimiento de los días restantes para sumar

  while (diasRestantes > 0) {
    fecha.setDate(fecha.getDate() + 1); // Sumar un día a la fecha inicial
    console.log(format(fecha.toISOString().split("T")[0]));
    console.log(
      !diasFestivos.includes(format(fecha.toISOString().split("T")[0]))
    );
    if (
      fecha.getDay() !== 0 && // No es domingo
      fecha.getDay() !== 6 && // No es sábado
      !diasFestivos.includes(format(fecha.toISOString().split("T")[0])) // No es un día festivo
    ) {
      diasRestantes--; // Restar un día solo si es un día hábil
    }
  }

  return Timestamp.fromDate(fecha);
}

function format(date: string) {
  const year = date.split("-")[0];
  const month = date.split("-")[1];
  const day = date.split("-")[2];
  return `${day}/${month}/${year}`;
}
