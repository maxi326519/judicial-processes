import { Users } from "./users";

export interface HistoryData {
  date: Date;
  history: History[];
}

export interface History {
  user: {
    id: string;
    name: string;
  };
  logued: number;
  ingress: number;
}

export const initHistoryData = (): HistoryData => ({
  date: new Date(),
  history: [],
});

export const initHistory = (
  user?: Users,
  logued?: number,
  ingress?: number
): History => ({
  user: {
    id: user?.id || "",
    name: user?.name || "",
  },
  logued: logued || 0,
  ingress: ingress || 0,
});
