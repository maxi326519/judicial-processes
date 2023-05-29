import {
  initLists,
  initProcessesDetails,
} from "../../interfaces/JudicialProcesses";
import { RootState } from "../../interfaces/RootState";
import { initUser } from "../../interfaces/users";
import { IFrames } from "../../interfaces/iframes";
import { GET_IFRAME, SET_IFRAME, UPDATE_IFRAME } from "../actions/iframe";
import {
  GET_PROCESSES,
  GET_PROCESSES_DETAILS,
  SET_PROCESSES,
  UPDATE_PROCESSES,
} from "../actions/judicialProcesses";
import { GET_USER, SET_USER } from "../actions/users";
import { LOADING } from "../actions/loading";

const initialState: RootState = {
  user: initUser,
  users: [],
  processes: {
    judicialProcesses: [],
    processesDetails: initProcessesDetails,
  },
  lists: initLists,
  graphics: {},
  iframes: [],
};

export const rootReducer = (state = initialState, action: any) => {
  switch (action.type) {
    /* LOADING */
    case LOADING:
      return {
        ...state,
        loading: true,
      };

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
          processesDetails: initProcessesDetails,
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
    /* PROCESSES */

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
    /* IFRAME */

    default:
      return state;
  }
};
