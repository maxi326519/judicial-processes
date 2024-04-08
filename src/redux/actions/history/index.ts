import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { History, initHistory } from "../../../interfaces/history";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../../../interfaces/RootState";
import { AnyAction } from "redux";
import { Dispatch } from "react";
import { Users } from "../../../interfaces/users";
import { db } from "../../../firebase/config";

const historyColl = collection(db, "History");

export const GET_HISTORY_USER = "GET_HISTORY_USER";
export const UPDATE_HISTORY_USER = "UPDATE_HISTORY_USER";

export function getHistoryUser(
  filter?: string
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      // Create id
      const date = filter ? new Date(`${filter}  12:00:00`) : new Date();
      const year = date.getFullYear();
      const month = `0${date.getMonth() + 1}`.slice(-2);
      const day = `0${date.getDate()}`.slice(-2);
      const docId = `${year}-${month}-${day}`;

      // Get doc by id
      const snapshot = await getDoc(doc(historyColl, docId));
      let userHistory = snapshot.data()?.data;

      // If the doc dont exist create it
      if (!snapshot.exists()) {
        userHistory = [];
        await setDoc(doc(historyColl, docId), { data: userHistory });
      }

      dispatch({
        type: GET_HISTORY_USER,
        payload: {
          date: date,
          history: userHistory,
        },
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function updateUserHistory(
  user: Users,
  logued?: boolean,
  ingress?: boolean
): ThunkAction<Promise<void>, RootState, null, AnyAction> {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      // Create id
      const date = new Date();
      const year = date.getFullYear();
      const month = `0${date.getMonth() + 1}`.slice(-2);
      const day = `0${date.getDate()}`.slice(-2);
      const docId = `${year}-${month}-${day}`;

      // Get doc by id
      const snapshot = await getDoc(doc(historyColl, docId));
      let userHistory: Array<History> | undefined = snapshot.data()?.data as
        | Array<History>
        | undefined;

      // If the doc dont exist create it
      if (!snapshot.exists() && !userHistory) {
        userHistory = [];
      }

      // Update history
      console.log(logued, ingress);
      console.log(userHistory);

      let currentUser = userHistory?.find((u) => u.user.id === user.id);

      console.log(currentUser);

      if (!currentUser) userHistory?.push(initHistory(user));
      else {
        currentUser = {
          user: { id: user.id!, name: user.name },
          logued: logued ? currentUser.logued + 1 : currentUser.logued,
          ingress: ingress ? currentUser.ingress + 1 : currentUser.ingress,
        };
        userHistory = userHistory!.map((h) =>
          h.user.id === user.id ? currentUser : h
        ) as History[];
      }

      console.log(currentUser);
      console.log(userHistory);

      // Save history
      await setDoc(doc(historyColl, docId), { data: userHistory });

      dispatch({
        type: UPDATE_HISTORY_USER,
        payload: {
          date: date,
          history: userHistory,
        },
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}
