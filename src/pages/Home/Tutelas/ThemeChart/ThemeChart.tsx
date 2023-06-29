import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { RootState } from "../../../../interfaces/RootState";
import { useSelector } from "react-redux";

const header = ["CALIDAD", "PORCENTAJE"];
const example = [header, ["Demandados", 0], ["Demandantes", 0]];

const options = {
  title: "CALIDAD EN LA QUE ATÚA LA ENTIDAD",
};

export default function ThemeChart() {
  const chartData = useSelector(
    (state: RootState) => state.processes.charts.entityChart
  );
  const [data, setData] = useState<Array<Array<string | number>>>(example);

  useEffect(() => {
    setData([
      header,
      ["DEMANDANTE", chartData.demandante],
      ["DEMANDADO", chartData.demandado],
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
