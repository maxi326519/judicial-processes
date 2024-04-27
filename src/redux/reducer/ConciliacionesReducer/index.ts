import { GET_CONCILIACIONES_IFRAMES } from "../../actions/Conciliaciones/iframe";
import { AnyAction } from "redux";
import { IFrames } from "../../../interfaces/iframes";
import { LOGOUT } from "../../actions/sesion";
import {
  RootConciliaciones,
  initRootState,
} from "../../../interfaces/RootState";
import {
  CLEAR_ALL_CONCILIACIONES,
  DELETE_CONCILIACIONES,
  DELETE_CONCILIACIONES_DETAILS,
  GET_CONCILIACIONES,
  GET_CONCILIACIONES_DETAILS,
  IMPORT_CONCILIACIONES,
  SET_CONCILIACIONES,
  UPDATE_CONCILIACIONES,
} from "../../actions/Conciliaciones/conciliaciones";
import {
  GET_CONCILIACIONES_LISTS,
  SET_CONCILIACIONES_ITEM_LISTS,
  DELETE_CONCILIACIONES_ITEM_LISTS,
} from "../../actions/Conciliaciones/lists";
import {
  DELETE_CONCILIACIONES_IFRAME,
  SET_CONCILIACIONES_IFRAME,
  UPDATE_CONCILIACIONES_IFRAME,
} from "../../actions/Conciliaciones/iframe";

export const conciliacionesReducer = (
  state: RootConciliaciones = { ...initRootState.conciliaciones },
  action: AnyAction
) => {
  switch (action.type) {
    case SET_CONCILIACIONES:
      return {
        ...state,
        heads: [...state.heads, action.payload],
      };

    case GET_CONCILIACIONES:
      return {
        ...state,
        heads: action.payload,
      };

    case GET_CONCILIACIONES_DETAILS:
      return {
        ...state,
        details: action.payload,
      };

    case UPDATE_CONCILIACIONES:
      return {
        ...state,
        heads: state.heads.map((head) =>
          head.id === action.payload.id ? action.payload : head
        ),
      };

    case DELETE_CONCILIACIONES:
      return {
        ...state,
        heads: state.heads.filter((head) => head.id !== action.payload),
      };

    case DELETE_CONCILIACIONES_DETAILS:
      return {
        ...state,
        details: null,
      };

    case IMPORT_CONCILIACIONES:
      return {
        ...state,
        heads: action.payload,
      };

    case CLEAR_ALL_CONCILIACIONES:
      return {
        ...state,
        heads: [],
      };

    /* CONCILIACIONES_LISTS */
    case GET_CONCILIACIONES_LISTS:
      return {
        ...state,
        lists: action.payload,
      };

    case SET_CONCILIACIONES_ITEM_LISTS:
      return {
        ...state,
        lists: {
          ...state.lists,
          [action.payload.listName]: [
            ...state.lists[action.payload.listName as keyof typeof state.lists],
            ...action.payload.newValues,
          ].sort((a, b) => a.localeCompare(b)),
        },
      };

    case DELETE_CONCILIACIONES_ITEM_LISTS:
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
    /* CONCILIACIONES_LISTS */

    /* CONCILIACIONES_IFRAME */
    case SET_CONCILIACIONES_IFRAME:
      return {
        ...state,
        iframes: [...state.iframes, action.payload],
      };

    case GET_CONCILIACIONES_IFRAMES:
      return {
        ...state,
        iframes: action.payload,
      };

    case UPDATE_CONCILIACIONES_IFRAME:
      return {
        ...state,
        iframes: state.iframes.map((iframe: IFrames) =>
          iframe.id === action.payload.id ? action.payload : iframe
        ),
      };

    case DELETE_CONCILIACIONES_IFRAME:
      return {
        ...state,
        iframes: state.iframes.filter(
          (item: IFrames) => item.id !== action.payload
        ),
      };
    /* CONCILIACIONES_IFRAME */

    case LOGOUT:
      return { ...initRootState.conciliaciones };

    /* CONCILIACIONES_CHARTS */
    default:
      return state;
  }
};
