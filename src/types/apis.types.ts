// * 입력받는 데이터 형식 [/cell-sum]
export interface CellSum {
  DL_rate: number;
  Num_Cell: number;
  Num_Ue: number;
  Timestamp: string;
  UL_rate: number;
}

//* 입력받는 cell-metrics 데이터 형식
export interface CellData {
  Cell_ID: number;
  DL_rate: number;
  Num_UE: number;
  Timestamp: string;
  UL_rate: number;
}

//* performance
export interface FileNames {
  filename: string[];
}

//* kpi item 목록 , /items
export interface KpiItems {
  items: string[];
}

//* kpi 데이터, /kpi
// kpi 데이터입니다.
export interface KpiData {
  compare: number;
  desc: string;
  item: string;
  unit: string;
  value1: number;
  value2: number;
}

// TODO 변경된 /kpits 데이터 형식으로 지정해야함.
// * /kpits 데이터
export interface TimeSeriesKpiData {
  desc: string;
  item: string;
  unit: string;
  value1?: number[];
  value2?: number[];
  valueData?: {
    name: string;
    value1: number;
    value2: number;
  }[]
}

