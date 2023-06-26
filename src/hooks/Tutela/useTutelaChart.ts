import { useSelector } from "react-redux";
import { RootState } from "../../interfaces/RootState";
export default function useCharts() {
  const charts = useSelector((state: RootState) => state.tutelas.charts);

  return { charts };
}
