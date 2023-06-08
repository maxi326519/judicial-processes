import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { RootState } from "../../../../../interfaces/RootState";
import { useSelector } from "react-redux";
import { EntityChartData } from "../../../../../interfaces/charts";

const header = ["Calidad", "Porcentaje"];
const example = [header, ["Demandados", 0], ["Demandantes", 0]];

const options = {
  title: "Calidad en la que actúa la entidad",
};

export default function EntityChart() {
  const chartData = useSelector((state: RootState) => state.charts.entityChart);
  const [data, setData] = useState<Array<Array<string | number>>>(example);

  useEffect(() => {
    
    setData([
      header,
      ["Demandante", chartData.demandante],
      ["Demandado", chartData.demandado],
    ]);
  }, [chartData]);

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
