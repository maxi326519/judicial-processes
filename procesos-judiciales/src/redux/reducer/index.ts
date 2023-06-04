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
  GET_PROCESSES_DETAILS,
  SET_PROCESSES,
  UPDATE_PROCESSES,
} from "../actions/judicialProcesses";
import { GET_USER, SET_USER } from "../actions/users";
import { CLOSE_LOADING, LOADING } from "../actions/loading";
import { DELETE_ITEM, GET_LIST, SET_ITEM } from "../actions/lists/lists";
import Lists from "../../components/Dashboard/Lists/Lists";

const initialState: RootState = {
  loading: false,
  user: initUser,
  users: [],
  processes: {
    judicialProcesses: [],
    processesDetails: null,
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

    case DELETE_ITEM:
      return {
        ...state,
        lists: {
          ...state.lists,
          [action.payload.listName]: state.lists[
            action.payload.listName as keyof typeof state.lists
          ].filter(
            (item) =>
              !action.payload.values.some((value: string) => value === item)
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

    default:
      return state;
  }
};
