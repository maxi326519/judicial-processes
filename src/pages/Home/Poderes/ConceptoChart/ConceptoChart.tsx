import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../interfaces/RootState";
import { Chart } from "react-google-charts";

const header = ["TIPO", "CANTIDAD"];
const example = [header, ["Dato", 0], ["Dato", 0]];

const options = {
  title: "CONCEPTOS",
};

export default function ConceptoChart() {
  const chartData = useSelector(
    (state: RootState) => state.poderes.charts.concepto
  );
  const [data, setData] = useState<Array<Array<string | number>>>(example);

  useEffect(() => {
    setData([header, ...chartData.map((data) => [data.type, data.quantity])]);
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
