import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { RootState } from "../../../../interfaces/RootState";
import { useSelector } from "react-redux";

const header = ["CALIDAD", "PORCENTAJE"];
const example = [header, ["Demandados", 0], ["Demandantes", 0]];

const options = {
  title: "CALIDAD EN LA QUE ATÚA LA ENTIDAD",
};

interface Props {
  posicionSDP: string;
}

export default function EntityChart({ posicionSDP }: Props) {
  const chartData = useSelector(
    (state: RootState) => state.processes.charts.entityChart
  );
  const [data, setData] = useState<Array<Array<string | number>>>(example);

  useEffect(() => {
    if (chartData.length > 0) {
      const data = chartData.find((data) => data.posicion === posicionSDP);

      if (data) {
        setData([
          header,
          ["DEMANDANTE", data.demandante],
          ["DEMANDADO", data.demandado],
        ]);
      }
    }
  }, [chartData, posicionSDP]);

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
