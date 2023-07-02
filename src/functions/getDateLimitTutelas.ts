export default function getDateLimitTutelas(
  date: Date,
  termino: string,
  diasFestivos: string[],
  initHour: number,
  endHour: number
): Date | null {
  // Validar el formato del término
  const formatoTermino = /^(\d+)\s+(DIA|HORA|DIAS|HORAS)$/i;
  if (!formatoTermino.test(termino)) return null;

  console.log("Formato correcto", termino);

  // Convertir el término a números y unidades
  const [cantidad, unidad] = termino.split(" ");
  const cantidadNum = parseInt(cantidad);
  const esDias = unidad === "DIAS" || unidad === "DIA";
  const esHoras = unidad === "HORAS" || unidad === "HORA";

  // Inicializar la fecha y hora
  let nuevaFechaHora = new Date(date.toISOString());

  console.log("Nueva fecha:", date, "=>", nuevaFechaHora);

  // Función para comprobar si una fecha es sábado o domingo
  function esFinDeSemana(fecha: Date): boolean {
    const dia = fecha.getDay();
    return dia === 0 || dia === 6;
  }

  // Función para verificar si una fecha es un día festivo
  function esDiaFestivo(fecha: Date): boolean {
    const fechaStr = fecha.toISOString().slice(0, 10);
    return diasFestivos.includes(fechaStr);
  }

  // Incrementar la fecha y hora según el término y las restricciones
  let contador = 0;
  while (contador < cantidadNum) {
    // Si el primer dia ingresado es feriado o fin de semana seteamos para empezar el dia siguiente a primera hora
    if (esFinDeSemana(nuevaFechaHora) || esDiaFestivo(nuevaFechaHora)) {
      nuevaFechaHora.setDate(nuevaFechaHora.getDate() + 1);
      nuevaFechaHora.setHours(initHour);
      continue;
    }

    // Revisamos si tenemos que aumentar dias u horas
    if (esDias) {
      nuevaFechaHora.setDate(nuevaFechaHora.getDate() + 1);
      contador++;
    } else if (esHoras) {
      const hour = nuevaFechaHora.getHours();
      const minutes = nuevaFechaHora.getMinutes();

      // Si la hora es mayor al limite horario sumamos un dia y una hora al dia siguiente
      if (hour + 1 > endHour) {
        nuevaFechaHora.setDate(nuevaFechaHora.getDate() + 1);
        nuevaFechaHora.setHours(initHour + 1);

        // Si la hora igual al limite horario, pero los tiene minutos, solo sumamos un dia
      } else if (hour + 1 === endHour && minutes > 0) {
        nuevaFechaHora.setDate(nuevaFechaHora.getDate() + 1);
        nuevaFechaHora.setHours(initHour);
      } else {
        nuevaFechaHora.setHours(nuevaFechaHora.getHours() + 1);
      }

      contador++;
    }

    // Si es fin de semana o dia festivo aumentamos un dia y continuamos las iteraciones
    do {
      if (esFinDeSemana(nuevaFechaHora) || esDiaFestivo(nuevaFechaHora)) {
        nuevaFechaHora.setDate(nuevaFechaHora.getDate() + 1);
        continue;
      }
      break;
    } while (true);
  }

  return nuevaFechaHora;
}
