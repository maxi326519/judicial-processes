import {
  JudicialProcesses,
  Lists,
  ProcessesDetails,
} from "./JudicialProcesses";
import { Users } from "./users";

export interface RootState {
  loading: boolean;
  user: Users;
  users: Users[];
  processes: {
    judicialProcesses: JudicialProcesses[];
    processesDetails: ProcessesDetails | null;
  };
  lists: Lists;
  graphics: {};
  iframes: [];
}
