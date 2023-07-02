import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { RootState } from "../../../../interfaces/RootState";
import { useSelector } from "react-redux";
import { AbogadosCharts } from "../../../../interfaces/Tutelas/charts";

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
          0
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
