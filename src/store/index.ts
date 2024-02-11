import { create } from "zustand";

export type ILog = {
  note: string;
  hour: number;
  date: Date;
};

export type IResultLog = {
  note: string;
  hour: number;
  date: string;
};

interface LogState {
  log: ILog;
  logs: {
    [key: string]: ILog;
  };
  setLog: (log: ILog) => void;
  setDate: (date: Date) => void;
  setLogs: (log: ILog, key: string) => void;
  setDeleteLog: (key: string) => void;
}

export const useLogStore = create<LogState>()((set) => ({
  log: {
    note: "",
    hour: 0,
    date: new Date(),
  },
  logs: {},
  setDate: (date: Date) => set((state) => ({ log: { ...state.log, date } })),
  setLog: (log: ILog) => set((state) => ({ log: { ...state.log, ...log } })),
  setLogs: (log: ILog, key: string) =>
    set((state) => {
      const updateLog = { ...state.logs, [key]: log };
      const sortedKeys = Object.keys(updateLog).sort();

      const sortObject: { [key: string]: ILog } = {};

      sortedKeys.forEach((key) => {
        sortObject[key] = updateLog[key];
      });

      return { logs: sortObject };
    }),

  setDeleteLog: (key: string) =>
    set((state) => {
      const updateLog = { ...state.logs };
      delete updateLog[key];
      return { logs: updateLog };
    }),
}));
