import { Users, initUser } from "./users";
import { IFrames } from "./iframes";

// PROCESSES
import { ProcessHeads, ProcessDetail } from "./Processes/data";
import { ProcessLists, initProcessLists } from "./Processes/lists";
import { Charts as ProcessCharts, initCharts } from "./Processes/charts";

// TUTELAS
import { TutelaHeads, TutelaDetail } from "./Tutelas/data";
import { TuletaLists, initTuletaLists } from "./Tutelas/lists";
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
  details: ProcessDetail | null;
  lists: ProcessLists;
  charts: ProcessCharts;
  iframes: IFrames[];
}
export interface RootTutelas {
  heads: TutelaHeads[];
  details: TutelaDetail | null;
  lists: TuletaLists;
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
    lists: initTuletaLists,
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
