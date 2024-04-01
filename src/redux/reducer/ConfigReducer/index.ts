import { RootConfig, initRootState } from "../../../interfaces/RootState";
import { AnyAction } from "redux";
import {
  GET_PODERES_CONFIG,
  GET_PROCESSES_CONFIG,
  GET_REQUIREMENTS_CONFIG,
  GET_TUTELAS_CONFIG,
  UPDATE_PODERES_CONFIG,
  UPDATE_PROCESSES_CHANGE_CONFIG,
  UPDATE_PROCESSES_CONFIG,
  UPDATE_REQUIREMENTS_CONFIG,
  UPDATE_TUTELAS_CONFIG,
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

    default:
      return state;
  }
};
