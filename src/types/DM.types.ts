
//* DM의 데이터 타입
export interface DMType
{
    "block": string, // ESrApp
    "description": string, // RAPP URL = http://0.0.0.0:20240 ...
    "level": string, // INFO, ERROR
    "time": number, //11
    "vendor": string //ETRI
}

//* DM의 데이터 타입
export interface LogType{
        "block": string, // ESrApp
        "description": string, // RAPP URL = http://0.0.0.0:20240 ...
        "level": string, // INFO, ERROR
        "time": number, //11
        "vendor": string //ETRI
}


// * DM 체크박스 타입들 ---- // 

// * LogCheckBoxData 인터페이스 정의: 각 서비스(service)와 그에 속한 디스플레이 모드(displayModes)를 정의합니다.
export interface LogCheckBoxData {
    service: string;   // 서비스 이름 (예: OSMB, ODMB 등)
    displayModes: DisplayMode[];   // 해당 서비스의 디스플레이 모드 배열 (각 모드마다 체크 여부 포함)
}

// *DisplayMode 인터페이스 정의: 각 디스플레이 모드의 레벨과 체크 여부를 나타냅니다.
export interface DisplayMode {
    level: string;   // 디스플레이 모드의 레벨 (예: ERROR, WARNING 등)
    checked: boolean; // 체크박스가 선택되었는지 여부
}


// * 컬럼 선택자
export interface ColumnCheckData {
    service : string;
    isChecked : boolean;
}

export // * 행 선택자
interface RowCheckData {
    level : string;
    isChecked : boolean;
}


// ** ----------------------- //