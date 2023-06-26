import { useSelector } from "react-redux";
import { RootState } from "../../interfaces/RootState";
export default function useLists() {
  const tutelas = useSelector((state: RootState) => state.tutelas.data);

  return { data: tutelas };
}
