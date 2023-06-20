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
import {
  DELETE_USER,
  GET_USER,
  GET_USER_DATA,
  SET_USER,
  UPDATE_EMAIL,
  UPDATE_USER,
} from "../actions/users";
import { CLOSE_LOADING, LOADING } from "../actions/loading";
import { DELETE_ITEM, GET_LIST, SET_ITEM } from "../actions/lists/lists";
import { initCharts } from "../../interfaces/charts";
import { GET_CHARTS, SET_CHARTS } from "../actions/charts";
import { LOG_OUT } from "../actions/login";

const initialState: RootState = {
  loading: false,
  user: initUser,
  users: [],
  processes: {
    judicialProcesses: [],
    processesDetails: null,
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

    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };

    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };

    case GET_USER:
      return {
        ...state,
        users: action.payload,
        lists: {
          ...state.lists,
          apoderados: [...state.lists.apoderados, action.payload.name],
        },
      };

    case GET_USER_DATA:
      return {
        ...state,
        user: action.payload,
      };

    case UPDATE_EMAIL:
      return {
        ...state,
        user: {
          ...state.user,
          email: action.payload,
        },
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
              processes.idSiproj === action.payload.idSiproj
                ? action.payload
                : processes
          ),
        },
      };

    case DELETE_PROCESSES:
      return {
        ...state,
        processes: {
          judicialProcesses: state.processes.judicialProcesses.filter(
            (doc) => doc.idSiproj !== action.payload
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

    case DELETE_ITEM:
      const data: any[] =
        state.lists[action.payload.listName as keyof typeof state.lists];
      return {
        ...state,
        lists: {
          ...state.lists,
          [action.payload.listName as keyof typeof state.lists]: data.filter(
            (item) => {
              if (typeof item === "string") {
                return !action.payload.values.some(
                  (value: string) => value === item
                );
              } else if (item.fecha) {
                return !action.payload.values.some(
                  (value: { fecha: string; salario: number }) =>
                    value.fecha === item.fecha
                );
              } else if (item.tipo) {
                return !action.payload.values.some(
                  (value: { tipo: string; dias: number }) =>
                    value.tipo === item.tipo
                );
              } else {
                return false;
              }
            }
          ),
        },
      };
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
