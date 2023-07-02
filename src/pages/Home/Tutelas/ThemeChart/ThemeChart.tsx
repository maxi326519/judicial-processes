import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { RootState } from "../../../../interfaces/RootState";
import { useSelector } from "react-redux";

const header = ["TIPO", "CANTIDAD"];
const example = [header, ["Dato", 0], ["Dato", 0]];

const options = {
  title: "TIPOS DE TUTELAS",
};

export default function ThemeChart() {
  const chartData = useSelector(
    (state: RootState) => state.tutelas.charts.temaTutelaChart
  );
  const [data, setData] = useState<Array<Array<string | number>>>(example);

  useEffect(() => {
    setData([header, ...chartData.map((data) => [data.type, data.quantity])]);
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
