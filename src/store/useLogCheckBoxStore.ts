import { create } from "zustand";
import { LogCheckBoxData } from "../types/DM.types";

interface LogCheckBoxStore {
    checkedData: LogCheckBoxData[];
    setCheckedData: (data: LogCheckBoxData[] | ((prevData: LogCheckBoxData[]) => LogCheckBoxData[])) => void;
    // - data : 직접적인 배열을 받음
    // - 이전 테이터를 기반으로 새로운 데이터를 계산하는 함수 : prevData => 
}

// ! Display Mode와 Services를 고정 배열로 선언 // ! 전역 변수
export const _displayModes = ['ERROR', 'WARNING', 'INFO', 'Func', 'REST', 'DEBUG', 'VERBOSE', 'MODE']; // 디스플레이 모드 목록
export const _services = ['ALL','ESrApp', 'OOMB', 'ODMB', 'OAM', 'PrApp', 'TCrApp', 'VrApp', 'VIAVI']; //  서비스들의 이름 목록
// TODO : ALL은 전체 목록을 보여주는 것이다. 빼려면 해당 _services배열에서 지워주면 된다. 


// *초기 데이터 설정 
// 각 서비스(service)마다, 디스플레이 모드(displayModes)와 그 모드들의 초기 체크 상태(checked)를 true로 설정
const initialLogCheckBoxTableData: LogCheckBoxData[] = _services.map(_services => ({
    service : _services,   // 각 서비스 이름을 할당
    displayModes: _displayModes.map(level => ({ level, checked: true })),  // 각 디스플레이 모드의 레벨과 초기 체크 여부(false) 설정
}));


// Zustand 스토어 생성
export const useLogCheckBoxStore = create<LogCheckBoxStore>((set, get) => ({
    checkedData: initialLogCheckBoxTableData,
    setCheckedData: (data) => {
        set({
            // typeof data === 'function'를 통해 data가 함수인지 확인, 함수일 경우 get().checkedData를 인수로 사용해 현재 상태를 가져온다.
            checkedData: typeof data === 'function' ? data(get().checkedData) : data,
            // data가 함수이면 그 함수 결과로 쓰고 ,아니면 주어진 배열로 설정된다.
            //get : 현재 상태를 받아온다.
        });
    },
}));


// * 사용법
// const { checkedData, setCheckedData } = useLogCheckBoxStore();