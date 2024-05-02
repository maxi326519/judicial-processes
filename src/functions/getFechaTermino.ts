export function getFechaTermino(diasFestivos: string[], fechaIngreso: Date): Date {
  let diasHabiles = 0;
  let fechaActual = new Date(fechaIngreso);

  while (diasHabiles < 15) {
      fechaActual.setDate(fechaActual.getDate() + 1); // Avanzamos un día

      // Revisar si el día actual es sábado (6) o domingo (0)
      if (fechaActual.getDay() !== 0 && fechaActual.getDay() !== 6) {
          // Formatear la fecha a DD/MM/YYYY para verificar si es día festivo
          const fechaFormateada = `${padTo2Digits(fechaActual.getDate())}/${padTo2Digits(fechaActual.getMonth() + 1)}/${fechaActual.getFullYear()}`;

          // Revisar si es un día festivo
          if (!diasFestivos.includes(fechaFormateada)) {
              diasHabiles++; // Es un día hábil
          }
      }
  }

  return fechaActual;
}

// Función auxiliar para asegurar el formato de dos dígitos
function padTo2Digits(num: number): string {
  return num.toString().padStart(2, '0');
}
