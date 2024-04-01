import { RootProcesses, initRootState } from "../../../interfaces/RootState";
import { AnyAction } from "redux";
import { IFrames } from "../../../interfaces/iframes";
import {
  GET_PROCESS_CHARTS,
  SET_PROCESS_CHARTS,
} from "../../actions/Processes/charts";
import {
  DELETE_PROCESS_IFRAME,
  GET_PROCESS_IFRAMES,
  SET_PROCESS_IFRAME,
  UPDATE_PROCESS_IFRAME,
} from "../../actions/Processes/iframe";
import {
  SET_PROCESS,
  GET_PROCESSES,
  DELETE_PROCESS,
  GET_PROCESS_DETAILS,
  UPDATE_PROCESS_DETAILS,
  DELETE_PROCESS_DETAILS,
  IMPORT_PROCESSES,
  CLEAR_ALL_PROCESSES,
} from "../../actions/Processes/processes";

import {
  SET_PROCESS_LIST_ITEM,
  GET_PROCESS_LISTS,
  DELETE_PROCESS_LIST_ITEM,
} from "../../actions/Processes/lists";
import { LOGOUT } from "../../actions/sesion";

export const processesReducer = (
  state: RootProcesses = { ...initRootState.processes },
  action: AnyAction
) => {
  switch (action.type) {
    /* PROCESSES */
    case SET_PROCESS:
      return {
        ...state,
        heads: [...state.heads, action.payload],
      };

    case GET_PROCESSES:
      return {
        ...state,
        heads: action.payload,
      };

    case DELETE_PROCESS:
      return {
        ...state,
        heads: state.heads.filter((head) => head.idSiproj !== action.payload),
      };

    case GET_PROCESS_DETAILS:
      return {
        ...state,
        details: action.payload,
      };

    case UPDATE_PROCESS_DETAILS:
      return {
        ...state,
        heads: state.heads.map((head) =>
          head.idSiproj === action.payload.idSiproj ? action.payload : head
        ),
      };

    case DELETE_PROCESS_DETAILS:
      return {
        ...state,
        details: null,
      };

    case IMPORT_PROCESSES:
      return {
        ...state,
        heads: action.payload,
      };

    case CLEAR_ALL_PROCESSES:
      return {
        ...state,
        heads: [],
      };

    /*       case GET_PROCESSES_DATA:
        return {
          ...state,
          processes: {
            ...state.processes,
            data: action.payload,
          },
        }; */
    /* PROCESSES */

    /* LISTS */
    case SET_PROCESS_LIST_ITEM:
      const item = action.payload.listName as keyof typeof state.lists;
      return {
        ...state,
        lists: {
          ...state.lists,
          [action.payload.listName]: [
            ...state.lists[item],
            ...action.payload.newValues,
          ].sort((a, b) => {
            if (item === "tipoProceso") {
              return a.tipo.localeCompare(b.tipo);
            } else if (item === "salariosMinimos") {
              if (a.fecha < b.fecha) {
                return -1; // Devuelve un número negativo si a.fecha es menor que b.fecha
              } else if (a.fecha > b.fecha) {
                return 1; // Devuelve un número positivo si a.fecha es mayor que b.fecha
              } else {
                return 0; // Devuelve 0 si a.fecha es igual a b.fecha
              }
            } else if (item !== "diasFestivos") {
              return a.localeCompare(b);
            }
          }),
        },
      };

    case GET_PROCESS_LISTS:
      return {
        ...state,
        lists: action.payload,
      };

    case DELETE_PROCESS_LIST_ITEM:
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

    /* IFRAMES */
    case SET_PROCESS_IFRAME:
      return {
        ...state,
        iframes: [...state.iframes, action.payload],
      };

    case GET_PROCESS_IFRAMES:
      return {
        ...state,
        iframes: action.payload,
      };

    case UPDATE_PROCESS_IFRAME:
      return {
        ...state,
        iframes: state.iframes.map((iframe: IFrames) =>
          iframe.id === action.payload.id ? action.payload : iframe
        ),
      };

    case DELETE_PROCESS_IFRAME:
      return {
        ...state,
        iframes: state.iframes.filter(
          (item: IFrames) => item.id !== action.payload
        ),
      };
    /* IFRAMES */

    /* CHARTS */
    case SET_PROCESS_CHARTS:
      return {
        ...state,
        charts: action.payload,
      };

    case GET_PROCESS_CHARTS:
      return {
        ...state,
        charts: action.payload,
      };
    /* CHARTS */

    case LOGOUT:
      return { ...initRootState.processes };

    default:
      return state;
  }
};
