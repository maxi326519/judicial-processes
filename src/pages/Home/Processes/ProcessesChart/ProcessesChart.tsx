import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { RootState } from "../../../../interfaces/RootState";
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

interface Props {
  posicionSDP: string;
}

export default function ProcessesChart({ posicionSDP }: Props) {
  const chartData = useSelector(
    (state: RootState) => state.processes.charts.processesChart
  );
  const [data, setData] = useState<Array<Array<string | number>>>(example);

  useEffect(() => {
    if (chartData.length > 0) {
      const chartPosicion = chartData.find((data) => data.posicion === posicionSDP);
      if (chartPosicion) {
        setData([
          header,
          ...chartPosicion.data.map((data) => [
            data.apoderado,
            data.activos,
            data.terminados,
          ]),
        ]);
      }
    }
  }, [chartData, posicionSDP]);

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
