import { useState } from "react";
import {
  ProcessesDetails,
  initProcessesDetails,
} from "../interfaces/JudicialProcesses";

export default function useJudicialProcesses() {
  const [judicialProcesses, setJudicialProcesses] =
    useState<ProcessesDetails>(initProcessesDetails);

  return {judicialProcesses, setJudicialProcesses};
}
