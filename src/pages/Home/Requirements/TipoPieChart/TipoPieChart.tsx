import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { TipoChart } from "../../../../interfaces/Requirements/charts";

const header = ["FALLO", "CANTIDAD"];
const example = [header, ["DATO", 0], ["DATO", 0]];

const options = {
  title: "TIPO DE REQUERIMIENTOS",
};

interface Props { 
  chartData: TipoChart[];
}

export default function TipoPieChart({ chartData }: Props) {
  const [data, setData] = useState<Array<Array<string | number>>>(example);

  useEffect(() => {
    setData([header, ...chartData.map((data) => [data.tipo, data.cantidad])]);
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
