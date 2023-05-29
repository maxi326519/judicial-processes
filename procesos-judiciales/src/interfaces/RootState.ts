import { JudicialProcesses, Lists, ProcessesDetails } from "./JudicialProcesses";
import { Users } from "./users";

export interface RootState {
  user: Users;
  users: Users[];
  processes: {
    judicialProcesses: JudicialProcesses[];
    processesDetails: ProcessesDetails;
  };
  lists: Lists,
  graphics: {};
  iframes: [];
}