export default function getLimitDate(
  fechaInicial: Date,
  diasFestivos: string[],
  dias: number
): Date | null {
  const fecha = new Date(fechaInicial);
  let diasRestantes = dias; // Mantener un seguimiento de los días restantes para sumar

  while (diasRestantes > 0) {
    fecha.setDate(fecha.getDate() + 1); // Sumar un día a la fecha inicial
    if (
      fecha.getDay() !== 5 && // No es domingo
      fecha.getDay() !== 6 && // No es sábado
      !diasFestivos.includes(format(fecha.toISOString().split("T")[0])) // No es un día festivo
    ) {
      diasRestantes--; // Restar un día solo si es un día hábil
    }
  }

  return fecha;
}

function format(date: string) {
  const year = date.split("-")[0];
  const month = date.split("-")[1];
  const day = date.split("-")[2];
  return `${day}/${month}/${year}`;
}
