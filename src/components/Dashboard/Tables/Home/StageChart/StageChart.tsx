import { Chart } from "react-google-charts";

export const data = [
  ["Etapa", "Etapa procesal", { role: "style" }],
  ["Al despacho para fallo de segunda instancia ", 8, "#b87333"], // RGB value
  ["Etapa probatoria segunda instancia", 10, "#b87333"], // English color name
  ["Etapa probatoria ", 19, "#b87333"],
  ["Fallo favorable de segunda instancia", 21, "#b87333"], // CSS-style declaration
];

export default function StageChart() {
  return (
    <Chart chartType="ColumnChart" width="100%" height="100%" data={data} />
  );
}
