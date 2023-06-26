import { RootProcesses, initRootState } from "../../../interfaces/RootState";
import { initProcessDetails } from "../../../interfaces/Processes/data";
import { AnyAction } from "redux";
import { IFrames } from "../../../interfaces/iframes";
import { GET_CHARTS, SET_CHARTS } from "../../actions/Processes/charts";
import {
  DELETE_IFRAME,
  GET_IFRAMES,
  SET_IFRAME,
  UPDATE_IFRAME,
} from "../../actions/Processes/iframe";
import {
  DELETE_PROCESSES,
  DELETE_PROCESSES_DETAILS,
  GET_PROCESSES,
  GET_PROCESSES_DETAILS,
  SET_PROCESSES,
  UPDATE_PROCESSES,
} from "../../actions/Processes/processes";

import {
  DELETE_ITEM,
  GET_LISTS,
  SET_ITEM,
} from "../../actions/Processes/lists";

export const processesReducer = (
  state: RootProcesses = { ...initRootState.processes },
  action: AnyAction
) => {
  switch (action.type) {
    /* PROCESSES */
    case SET_PROCESSES:
      return {
        ...state,
        heads: [...state.heads, action.payload],
      };

    case GET_PROCESSES:
      return {
        ...state,
        heads: action.payload,
      };

    case UPDATE_PROCESSES:
      return {
        ...state,
        heads: state.heads.map((head) =>
          head.idSiproj === action.payload.idSiproj ? action.payload : head
        ),
      };

    case DELETE_PROCESSES:
      return {
        ...state,
        heads: state.heads.filter((head) => head.idSiproj !== action.payload),
      };

    case GET_PROCESSES_DETAILS:
      return {
        ...state,
        details: action.payload,
      };

    case DELETE_PROCESSES_DETAILS:
      return {
        ...state,
        processesDetails: initProcessDetails,
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
    case GET_LISTS:
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

    case GET_IFRAMES:
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
