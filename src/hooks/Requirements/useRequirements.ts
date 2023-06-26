import { useSelector } from "react-redux";
import { RootState } from "../../interfaces/RootState";
export default function useRequirements() {
  const requirements = useSelector(
    (state: RootState) => state.requirements.heads
  );

  return { data: requirements };
}
