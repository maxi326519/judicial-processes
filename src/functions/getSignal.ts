export default function getSignal(fechaTermino: Date | null): number {
  if (!fechaTermino) return 0;

  const hoy = new Date();
  const diferencia = fechaTermino.getTime() - hoy.getTime();
  const diasRestantes = Math.ceil(diferencia / (1000 * 3600 * 24));

  if (diasRestantes > 10) {
    return 1;
  } else if (diasRestantes >= 5) {
    return 2;
  } else {
    return 3;
  }
}
