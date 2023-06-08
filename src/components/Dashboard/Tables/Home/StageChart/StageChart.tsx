import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { RootState } from "../../../../../interfaces/RootState";
import { useSelector } from "react-redux";
import { StageChartData } from "../../../../../interfaces/charts";

const header = ["Etapa", "Etapa procesal", { role: "style" }];
const exmaple = [header, ["Sin datos", 0, "#b87333"]];

export default function StageChart() {
  const chartData = useSelector((state: RootState) => state.charts.stageChart);
  const [data, setData] = useState<Array<Array<any>>>(exmaple);

  useEffect(() => {
    if (chartData.length > 0) {
      setData([
        header,
        ...chartData.map((data: StageChartData) => [
          data.etapa,
          data.cantidad,
          "#b87333",
        ]),
      ]);
    }
  }, [chartData]);

  return (
    <Chart chartType="ColumnChart" width="100%" height="100%" data={data} />
  );
}
