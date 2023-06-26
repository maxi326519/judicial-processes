import { AnyAction } from "redux";
import { RootRequirements, initRootState } from "../../../interfaces/RootState";
import {
  CLEAR_ALL_REQUIREMENTS,
  DELETE_REQUIREMENTS,
  GET_REQUIREMENTS,
  IMPORT_REQUIREMENTS,
  SET_REQUIREMENTS,
  UPDATE_REQUIREMENTS,
} from "../../actions/Requirements/requirements";
import {
  DELETE_REQUIREMENTS_ITEM,
  GET_REQUIREMENTS_LISTS,
  SET_REQUIREMENTS_ITEM,
} from "../../actions/Requirements/lists";
import {
  DELETE_REQUIREMENTS_IFRAME,
  SET_REQUIREMENTS_IFRAME,
  UPDATE_REQUIREMENTS_IFRAME,
} from "../../actions/Requirements/iframe";
import { GET_REQUIREMENTS_IFRAMES } from "../../actions/Requirements/iframe";
import { IFrames } from "../../../interfaces/iframes";
import {
  GET_REQUIREMENTS_CHARTS,
  SET_REQUIREMENTS_CHARTS,
} from "../../actions/Requirements/charts";
import { LOGOUT } from "../../actions/sesion";

export const requirementsReducer = (
  state: RootRequirements = { ...initRootState.requirements },
  action: AnyAction
) => {
  switch (action.type) {
    case SET_REQUIREMENTS:
      return {
        ...state,
        heads: action.payload.head,
      };

    case GET_REQUIREMENTS:
      return {
        ...state,
        heads: action.payload,
      };

    case UPDATE_REQUIREMENTS:
      return {
        ...state,
        heads: state.heads.map((head) =>
          head.idSiproj === action.payload.idSiproj ? action.payload : head
        ),
      };

    case DELETE_REQUIREMENTS:
      return {
        ...state,
        heads: state.heads.filter((head) => head.idSiproj !== action.payload),
      };

    case IMPORT_REQUIREMENTS:
      return {
        ...state,
        heads: action.payload,
      };

    case CLEAR_ALL_REQUIREMENTS:
      return {
        ...state,
        heads: [],
      };

    /* REQUIREMENTS_LISTS */
    case GET_REQUIREMENTS_LISTS:
      return {
        ...state,
        lists: action.payload,
      };

    case SET_REQUIREMENTS_ITEM:
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

    case DELETE_REQUIREMENTS_ITEM:
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
    /* REQUIREMENTS_LISTS */

    /* REQUIREMENTS_IFRAME */
    case SET_REQUIREMENTS_IFRAME:
      return {
        ...state,
        iframes: [...state.iframes, action.payload],
      };

    case GET_REQUIREMENTS_IFRAMES:
      return {
        ...state,
        iframes: action.payload,
      };

    case UPDATE_REQUIREMENTS_IFRAME:
      return {
        ...state,
        iframes: state.iframes.map((iframe: IFrames) =>
          iframe.id === action.payload.id ? action.payload : iframe
        ),
      };

    case DELETE_REQUIREMENTS_IFRAME:
      return {
        ...state,
        iframes: state.iframes.filter(
          (item: IFrames) => item.id !== action.payload
        ),
      };
    /* REQUIREMENTS_IFRAME */

    /* REQUIREMENTS_CHARTS */
    case SET_REQUIREMENTS_CHARTS:
      return {
        ...state,
        charts: action.payload,
      };

    case GET_REQUIREMENTS_CHARTS:
      return {
        ...state,
        charts: action.payload,
      };

    case LOGOUT:
      return { ...initRootState.requirements };

    /* REQUIREMENTS_CHARTS */
    default:
      return state;
  }
};
