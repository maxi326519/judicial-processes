import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { useSelector } from "react-redux";
import { RootState } from "../../../../interfaces/RootState";

const header = ["TIPO", "TIPOS"];
const example = [header, ["Sin Datos", 0]];

const options = {
  title: "TIPOS DE PROCESOS",
  hAxis: { title: "Year", titleTextStyle: { color: "#333" } },
  vAxis: { minValue: 0 },
  chartArea: { width: "50%", height: "70%" },
};

interface Props {
  posicionSDP: string;
}

export default function TypeChart({ posicionSDP }: Props) {
  const chartData = useSelector((state: RootState) => state.processes.charts.typeChart);
  const [data, setData] = useState<Array<Array<string | number>>>(example);

  useEffect(() => {
    if (chartData.length > 0) {
      const chartPosicion = chartData.find((data) => data.posicion === posicionSDP);
      if (chartPosicion) {
        setData([
          header,
          ...chartPosicion.data.map((data) => [data.tipo, data.cantidad]),
        ]);
      }
    }
  }, [chartData, posicionSDP]);

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
