import { AnyAction } from "redux";
import { RootTutelas, initRootState } from "../../../interfaces/RootState";
import { IFrames } from "../../../interfaces/iframes";
import {
  DELETE_TUTELAS,
  GET_TUTELAS,
  IMPORT_TUTELAS,
  SET_TUTELAS,
  UPDATE_TUTELAS,
} from "../../actions/Tutelas/tutelas";
import {
  DELETE_TUTELAS_ITEM_LISTS,
  GET_TUTELAS_LISTS,
  SET_TUTELAS_ITEM_LISTS,
} from "../../actions/Tutelas/lists";
import {
  DELETE_TUTELAS_IFRAME,
  SET_TUTELAS_IFRAME,
  UPDATE_TUTELAS_IFRAME,
} from "../../actions/Tutelas/iframe";
import { GET_TUTELAS_IFRAMES } from "../../actions/Tutelas/iframe";
import {
  GET_TUTELAS_CHARTS,
  SET_TUTELAS_CHARTS,
} from "../../actions/Tutelas/charts";
import { LOGOUT } from "../../actions/sesion";

export const tutelasReducer = (
  state: RootTutelas = { ...initRootState.tutelas },
  action: AnyAction
) => {
  switch (action.type) {
    case SET_TUTELAS:
      return {
        ...state,
        heads: action.payload.head,
      };

    case GET_TUTELAS:
      return {
        ...state,
        heads: action.payload,
      };

    case UPDATE_TUTELAS:
      return {
        ...state,
        heads: state.heads.map((head) =>
          head.idSiproj === action.payload.idSiproj ? action.payload : head
        ),
      };

    case DELETE_TUTELAS:
      return {
        ...state,
        heads: state.heads.filter((head) => head.idSiproj !== action.payload),
      };

    case IMPORT_TUTELAS:
      return {
        ...state,
        heads: action.payload,
      };

    /* TUTELAS_LISTS */
    case GET_TUTELAS_LISTS:
      return {
        ...state,
        lists: action.payload,
      };

    case SET_TUTELAS_ITEM_LISTS:
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

    case DELETE_TUTELAS_ITEM_LISTS:
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
    /* TUTELAS_LISTS */

    /* TUTELAS_IFRAME */
    case SET_TUTELAS_IFRAME:
      return {
        ...state,
        iframes: [...state.iframes, action.payload],
      };

    case GET_TUTELAS_IFRAMES:
      return {
        ...state,
        iframes: action.payload,
      };

    case UPDATE_TUTELAS_IFRAME:
      return {
        ...state,
        iframes: state.iframes.map((iframe: IFrames) =>
          iframe.id === action.payload.id ? action.payload : iframe
        ),
      };

    case DELETE_TUTELAS_IFRAME:
      return {
        ...state,
        iframes: state.iframes.filter(
          (item: IFrames) => item.id !== action.payload
        ),
      };
    /* TUTELAS_IFRAME */

    /* TUTELAS_CHARTS */
    case SET_TUTELAS_CHARTS:
      return {
        ...state,
        charts: action.payload,
      };

    case GET_TUTELAS_CHARTS:
      return {
        ...state,
        charts: action.payload,
      };

    case LOGOUT:
      return { ...initRootState.tutelas };

    /* TUTELAS_CHARTS */
    default:
      return state;
  }
};
