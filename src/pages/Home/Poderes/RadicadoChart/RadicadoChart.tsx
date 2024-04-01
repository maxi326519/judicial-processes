import { RadicadoChart as RadicadoChartTS } from "../../../../interfaces/Poderes/chart";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../interfaces/RootState";
import { Chart } from "react-google-charts";

const header = ["TIPO", "CANTIDAD"];
const example = [header, ["Dato", 0], ["Dato", 0]];

const options = {
  chart: {
    title: "RADICADOS",
    titleStyle: {
      bold: true, // Establece el estilo de negrita
    },
  },
  bars: "horizontal",
};

export default function RadicadoChart() {
  const chartData = useSelector(
    (state: RootState) => state.poderes.charts.radicado
  );
  const [data, setData] = useState<Array<Array<string | number>>>(example);

  useEffect(() => {
    if (chartData.length > 0) {
      setData([
        header,
        ...chartData.map((data: RadicadoChartTS) => [data.type, data.quantity]),
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
