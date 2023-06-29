export default function getLimiteDateWithHours(
  fechaInicio: Date,
  cantidadHoras: number,
  fechasFestivas: Date[],
  franjaHorariaInicio: number,
  franjaHorariaFin: number
): Date {
  let fechaActual = new Date(fechaInicio);
  let horasSumadas = 0;

  while (horasSumadas < cantidadHoras) {
    fechaActual.setHours(fechaActual.getHours() + 1);

    if (
      fechaActual.getHours() >= franjaHorariaFin ||
      fechaActual.getHours() < franjaHorariaInicio ||
      esFechaFestiva(fechaActual, fechasFestivas)
    ) {
      fechaActual.setDate(fechaActual.getDate() + 1);
      fechaActual.setHours(franjaHorariaInicio, 0, 0, 0);
    } else {
      horasSumadas++;
    }
  }

  return fechaActual;
}


function esFechaFestiva(fecha: Date, fechasFestivas: Date[]): boolean {
  const fechaSinHora = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
  return fechasFestivas.some((festivo) => {
    const festivoSinHora = new Date(festivo.getFullYear(), festivo.getMonth(), festivo.getDate());
    return festivoSinHora.getTime() === fechaSinHora.getTime();
  });
}