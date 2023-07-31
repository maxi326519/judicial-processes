import { Users, initUser } from "./users";
import { IFrames } from "./iframes";

// PROCESSES
import { ProcessHeads, ProcessDetails } from "./Processes/data";
import { ProcessLists, initProcessLists } from "./Processes/lists";
import { Charts as ProcessCharts, initCharts } from "./Processes/charts";
import {
  ProcessesConfig,
  initProcessesConfig,
} from "./configuraiton/processes";

// TUTELAS
import { TutelaHeads, TutelaDetails, UserSelected } from "./Tutelas/data";
import { TutelaLists, initTutelaLists } from "./Tutelas/lists";
import { TutelaCharts, initTutelaCharts } from "./Tutelas/charts";
import { TutelasConfig, initTutelasConfig } from "./configuraiton/tutelas";

// REQUIREMENTS
import { RequirementsHeads, RequirementsDetail } from "./Requirements/data";
import { RequirementsLists, initRequirementsLists } from "./Requirements/lists";
import {
  RequirementsConfig,
  initRequirementsConfig,
} from "./configuraiton/requirements";
import {
  RequirementsCharts,
  initRequirementsCharts,
} from "./Requirements/charts";

export interface RootProcesses {
  heads: ProcessHeads[];
  details: ProcessDetails | null;
  lists: ProcessLists;
  charts: ProcessCharts;
  iframes: IFrames[];
}
export interface RootTutelas {
  heads: TutelaHeads[];
  users: UserSelected[];
  details: TutelaDetails | null;
  lists: TutelaLists;
  charts: TutelaCharts;
  iframes: IFrames[];
}
export interface RootRequirements {
  heads: RequirementsHeads[];
  details: RequirementsDetail | null;
  lists: RequirementsLists;
  charts: RequirementsCharts;
  iframes: IFrames[];
}
export interface RootConfig {
  processes: ProcessesConfig;
  tutelas: TutelasConfig;
  requirements: RequirementsConfig;
}

export interface RootState {
  loading: boolean;
  sesion: Users;
  users: Users[];
  processes: RootProcesses;
  tutelas: RootTutelas;
  requirements: RootRequirements;
  config: RootConfig;
}

export const initRootState: RootState = {
  loading: false,
  sesion: initUser(),
  users: [],
  processes: {
    heads: [],
    details: null,
    lists: initProcessLists,
    charts: initCharts,
    iframes: [],
  },
  tutelas: {
    heads: [],
    users: [],
    details: null,
    lists: initTutelaLists,
    charts: initTutelaCharts,
    iframes: [],
  },
  requirements: {
    heads: [],
    details: null,
    lists: initRequirementsLists(),
    charts: initRequirementsCharts(),
    iframes: [],
  },
  config: {
    processes: initProcessesConfig(),
    tutelas: initTutelasConfig(),
    requirements: initRequirementsConfig(),
  },
};
