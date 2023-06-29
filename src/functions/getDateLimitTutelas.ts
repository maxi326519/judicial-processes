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

  // Convertir el término a números y unidades
  const [cantidad, unidad] = termino.split(" ");
  const cantidadNum = parseInt(cantidad);
  const esDias = unidad === "DIAS" || unidad === "DIA";
  const esHoras = unidad === "HORAS" || unidad === "HORA";

  // Inicializar la fecha y hora
  let nuevaFechaHora = new Date(date.toISOString());

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
    if (esDias) {
      nuevaFechaHora.setDate(nuevaFechaHora.getDate() + 1);
    } else if (esHoras) {
      nuevaFechaHora.setHours(nuevaFechaHora.getHours() + 1);
    }

    if (!esFinDeSemana(nuevaFechaHora) && !esDiaFestivo(nuevaFechaHora)) {
      const hora = nuevaFechaHora.getHours();
      if (hora >= initHour && hora <= endHour) {
        contador++;
      }
    }
  }

  return nuevaFechaHora;
}
