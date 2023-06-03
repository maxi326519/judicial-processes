import { Chart } from "react-google-charts";

export const data = [
  ["Calidad", "Porcentaje"],
  ["1", 70],
  ["2", 30],
];

export const options = {
  title: "Calidad en la que actúa la entidad",
};

export default function EntityChart() {
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
}
