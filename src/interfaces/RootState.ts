import { Users, initUser } from "./users";
import { IFrames } from "./iframes";

// PROCESSES
import { ProcessHeads, ProcessDetails } from "./Processes/data";
import { ProcessLists, initProcessLists } from "./Processes/lists";
import { Charts as ProcessCharts, initCharts } from "./Processes/charts";

// TUTELAS
import { TutelaHeads, TutelaDetails } from "./Tutelas/data";
import { TutelaLists, initTutelaLists } from "./Tutelas/lists";
import { TutelaCharts, initTutelaCharts } from "./Tutelas/charts";

// REQUIREMENTS
import { RequirementsHeads, RequirementsDetail } from "./Requirements/data";
import { RequirementsLists, initRequirementsLists } from "./Requirements/lists";
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

export interface RootState {
  loading: boolean;
  sesion: Users;
  users: Users[];
  processes: RootProcesses;
  tutelas: RootTutelas;
  requirements: RootRequirements;
}

export const initRootState = {
  loading: false,
  sesion: initUser,
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
    details: null,
    lists: initTutelaLists,
    charts: initTutelaCharts,
    iframes: [],
  },
  requirements: {
    heads: [],
    details: null,
    lists: initRequirementsLists,
    charts: initRequirementsCharts,
    iframes: [],
  },
};
