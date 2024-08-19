// * 입력받는 데이터 형식 [/cell-sum] 
export interface CellSum {
    DL_rate : number;
    Num_Cell : number;
    Num_Ue : number;
    Timestamp: string;
    UL_rate : number;
}

//* 입력받는 cell-metrics 데이터 형식
export interface CellData {
    Cell_ID: number;
    DL_rate: number;
    Num_UE: number;
    Timestamp: string;
    UL_rate: number;
  }
