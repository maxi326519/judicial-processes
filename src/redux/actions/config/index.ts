import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../../../interfaces/RootState";
import { AnyAction } from "redux";
import { Dispatch } from "react";
import {
  ProcessesConfig,
  initProcessesConfig,
} from "../../../interfaces/configuraiton/processes";
import {
  TutelasConfig,
  initTutelasConfig,
} from "../../../interfaces/configuraiton/tutelas";
import {
  RequirementsConfig,
  initRequirementsConfig,
} from "../../../interfaces/configuraiton/requirements";

const configColl = collection(db, "Configuration");
const processesConfigDoc = doc(configColl, "ProcessesConfig");
const tutelasConfigDoc = doc(configColl, "TutelasConfig");
const requirementsConfigDoc = doc(configColl, "RequirementsConfig");

export const UPDATE_PROCESSES_CONFIG = "UPDATE_PROCESSES_CONFIG";
export const UPDATE_TUTELAS_CONFIG = "UPDATE_TUTELAS_CONFIG";
export const UPDATE_REQUIREMENTS_CONFIG = "UPDATE_REQUIREMENTS_CONFIG";

export const GET_PROCESSES_CONFIG = "GET_PROCESSES_CONFIG";
export const GET_TUTELAS_CONFIG = "GET_TUTELAS_CONFIG";
export const GET_REQUIREMENTS_CONFIG = "GET_REQUIREMENTS_CONFIG";

export function getProcessesConfig(): ThunkAction<
  Promise<void>,
  RootState,
  null,
  AnyAction
> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const snapshot = await getDoc(processesConfigDoc);
      let processesConfig = snapshot.data();

      if (!snapshot.exists()) {
        processesConfig = initProcessesConfig();
        await setDoc(processesConfigDoc, processesConfig);
      }

      dispatch({
        type: GET_PROCESSES_CONFIG,
        payload: processesConfig,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function getTutelasConfig(): ThunkAction<
  Promise<void>,
  RootState,
  null,
  AnyAction
> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const snapshot = await getDoc(tutelasConfigDoc);
      let tutelasConfig = snapshot.data();

      if (!snapshot.exists()) {
        tutelasConfig = initTutelasConfig();
        await setDoc(tutelasConfigDoc, tutelasConfig);
      }

      dispatch({
        type: GET_TUTELAS_CONFIG,
        payload: tutelasConfig,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function getRequirementsConfig(): ThunkAction<
  Promise<void>,
  RootState,
  null,
  AnyAction
> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const snapshot = await getDoc(requirementsConfigDoc);
      let requirementsConfig = snapshot.data();

      if (!snapshot.exists()) {
        requirementsConfig = initRequirementsConfig();
        await setDoc(requirementsConfigDoc, requirementsConfig);
      }

      dispatch({
        type: GET_REQUIREMENTS_CONFIG,
        payload: requirementsConfig,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function updateProcessesConfig(
  processesConfig: ProcessesConfig
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      await updateDoc(processesConfigDoc, { ...processesConfig });

      dispatch({
        type: UPDATE_PROCESSES_CONFIG,
        payload: processesConfig,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function updateTutelasConfig(
  tutelasConfig: TutelasConfig
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      await updateDoc(tutelasConfigDoc, { ...tutelasConfig });

      dispatch({
        type: UPDATE_TUTELAS_CONFIG,
        payload: tutelasConfig,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function updateRequirementsConfig(
  requirementsConfig: RequirementsConfig
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      await updateDoc(requirementsConfigDoc, { ...requirementsConfig });

      dispatch({
        type: UPDATE_REQUIREMENTS_CONFIG,
        payload: requirementsConfig,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}
