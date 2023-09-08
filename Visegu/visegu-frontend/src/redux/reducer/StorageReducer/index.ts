import { AnyAction } from "redux";
import { StorageState, initStorageState } from "../../../interfaces/ReduxState";

export const storageReducer = (state: StorageState  = initStorageState(), action: AnyAction) => {
  switch (action.type) {
    default:
      return state;
  }
};
