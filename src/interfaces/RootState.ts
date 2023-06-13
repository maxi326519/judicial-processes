import {
  JudicialProcesses,
  Lists,
  ProcessesDetails,
} from "./JudicialProcesses";
import { Charts } from "./charts";
import { Users } from "./users";

export interface RootState {
  loading: boolean;
  user: Users;
  users: Users[];
  processes: {
    judicialProcesses: JudicialProcesses[];
    processesDetails: ProcessesDetails | null;
    data: ProcessesDetails[];
  };
  lists: Lists;
  charts: Charts;
  iframes: [];
}
