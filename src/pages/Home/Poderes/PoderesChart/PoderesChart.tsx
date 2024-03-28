import { useState, useEffect } from "react";
import { AbogadosCharts } from "../../../../interfaces/Tutelas/charts";
import { useSelector } from "react-redux";
import { RootState } from "../../../../interfaces/RootState";
import { Chart } from "react-google-charts";

const header = ["Apoderados", "Totales", "."];
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

export default function PoderesChart() {
  const chartData = useSelector(
    (state: RootState) => state.tutelas.charts.abogadosChart
  );
  const [data, setData] = useState<Array<Array<string | number>>>(example);

  useEffect(() => {
    if (chartData.length > 0) {
      setData([
        header,
        ...chartData.map((data: AbogadosCharts) => [
          data.name,
          data.types.reduce(
            (acumulator, data) => acumulator + data.quantity,
            0
          ),
          0,
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
