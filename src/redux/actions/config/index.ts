import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { PoderesConfig } from "../../../interfaces/Configuration/poderes";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../../../interfaces/RootState";
import { AnyAction } from "redux";
import { Dispatch } from "react";
import { db } from "../../../firebase/config";
import {
  ProcessesConfig,
  initProcessesConfig,
} from "../../../interfaces/Configuration/processes";
import {
  TutelasConfig,
  initTutelasConfig,
} from "../../../interfaces/Configuration/tutelas";
import {
  RequirementsConfig,
  initRequirementsConfig,
} from "../../../interfaces/Configuration/requirements";
import { ConciliacionesConfig, initConciliacionesConfig } from "../../../interfaces/Configuration/conciliaciones";

const configColl = collection(db, "Configuration");
const processesConfigDoc = doc(configColl, "ProcessesConfig");
const tutelasConfigDoc = doc(configColl, "TutelasConfig");
const requirementsConfigDoc = doc(configColl, "RequirementsConfig");
const poderesConfigDoc = doc(configColl, "PoderesConfig");
const conciliacionesConfigDoc = doc(configColl, "ConciliacionesConfig");

export const UPDATE_PROCESSES_CONFIG = "UPDATE_PROCESSES_CONFIG";
export const UPDATE_PROCESSES_CHANGE_CONFIG = "UPDATE_PROCESSES_CHANGE_CONFIG";
export const UPDATE_TUTELAS_CONFIG = "UPDATE_TUTELAS_CONFIG";
export const UPDATE_REQUIREMENTS_CONFIG = "UPDATE_REQUIREMENTS_CONFIG";
export const UPDATE_PODERES_CONFIG = "UPDATE_PODERES_CONFIG";
export const UPDATE_CONCILIACIONES_CONFIG = "UPDATE_CONCILIACIONES_CONFIG";

export const GET_PROCESSES_CONFIG = "GET_PROCESSES_CONFIG";
export const GET_TUTELAS_CONFIG = "GET_TUTELAS_CONFIG";
export const GET_REQUIREMENTS_CONFIG = "GET_REQUIREMENTS_CONFIG";
export const GET_PODERES_CONFIG = "GET_PODERES_CONFIG";
export const GET_CONCILIACIONES_CONFIG = "GET_CONCILIACIONES_CONFIG";

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

export function getPoderesConfig(): ThunkAction<
  Promise<void>,
  RootState,
  null,
  AnyAction
> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const snapshot = await getDoc(poderesConfigDoc);
      let poderesConfig = snapshot.data();

      if (!snapshot.exists()) {
        poderesConfig = initRequirementsConfig();
        await setDoc(poderesConfigDoc, poderesConfig);
      }

      dispatch({
        type: GET_PODERES_CONFIG,
        payload: poderesConfig,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function getConciliacionesConfig(): ThunkAction<
  Promise<void>,
  RootState,
  null,
  AnyAction
> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const snapshot = await getDoc(conciliacionesConfigDoc);
      let conciliacionesConfig = snapshot.data();

      if (!snapshot.exists()) {
        conciliacionesConfig = initConciliacionesConfig();
        await setDoc(conciliacionesConfigDoc, conciliacionesConfig);
      }

      dispatch({
        type: GET_CONCILIACIONES_CONFIG,
        payload: conciliacionesConfig,
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

export function updateCheckAct(
  processConfig: ProcessesConfig,
  changeId: number[]
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const newConfig = {
        ...processConfig,
        check: {
          date: new Date(),
          value: false,
          changeId: changeId,
        },
      };

      await updateDoc(processesConfigDoc, newConfig);

      dispatch({
        type: UPDATE_PROCESSES_CHANGE_CONFIG,
        payload: newConfig,
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

export function updatePoderesConfig(
  poderesConfig: PoderesConfig
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      await updateDoc(poderesConfigDoc, { ...poderesConfig });

      dispatch({
        type: GET_PODERES_CONFIG,
        payload: poderesConfig,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function updateConciliacionesConfig(
  conciliacionesConfig: ConciliacionesConfig
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      await updateDoc(conciliacionesConfigDoc, { ...conciliacionesConfig });

      dispatch({
        type: GET_CONCILIACIONES_CONFIG,
        payload: conciliacionesConfig,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}
