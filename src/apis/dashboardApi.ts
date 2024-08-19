// api/cellSumApi.ts
import defaultAxios from "./defaultAxios";
import { CellSum } from "../types/apis.types"; // CellSum 타입 정의

//! cell Data들 
//*cell sum 데이터를 받는 api.
export const fetchCellSumData = async (): Promise<CellSum> => {
    try {
        const url = `/cell-sum`;
        const response = await defaultAxios.get(url);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch cell sum data", error);
        throw error;
    }
};


//* cellMetrics 데이터 받기 //cell-metrics (셀별 DL_Rate)
export const fetchCellData = async () => { // todo : Charts 실시간 API 연결. 
    try {
        const url: string = `/cell-metrics`;
        const response = await defaultAxios.get(url);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


//! TimeDLThroughput.tsx
//* cellMetrics 데이터 받기 // `/ul-rate` (셀별 DL_Rate)
export const fetchULData = async () => { 
    try {
        const url: string = `/ul-rate`;
        const response = await defaultAxios.get(url);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

//* cellMetrics 데이터 받기 //dl-rate (셀별 DL_Rate)
export const fetchUEData = async () => { 
    try {
        const url: string = `/num-ue`;
        const response = await defaultAxios.get(url);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

//* cellMetrics 데이터 받기 //dl-rate (셀별 DL_Rate)
export const fetchDLData = async () => { 
    try {
        const url: string = `/dl-rate`;
        const response = await defaultAxios.get(url);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


//! EtriRIC.tsx
//* ricinfo 데이터 받기
export const fetchRicInfoData = async () => {
    try {
        const url: string = `/ric-info`;
        const response=  await defaultAxios.get(url);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


