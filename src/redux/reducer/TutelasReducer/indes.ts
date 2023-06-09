import { AnyAction } from "redux";
import { RootTutelas, initRootState } from "../../../interfaces/RootState";
import { IFrames } from "../../../interfaces/iframes";
import {
  CLEAR_ALL_TUTELAS,
  DELETE_TUTELAS,
  DELETE_TUTELA_DETAILS,
  GET_TUTELAS,
  GET_TUTELAS_DETAILS,
  GET_TUTELAS_USERS,
  IMPORT_TUTELAS,
  SET_TUTELAS,
  SET_TUTELAS_USERS,
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
        heads: [...state.heads, action.payload],
        users: state.users.map((user) =>
          user.user === action.payload.abogado
            ? { ...user, available: false }
            : user
        ),
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
          head.id === action.payload.id ? action.payload : head
        ),
      };

    case DELETE_TUTELAS:
      return {
        ...state,
        heads: state.heads.filter((head) => head.id !== action.payload),
      };

    case IMPORT_TUTELAS:
      return {
        ...state,
        heads: action.payload,
      };

    case GET_TUTELAS_DETAILS:
      return {
        ...state,
        details: action.payload,
      };

    case DELETE_TUTELA_DETAILS:
      return {
        ...state,
        details: null,
      };

    case CLEAR_ALL_TUTELAS:
      return {
        ...state,
        heads: [],
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
          ].sort((a, b) => a.localeCompare(b)),
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

    case SET_TUTELAS_USERS:
      return {
        ...state,
        users: action.payload,
      };

    case GET_TUTELAS_USERS:
      return {
        ...state,
        users: action.payload,
      };

    case LOGOUT:
      return { ...initRootState.tutelas };

    /* TUTELAS_CHARTS */
    default:
      return state;
  }
};
