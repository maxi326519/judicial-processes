import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { AbogadoChart } from "../../../../interfaces/Requirements/charts";

const header = ["Abogados", "Activos", "Terminados"];
const example = [header, ["Sin datos", 0, 0]];

const options = {
  chart: {
    title: "REQUERIMIENTOS POR APODERADO",
    titleStyle: {
      bold: true, // Establece el estilo de negrita
    },
  },
  bars: "horizontal",
};

interface Props {
  chartData: AbogadoChart[];
}

export default function AbogadoBarChart({ chartData }: Props) {
  const [data, setData] = useState<Array<Array<string | number>>>(example);

  useEffect(() => {
    if (chartData.length > 0) {
      setData([
        header,
        ...chartData.map((data) => [
          data.abogado,
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
