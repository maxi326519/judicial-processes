export default function getLimiteDate(
  diasFestivos: string[],
  dias: number
): Date {
  const fechaHoy = new Date(); // Obtener la fecha de hoy
  let diasRestantes = dias; // Mantener un seguimiento de los días restantes para sumar

  while (diasRestantes > 0) {
    fechaHoy.setDate(fechaHoy.getDate() + 1); // Sumar un día a la fecha actual

    if (
      fechaHoy.getDay() !== 0 && // No es domingo
      fechaHoy.getDay() !== 6 && // No es sábado
      !diasFestivos.includes(fechaHoy.toISOString().substring(0, 10)) // No es un día festivo
    ) {
      diasRestantes--; // Restar un día solo si es un día hábil
    }
  }

  return fechaHoy;
}
