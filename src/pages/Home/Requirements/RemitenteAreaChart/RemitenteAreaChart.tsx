import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";

import { RemitenteGeneralChart } from "../../../../interfaces/Requirements/charts";

const header = ["TIPO", "TIPOS"];
const example = [header, ["Sin Datos", 0]];

const options = {
  title: "REMITENTE GENERAL",
  hAxis: { title: "Year", titleTextStyle: { color: "#333" } },
  vAxis: { minValue: 0 },
  chartArea: { width: "50%", height: "70%" },
};

interface Props { 
  chartData: RemitenteGeneralChart[];
}

export default function RemitenteAreaChart({ chartData }: Props) {
  const [data, setData] = useState<Array<Array<string | number>>>(example);

  useEffect(() => {
    if (chartData.length > 0) {
      setData([
        header,
        ...chartData.map((data) => [data.remitente, data.cantidad]),
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
