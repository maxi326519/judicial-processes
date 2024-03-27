import { initRootState, RootPoderes } from "../../../interfaces/RootState";
import { AnyAction } from "redux";
import { IFrames } from "../../../interfaces/iframes";
import { LOGOUT } from "../../actions/sesion";
import {
  CLEAR_ALL_PODERES,
  DELETE_PODERES,
  GET_PODERES,
  GET_PODERES_DETAILS,
  GET_PODERES_USERS,
  IMPORT_PODERES,
  SET_PODERES,
  SET_PODERES_USERS,
  UPDATE_PODERES,
} from "../../actions/Poderes/poderes";
import {
  DELETE_PODERES_ITEM_LISTS,
  GET_PODERES_LISTS,
  SET_PODERES_ITEM_LISTS,
} from "../../actions/Poderes/lists";
import {
  DELETE_PODERES_IFRAME,
  SET_PODERES_IFRAME,
  UPDATE_PODERES_IFRAME,
} from "../../actions/Poderes/iframe";
import { GET_PODERES_IFRAMES } from "../../actions/Poderes/iframe";
import {
  GET_PODERES_CHARTS,
  SET_PODERES_CHARTS,
} from "../../actions/Poderes/charts";
import { DELETE_PODER_DETAILS } from "../../actions/Poderes/poderes";

export const poderesReducer = (
  state: RootPoderes = { ...initRootState.poderes },
  action: AnyAction
) => {
  switch (action.type) {
    case SET_PODERES:
      return {
        ...state,
        heads: [...state.heads, action.payload],
      };

    case GET_PODERES:
      return {
        ...state,
        heads: action.payload,
      };

    case UPDATE_PODERES:
      return {
        ...state,
        heads: state.heads.map((head) =>
          head.id === action.payload.id ? action.payload : head
        ),
      };

    case DELETE_PODERES:
      return {
        ...state,
        heads: state.heads.filter((head) => head.id !== action.payload),
      };

    case IMPORT_PODERES:
      return {
        ...state,
        heads: action.payload,
      };

    case GET_PODERES_DETAILS:
      return {
        ...state,
        details: action.payload,
      };

    case DELETE_PODER_DETAILS:
      return {
        ...state,
        details: null,
      };

    case CLEAR_ALL_PODERES:
      return {
        ...state,
        heads: [],
      };

    /* PODERES_LISTS */
    case GET_PODERES_LISTS:
      return {
        ...state,
        lists: action.payload,
      };

    case SET_PODERES_ITEM_LISTS:
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

    case DELETE_PODERES_ITEM_LISTS:
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
    /* PODERES_LISTS */

    /* PODERES_IFRAME */
    case SET_PODERES_IFRAME:
      return {
        ...state,
        iframes: [...state.iframes, action.payload],
      };

    case GET_PODERES_IFRAMES:
      return {
        ...state,
        iframes: action.payload,
      };

    case UPDATE_PODERES_IFRAME:
      return {
        ...state,
        iframes: state.iframes.map((iframe: IFrames) =>
          iframe.id === action.payload.id ? action.payload : iframe
        ),
      };

    case DELETE_PODERES_IFRAME:
      return {
        ...state,
        iframes: state.iframes.filter(
          (item: IFrames) => item.id !== action.payload
        ),
      };
    /* PODERES_IFRAME */

    /* PODERES_CHARTS */
    case SET_PODERES_CHARTS:
      return {
        ...state,
        charts: action.payload,
      };

    case GET_PODERES_CHARTS:
      return {
        ...state,
        charts: action.payload,
      };

    case SET_PODERES_USERS:
      return {
        ...state,
        users: action.payload,
      };

    case GET_PODERES_USERS:
      return {
        ...state,
        users: action.payload,
      };

    case LOGOUT:
      return { ...initRootState.poderes };

    /* PODERES_CHARTS */
    default:
      return state;
  }
};
