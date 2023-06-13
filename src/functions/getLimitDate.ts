import { Timestamp } from "firebase/firestore";

export default function getLimitDate(
  fechaInicial: Timestamp,
  diasFestivos: string[],
  dias: number
): Timestamp {
  const fecha = new Date(fechaInicial.toDate().getDate() + 1);
  let diasRestantes = dias; // Mantener un seguimiento de los días restantes para sumar

  while (diasRestantes > 0) {
    fecha.setDate(fecha.getDate() + 1); // Sumar un día a la fecha inicial

    if (
      fecha.getDay() !== 0 && // No es domingo
      fecha.getDay() !== 6 && // No es sábado
      !diasFestivos.includes(fecha.toISOString().substring(0, 10)) // No es un día festivo
    ) {
      diasRestantes--; // Restar un día solo si es un día hábil
    }
  }

  return Timestamp.fromDate(fecha);
}
