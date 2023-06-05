import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Apoderados", "Activos", "Terminados"],
  ["LUISA GALLON", 5, 14],
  ["HECTOR RUIZ", 6, 13],
  ["JHONATAN TIBOCHA", 2, 7],
  ["IVAN CAMILO SEGURA SANCHEZ", 5, 9],
];

export const options = {
  chart: {
    title: "Procesos por apoderado",
  },
};

export default function ProcessesChart() {
  return (
    <Chart
      chartType="Bar"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}