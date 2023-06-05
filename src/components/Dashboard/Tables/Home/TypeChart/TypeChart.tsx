import { Chart } from "react-google-charts";

export const data = [
  ["Tipo", "Tipos"],
  ["NULIDAD SIMPLE", 10],
  ["REPARACION DIRECTA", 11],
  ["NULIDAD Y RESTABLECIMIENTO DEL DERECHO", 66],
  ["ACCION DE GRUPO", 10],
];

export const options = {
  title: "Tipos de procesos",
  hAxis: { title: "Year", titleTextStyle: { color: "#333" } },
  vAxis: { minValue: 0 },
  chartArea: { width: "50%", height: "70%" },
};

export default function TypeChart() {
  return (
    <Chart
      chartType="AreaChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}
