export default function formatNumberColombiano(numero: number): string {
  return numero.toLocaleString("es-CO", {
    style: "decimal", // Podrías cambiar a 'currency' si es necesario y ajustar la moneda
    currency: "COP", // Moneda Colombiana, solo necesario si usas estilo 'currency'
    minimumFractionDigits: 2, // Mínimo de decimales, ajustable según necesidad
    maximumFractionDigits: 2, // Máximo de decimales, ajustable según necesidad
  });
}
