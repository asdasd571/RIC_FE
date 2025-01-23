//* 알림 데이터 형식
export interface AlarmData {
    name: string;
    level?: string;
    desc: string;
}

// *알림 있는지에 대한 props 정의
export interface AlarmProps{
    hasAlarm: boolean;
    data?:  AlarmData[];
}
