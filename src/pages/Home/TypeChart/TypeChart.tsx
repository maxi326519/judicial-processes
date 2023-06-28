import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../interfaces/RootState";
import { TypeChartData } from "../../../../../interfaces/Processes/charts";

const header = ["TIPO", "TIPOS"];
const example = [header, ["Sin Datos", 0]];

const options = {
  title: "TIPOS DE PROCESOS",
  hAxis: { title: "Year", titleTextStyle: { color: "#333" } },
  vAxis: { minValue: 0 },
  chartArea: { width: "50%", height: "70%" },
};

export default function TypeChart() {
  const chartData = useSelector((state: RootState) => state.processes.charts.typeChart);
  const [data, setData] = useState<Array<Array<string | number>>>(example);

  useEffect(() => {
    if (chartData.length > 0) {
      setData([
        header,
        ...chartData.map((data: TypeChartData) => [data.tipo, data.cantidad]),
      ]);
    }
  }, [chartData]);

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
