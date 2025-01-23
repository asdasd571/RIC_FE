import { create } from "zustand";

//! 대시보드의 하단 3개 그래프 데이터입니다. (TimeThroughput)

interface ChartData {
  Timestamp: string;
  [key: string]: number | string;
}

interface DataStore {
  DLRateQueue: ChartData[];
  ULRateQueue: ChartData[];
  NumUEQueue: ChartData[];

  updateDLRateQueue: (newData: ChartData) => void;
  updateULRateQueue: (newData: ChartData) => void;
  updateNumUEQueue: (newData: ChartData) => void;
}

// Zustand Store 생성
export const useTimeDLThroughputQueueStore = create<DataStore>((set, get) => ({
  DLRateQueue: [],
  ULRateQueue: [],
  NumUEQueue: [],

  // DLRateQueue만 새로운 데이터 추가
  updateDLRateQueue: (newData) => {
    // 중복된 데이터 필터링
    const isDuplicate = get().DLRateQueue.some(
      (item) => item.Timestamp === newData.Timestamp
    );

    if (!isDuplicate) {
      set((prev) => ({
        DLRateQueue: [...prev.DLRateQueue, newData].slice(-20),
      }));
    }
  },

  updateULRateQueue: (newData) => {
    // 중복된 데이터 필터링
    const isDuplicate = get().ULRateQueue.some(
      (item) => item.Timestamp === newData.Timestamp
    );

    if (!isDuplicate) {
      set((prev) => ({
        ULRateQueue: [...prev.ULRateQueue, newData].slice(-20),
      }));
    }
  },

  updateNumUEQueue: (newData) => {
    // 중복된 데이터 필터링
    const isDuplicate = get().NumUEQueue.some(
      (item) => item.Timestamp === newData.Timestamp
    );

    if (!isDuplicate) {
      set((prev) => ({
        NumUEQueue: [...prev.NumUEQueue, newData].slice(-20), // tODO slice(-20)이 기본이다.
      }));
    }
  },
}));
