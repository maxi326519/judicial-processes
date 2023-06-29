import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { RootState } from "../../../../interfaces/RootState";
import { ProcessesChartData } from "../../../../interfaces/Processes/charts";
import { useSelector } from "react-redux";

const header = ["Apoderados", "Activos", "Terminados"];
const example = [header, ["Sin datos", 0, 0]];

const options = {
  chart: {
    title: "PROCESOS POR APODERADO",
    titleStyle: {
      bold: true, // Establece el estilo de negrita
    },
  },
  bars: "horizontal",
};

export default function TutelasChart() {
  const chartData = useSelector(
    (state: RootState) => state.processes.charts.processesChart
  );
  const [data, setData] = useState<Array<Array<string | number>>>(example);

  useEffect(() => {
    if (chartData.length > 0) {
      setData([
        header,
        ...chartData.map((data: ProcessesChartData) => [
          data.apoderado,
          data.activos,
          data.terminados,
        ]),
      ]);
    }
  }, [chartData]);

  return (
    <Chart
      chartType="Bar"
      width="100%"
      height="100%"
      data={data}
      options={options}
    />
  );
}
