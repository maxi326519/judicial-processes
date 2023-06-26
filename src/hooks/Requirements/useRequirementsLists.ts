import { useSelector } from "react-redux";
import { RootState } from "../../interfaces/RootState";
export default function useLists() {
  const lists = useSelector((state: RootState) => state.requirements.lists);

  return { lists };
}
