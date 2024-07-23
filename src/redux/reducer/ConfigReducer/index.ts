import { RootConfig, initRootState } from "../../../interfaces/RootState";
import { SET_CONCILIACIONES } from "../../actions/Conciliaciones/conciliaciones";
import { AnyAction } from "redux";
import {
  UPDATE_CONCILIACIONES_CONFIG,
  GET_PODERES_CONFIG,
  GET_PROCESSES_CONFIG,
  GET_REQUIREMENTS_CONFIG,
  GET_TUTELAS_CONFIG,
  GET_CONCILIACIONES_CONFIG,
  UPDATE_PODERES_CONFIG,
  UPDATE_PROCESSES_CHANGE_CONFIG,
  UPDATE_PROCESSES_CONFIG,
  UPDATE_REQUIREMENTS_CONFIG,
  UPDATE_TUTELAS_CONFIG,
  GET_BACKUP_CONFIG,
  UPDATE_SYSTEM_CONFIG,
  GET_SYSTEM_CONFIG,
} from "../../actions/config";

export const configReducer = (
  state: RootConfig = { ...initRootState.config },
  action: AnyAction
) => {
  switch (action.type) {
    case UPDATE_PROCESSES_CONFIG:
      return {
        ...state,
        processes: action.payload,
      };

    case UPDATE_PROCESSES_CHANGE_CONFIG:
      return {
        ...state,
        processes: action.payload,
      };

    case UPDATE_TUTELAS_CONFIG:
      return {
        ...state,
        tutelas: action.payload,
      };

    case UPDATE_REQUIREMENTS_CONFIG:
      return {
        ...state,
        requirements: action.payload,
      };

    case UPDATE_PODERES_CONFIG:
      return {
        ...state,
        poderes: action.payload,
      };

    case UPDATE_CONCILIACIONES_CONFIG:
      return {
        ...state,
        consiliaciones: action.payload,
      };

    case UPDATE_SYSTEM_CONFIG:
      console.log(action.payload);

      return {
        ...state,
        system: action.payload,
      };

    case GET_PROCESSES_CONFIG:
      return {
        ...state,
        processes: action.payload,
      };

    case GET_TUTELAS_CONFIG:
      return {
        ...state,
        tutelas: action.payload,
      };

    case GET_REQUIREMENTS_CONFIG:
      return {
        ...state,
        requirements: action.payload,
      };

    case GET_PODERES_CONFIG:
      return {
        ...state,
        poderes: action.payload,
      };

    case GET_CONCILIACIONES_CONFIG:
      return {
        ...state,
        conciliaciones: action.payload,
      };

    case GET_BACKUP_CONFIG:
      return {
        ...state,
        backup: action.payload,
      };

    case GET_SYSTEM_CONFIG:
      return {
        ...state,
        system: action.payload,
      };

    case SET_CONCILIACIONES:
      return {
        ...state,
        conciliaciones: {
          ...state.conciliaciones,
          id: action.payload.id + 1,
        },
      };

    default:
      return state;
  }
};
