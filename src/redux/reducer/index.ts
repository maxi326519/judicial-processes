import {
  initLists,
  initProcessesDetails,
} from "../../interfaces/JudicialProcesses";
import { RootState } from "../../interfaces/RootState";
import { initUser } from "../../interfaces/users";
import { IFrames } from "../../interfaces/iframes";
import {
  DELETE_IFRAME,
  GET_IFRAME,
  SET_IFRAME,
  UPDATE_IFRAME,
} from "../actions/iframe";
import {
  DELETE_PROCESSES,
  DELETE_PROCESSES_DETAILS,
  GET_PROCESSES,
  GET_PROCESSES_DATA,
  GET_PROCESSES_DETAILS,
  SET_PROCESSES,
  UPDATE_PROCESSES,
} from "../actions/judicialProcesses";
import { GET_USER, GET_USER_DATA, LOG_OUT, SET_USER } from "../actions/users";
import { CLOSE_LOADING, LOADING } from "../actions/loading";
import { DELETE_ITEM, GET_LIST, SET_ITEM } from "../actions/lists/lists";
import { initCharts } from "../../interfaces/charts";
import { GET_CHARTS, SET_CHARTS } from "../actions/charts";

const initialState: RootState = {
  loading: false,
  user: initUser,
  users: [],
  processes: {
    judicialProcesses: [],
    processesDetails: null,
    data: [],
  },
  lists: initLists,
  charts: initCharts,
  iframes: [],
};

export const rootReducer = (state = { ...initialState }, action: any) => {
  switch (action.type) {
    /* LOADING */
    case LOADING:
      return {
        ...state,
        loading: true,
      };

    case CLOSE_LOADING:
      return {
        ...state,
        loading: false,
      };
    /* LOADING */

    /* USERS */
    case SET_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    case GET_USER:
      return {
        ...state,
        users: action.payload,
      };

    case GET_USER_DATA:
      return {
        ...state,
        user: action.payload,
      };

    case LOG_OUT:
      return initialState;

    /* USERS */

    /* PROCESSES */
    case SET_PROCESSES:
      return {
        ...state,
        processes: {
          judicialProcesses: [
            ...state.processes.judicialProcesses,
            action.payload.head,
          ],
          processesDetails: action.payload.details,
        },
      };

    case GET_PROCESSES:
      return {
        ...state,
        processes: {
          judicialProcesses: action.payload,
          processesDetails: null,
        },
      };

    case GET_PROCESSES_DETAILS:
      return {
        ...state,
        processes: {
          ...state.processes,
          processesDetails: action.payload,
        },
      };

    case GET_PROCESSES_DATA:
      return {
        ...state,
        processes: {
          ...state.processes,
          data: action.payload,
        },
      };

    case UPDATE_PROCESSES:
      return {
        ...state,
        processes: {
          ...state.processes,
          judicialProcesses: state.processes.judicialProcesses.map(
            (processes) =>
              processes.id === action.payload.id ? action.payload : processes
          ),
        },
      };

    case DELETE_PROCESSES:
      return {
        ...state,
        processes: {
          judicialProcesses: state.processes.judicialProcesses.filter(
            (doc) => doc.id !== action.payload
          ),
          processesDetails: initProcessesDetails,
        },
      };

    case DELETE_PROCESSES_DETAILS:
      return {
        ...state,
        processes: {
          ...state.processes,
          processesDetails: null,
        },
      };
    /* PROCESSES */

    /* LISTS */
    case GET_LIST:
      return {
        ...state,
        lists: action.payload,
      };

    case SET_ITEM:
      return {
        ...state,
        lists: {
          ...state.lists,
          [action.payload.listName]: [
            ...state.lists[action.payload.listName as keyof typeof state.lists],
            ...action.payload.newValues,
          ],
        },
      };

    /*       case DELETE_ITEM:
        return {
          ...state,
          lists: {
            ...state.lists,
            [action.payload.listName]: state.lists[
              action.payload.listName as keyof typeof state.lists
            ].filter((item: string | { tipo: string; dias: number; } | { fecha: string; salario: number; }) => {
              if (typeof item === "string") {
                return !action.payload.values.some((value: string) => value === item);
              }
              return false; // Opcional: Si deseas omitir los elementos no string
            }),
          },
        }; */
    /* LISTS */

    /* IFRAME */
    case SET_IFRAME:
      return {
        ...state,
        iframes: [...state.iframes, action.payload],
      };

    case GET_IFRAME:
      return {
        ...state,
        iframes: action.payload,
      };

    case UPDATE_IFRAME:
      return {
        ...state,
        iframes: state.iframes.map((iframe: IFrames) =>
          iframe.id === action.payload.id ? action.payload : iframe
        ),
      };

    case DELETE_IFRAME:
      return {
        ...state,
        iframes: state.iframes.filter(
          (item: IFrames) => item.id !== action.payload
        ),
      };
    /* IFRAME */

    /* CHARTS */
    case SET_CHARTS:
      return {
        ...state,
        charts: action.payload,
      };

    case GET_CHARTS:
      return {
        ...state,
        charts: action.payload,
      };
    /* CHARTS */
    default:
      return state;
  }
};
