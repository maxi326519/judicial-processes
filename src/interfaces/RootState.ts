import { Users, initUser } from "./users";
import { IFrames } from "./iframes";

// PROCESSES
import { Charts as ProcessCharts, initCharts } from "./Processes/charts";
import { ProcessLists, initProcessLists } from "./Processes/lists";
import { ProcessHeads, ProcessDetails } from "./Processes/data";
import {
  ProcessesConfig,
  initProcessesConfig,
} from "./configuraiton/processes";

// TUTELAS
import { TutelaHeads, TutelaDetails, UserSelected } from "./Tutelas/data";
import { TutelasConfig, initTutelasConfig } from "./configuraiton/tutelas";
import { TutelaCharts, initTutelaCharts } from "./Tutelas/charts";
import { TutelaLists, initTutelaLists } from "./Tutelas/lists";

// REQUIREMENTS
import { RequirementsLists, initRequirementsLists } from "./Requirements/lists";
import { RequirementsHeads, RequirementsDetail } from "./Requirements/data";
import { initPoderesConfig, PoderesConfig } from "./configuraiton/poderes";
import { initPoderesChart, PoderesChart } from "./Poderes/chart";
import { PoderesDetails, PoderesHeads } from "./Poderes/data";
import { initPoderesList, PoderesList } from "./Poderes/list";
import { HistoryData, initHistoryData } from "./history";
import {
  RequirementsConfig,
  initRequirementsConfig,
} from "./configuraiton/requirements";
import {
  RequirementsCharts,
  initRequirementsCharts,
} from "./Requirements/charts";
import {
  ConciliacionesConfig,
  initConciliacionesConfig,
} from "./configuraiton/consiliaciones";
import { Conciliaciones, ConciliacionesHeads } from "./Conciliaciones/data";
import {
  ConciliacionesList,
  initConciliacionesList,
} from "./Conciliaciones/list";

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

export interface RootPoderes {
  heads: PoderesHeads[];
  details: PoderesDetails | null;
  lists: PoderesList;
  charts: PoderesChart;
  iframes: IFrames[];
}

export interface RootRequirements {
  heads: RequirementsHeads[];
  details: RequirementsDetail | null;
  lists: RequirementsLists;
  charts: RequirementsCharts;
  iframes: IFrames[];
}

export interface RootConciliaciones {
  heads: ConciliacionesHeads[];
  details: Conciliaciones | null;
  lists: ConciliacionesList;
  iframes: IFrames[];
}

export interface RootConfig {
  processes: ProcessesConfig;
  tutelas: TutelasConfig;
  requirements: RequirementsConfig;
  poderes: PoderesConfig;
  consolidaciones: ConciliacionesConfig;
}

export interface RootState {
  loading: boolean;
  sesion: Users;
  users: Users[];
  processes: RootProcesses;
  tutelas: RootTutelas;
  requirements: RootRequirements;
  poderes: RootPoderes;
  conciliaciones: RootConciliaciones;
  config: RootConfig;
  history: HistoryData;
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
  poderes: {
    heads: [],
    details: null,
    lists: initPoderesList(),
    charts: initPoderesChart(),
    iframes: [],
  },
  conciliaciones: {
    heads: [],
    details: null,
    lists: initConciliacionesList(),
    iframes: [],
  },
  config: {
    processes: initProcessesConfig(),
    tutelas: initTutelasConfig(),
    requirements: initRequirementsConfig(),
    poderes: initPoderesConfig(),
    consolidaciones: initConciliacionesConfig(),
  },
  history: initHistoryData(),
};
