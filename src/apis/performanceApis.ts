// api/cellSumApi.ts
import axios from "axios";
import {
  FileNames,
  KpiData,
  KpiItems,
  TimeSeriesKpiData,
} from "../types/apis.types";
import defaultAxios from "./defaultAxios";

//! Performance 데이터 들

// *files (파일 목록 받는 API)
export const fetchFileNamesData = async (): Promise<FileNames> => {
  try {
    const url = `http://localhost:8080/pe/files`;
    const response = await defaultAxios.get(url);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch /pe/files", error);
    throw error;
  }
};

//* KPI 선택 목록 받는 API, /items (type 인자로 'kpi' 혹은 'kpits'를 받는다.)
export const fetchKpiItemsData = async (type:string = 'kpi'): Promise<KpiItems> => {
  try {
    const url = `http://localhost:8080/pe/items?type=${type}`;
    const response = await defaultAxios.get(url);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch /pe/items", error);
    throw error;
  }
};

//* time Series KPI 선택 목록 받는 API, /items_ts
// export const fetchTimeSieresKpiItemsData = async (): Promise<KpiItems> => {
//   try {
//     // const url = `http://localhost:3001/items_ts`;
//     const url = `/items_ts`;
//     const response = await defaultAxios.get(url);
//     // const response = await axios.get(url);
//     return response.data;
//   } catch (error) {
//     console.error("Failed to fetch /items", error);
//     throw error;
//   }
// };

//* KPI 데이터를 받는 API, /kpi
export const fetchKpiData = async (): Promise<KpiData[]> => {
  try {
    const url = `http://localhost:8080/pe/kpi`;
    const response = await defaultAxios.get(url);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch /pe/kpi", error);
    throw error;
  }
};

//* Time Series KPI 데이터를 받는 API, /kpi
export const fetchTimeSeriesKpiData = async (): Promise<
  TimeSeriesKpiData[]
> => {
  try {
    const url = `http://localhost:8080/pe/kpits`;
    const response = await defaultAxios.get(url);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch /pe/kpits", error);
    throw error;
  }
};
