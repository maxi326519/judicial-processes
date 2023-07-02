import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { RootState } from "../../../../interfaces/RootState";
import { useSelector } from "react-redux";

const header = ["FALLO", "CANTIDAD"];
const example = [header, ["DATO", 0], ["DATO", 0]];

const options = {
  title: "FALLO 1RA INSTANCIA",
};

export default function Fallo1Chart() {
  const chartData = useSelector(
    (state: RootState) => state.tutelas.charts.fallo1RaInstChart
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
