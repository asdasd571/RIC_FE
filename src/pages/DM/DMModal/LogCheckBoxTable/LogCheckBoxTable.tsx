import { useEffect, useState } from "react";
import styles from "./LogCheckBoxTable.module.scss";
import { _displayModes, _services, useLogCheckBoxStore } from "../../../../store/useLogCheckBoxStore";

import {  LogCheckBoxData, DisplayMode, ColumnCheckData, RowCheckData } from "../../../../types/DM.types";

// ! DM의 setting에서 checkbox 부분을 담당.

// * LogCheckBoxData 인터페이스 정의: 각 서비스(service)와 그에 속한 디스플레이 모드(displayModes)를 정의합니다.


// *Display Mode와 Services를 고정 배열로 선언
// const displayModes = ['ERROR', 'WARNING', 'INFO', 'Function', 'HTTP', 'DEBUG', 'VERBOSE', 'MODE']; // 디스플레이 모드 목록
// const services = ['OSMB', 'ODMB', 'OAPB', 'OOMB', 'ESrAPP','rApp']; //  서비스들의 이름 목록
const displayModes = _displayModes; // 디스플레이 모드 목록
const services = _services; //  서비스들의 이름 목록


// *초기 데이터 설정 
// 각 서비스(service)마다, 디스플레이 모드(displayModes)와 그 모드들의 초기 체크 상태(checked)를 true로 설정
const initialLogCheckBoxTableData: LogCheckBoxData[] = services.map(service => ({
    service : service,   // 각 서비스 이름을 할당
    displayModes: displayModes.map(level => ({ level, checked: false })),  // 각 디스플레이 모드의 레벨과 초기 체크 여부(false) 설정
}));

// * 컬럼 선택데이터 설정
const initiallColumnCheckData: ColumnCheckData[] = services.map(service => ({
    service : service, // 각 서비스 이름 할당 /// OSMB, ODMB ...
    isChecked : false // 각 열에 대한 체크 상태 관리 // false, false ..
}));

// * 행 선택데이터 설정
const initiallRowCheckData : RowCheckData[] = displayModes.map(level => ({
    level : level, // 각 서비스 이름 할당 //'ERROR', WARNING, ,.
    isChecked : false // 각 행에 대한 체크 상태 관리
}));



const LogCheckBoxTable: React.FC = () => {
    // *체크박스 초기화 -> checkedData: 테이블의 현재 상태를 저장하는 배열 (서비스별로 디스플레이 모드들의 체크 상태 포함)
    // const [checkedData, setCheckedData] = useState<LogCheckBoxData[]>(initialLogCheckBoxTableData); //* 체크화박스 초기
    const { checkedData, setCheckedData } = useLogCheckBoxStore();

    const [columnCheckedData, setColumnCheckedData] = useState<ColumnCheckData[]>(initiallColumnCheckData); // * 열 전체 선택 체크박스 초기화
    const [rowCheckedData, setRowCheckedData] = useState<RowCheckData[]>(initiallRowCheckData); // * 열 전체 선택 체크박스 초기화
    const [selectAllChecked, setSelectAllChecked ] = useState<boolean>(false); // 전체 선택 체크박스
    // useEffect 훅: 상태 변경 시, 현재 상태(checkedData)를 콘솔에 출력
    useEffect(() => {
        console.log(checkedData);
    }, [checkedData]);  // checkedData가 변경될 때마다 실행

    // *체크박스 상태 변경 핸들러: 특정 서비스와 디스플레이 모드의 체크 상태를 변경하는 함수
    const handleCheckboxChange = (service: string, level: string) => { // * 서비스명, 레벨
        setCheckedData(prevData =>
            // * prevData에서 현재 서비스와 모드에 해당하는 항목을 찾아 상태를 토글.
            prevData.map(item =>
                item.service === service   // * 현재 변경 중인 서비스인지 확인 (EsrApp === EsRapp)
                    ? {
                            ...item,   // 해당 서비스의 기존 데이터 복사
                            displayModes: item.displayModes.map(mode =>
                                mode.level === level ? { ...mode, checked: !mode.checked } : mode  // 해당 디스플레이 모드의 체크 상태 변경
                            ),
                        }
                    : item  // 변경되지 않은 다른 서비스는 그대로 유지
            )
        );

    };

    //* 가로 행 전체 체크하기
    // level을 받으면, 해당 services를 data에서 1개씩 찾아서 서비스의 level을 check 한다.
    // 행 전체 선택 핸들러
    const handleRowSelect = (level: string) => {
        // * 행 선택을 위한 업데이트 (rowCheckedData의 상태 변경)
        setRowCheckedData(prevData => {
            const updatedData = prevData.map(item =>
                item.level === level
                    ? { ...item, isChecked: !item.isChecked } // 선택된 레벨의 isChecked 상태를 토글
                    : item // 나머지는 그대로 유지
            );
    
            // * 업데이트된 rowCheckedData에서 해당 레벨의 isChecked 값을 찾는다.
            const levelChecked = updatedData.find(item => item.level === level)?.isChecked;
    
            // * checkedData를 업데이트한다.
            setCheckedData(prevCheckedData =>
                prevCheckedData.map(item => ({
                    ...item,
                    displayModes: item.displayModes.map(mode =>
                        mode.level === level // 해당 모드의 레벨과 일치하는지 확인
                            ? { ...mode, checked: levelChecked as boolean } // 일치한다면 levelChecked 값을 적용
                            : mode // 일치하지 않으면 그대로 유지
                    )
                }))
            );
    
            return updatedData; // 업데이트된 rowCheckedData 반환
        });
    };
    // * 전체 table 체크하기
    // * 전체 table 체크하기
    const handleAllSelect = () => {
        const updatedChecked = !selectAllChecked; // 현재 선택 상태의 반전
        setSelectAllChecked(updatedChecked); // 전체 선택 상태를 업데이트

        // * checkedData를 업데이트 (모든 displayModes의 checked 값을 updatedChecked로 설정)
        setCheckedData(prevData =>
            prevData.map(item => ({
                ...item, // 서비스별 데이터 복사
                displayModes: item.displayModes.map(mode => ({
                    ...mode, // 모드별 데이터 복사
                    checked: updatedChecked // 모든 모드의 checked 값을 updatedChecked로 설정
                }))
            }))
        );
        // column all 선택 데이터도 같이 업데이트해준다.
        setColumnCheckedData(prevData => 
            prevData.map(item => ({
                ...item, // 기존 속성을 복사
                isChecked: updatedChecked // isChecked 값을 updatedChecked로 설정
            }))
        );
        // row all 선택 데이터도 같이 넣어준다.
        setRowCheckedData(prevData => 
            prevData.map(item => ({
                ...item, // 기존 속성을 복사
                isChecked: updatedChecked // isChecked 값을 updatedChecked로 설정
            }))
        );
    }

    //* 세로 열  전체 체크하기

    // 열 전체 선택 핸들러
    const handleColumnSelect = (service: string) => { 
        // * columnCheckedData를 업데이트하면서, 해당 서비스의 체크 상태를 가져온다.
        setColumnCheckedData(prevData => {
            const updatedData = prevData.map(item =>
                item.service === service 
                ? { ...item, isChecked: !item.isChecked } 
                : item 
            );

            // * 업데이트된 columnCheckedData에서 해당 서비스의 isChecked 값을 찾는다.
            const serviceChecked = updatedData.find(item => item.service === service)?.isChecked;

            // * checkedData를 업데이트한다.
            setCheckedData(prevCheckedData =>
                prevCheckedData.map(item =>
                    item.service === service 
                    ? {
                        ...item,
                        displayModes: item.displayModes.map(mode => ({
                            ...mode,
                            checked: serviceChecked as boolean // 업데이트된 columnCheckedData의 isChecked 값을 적용
                        }))
                    }
                    : item
                )
            );

            return updatedData; // 최신 데이터를 반환하여 상태 업데이트
        });
    };

    useEffect(()=>{
        console.log('rowAll', rowCheckedData);
        console.log('columnAll', columnCheckedData);
    },[rowCheckedData,columnCheckedData])


    
    
    return (
        <div>
            {/* 테이블 구조 */}
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                checked={selectAllChecked}  // 체크 여부
                                onChange={() => handleAllSelect()}  // 클릭 시 상태 변경
                                />
                        </th>
                        {/* 첫 번째 헤더 셀: "Display Mode" */}
                        <th>Display Mode</th>
                        {/* 각 서비스 이름을 헤더로 표시 */}
                        {services.map(service => (
                            <th key={service}>{service}
                                <input
                                    type="checkbox"
                                    checked={columnCheckedData.find(item => item.service === service)?.isChecked || false}  // 해당 서비스의 isChecked 값을 넣음  // 체크 여부
                                    onChange={() => handleColumnSelect(service)}  // 클릭 시 상태 변경
                            />
                            </th>  // 각 서비스에 대한 열 생성
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {/* 각 디스플레이 모드를 행으로 렌더링 */}
                    {displayModes.map(mode => (
                        <tr key={mode}>
                            
                            {/* 각 행의 첫 번째 셀: 디스플레이 모드 이름 */}
                            <td>
                                <input
                                    type="checkbox"
                                    checked={rowCheckedData.find(item => item.level === mode)?.isChecked || false}  // 체크 여부
                                    onChange={() => handleRowSelect(mode)}  // 클릭 시 상태 변경
                                    />
                            </td>
                            <td>
                                {mode}
                            </td>
                            {/* 각 서비스에 대해 해당 디스플레이 모드의 체크박스 렌더링 */}
                            {services.map(service => {
                                // 현재 서비스와 모드의 체크 여부 확인
                                const isChecked = checkedData
                                    .find(item => item.service === service)  // 해당 서비스 찾기
                                    ?.displayModes.find(m => m.level === mode)?.checked;  // 해당 모드의 체크 상태 찾기

                                return (
                                    <td key={service}>
                                        {/* 체크박스: 상태에 따라 체크 여부와 클릭 이벤트 처리 */}
                                        <input
                                            type="checkbox"
                                            checked={isChecked}  // 체크 여부
                                            onChange={() => handleCheckboxChange(service, mode)}  // 클릭 시 상태 변경
                                        />
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LogCheckBoxTable;




// * // 초기 데이터
// const initialLogCheckBoxTableData:LogCheckBoxData[] = [
//     {
//         service: "OSMB",
//         displayModes: [
//         { level: "ERROR", checked: true },
//         { level: "WARNING", checked: true },
//         { level: "INFO", checked: true },
//         { level: "Function", checked: true },
//         { level: "HTTP", checked: true },
//         { level: "DEBUG", checked: true },
//         { level: "VERBOSE", checked: true },
//         { level: "MODE", checked: true },
//         ]
//     },   
//     {
//         service: "ODMB",
//         displayModes: [
//         { level: "ERROR", checked: true },
//         { level: "WARNING", checked: true },
//         { level: "INFO", checked: true },
//         { level: "Function", checked: true },
//         { level: "HTTP", checked: true },
//         { level: "DEBUG", checked: true },
//         { level: "VERBOSE", checked: true },
//         { level: "MODE", checked: true },
//         ]
//     },  
//     {
//         service: "OAPB",
//         displayModes: [
//         { level: "ERROR", checked: true },
//         { level: "WARNING", checked: true },
//         { level: "INFO", checked: true },
//         { level: "Function", checked: true },
//         { level: "HTTP", checked: true },
//         { level: "DEBUG", checked: true },
//         { level: "VERBOSE", checked: true },
//         { level: "MODE", checked: true },
//         ]
//     },  
//     {
//         service: "OOMB",
//         displayModes: [
//         { level: "ERROR", checked: true },
//         { level: "WARNING", checked: true },
//         { level: "INFO", checked: true },
//         { level: "Function", checked: true },
//         { level: "HTTP", checked: true },
//         { level: "DEBUG", checked: true },
//         { level: "VERBOSE", checked: true },
//         { level: "MODE", checked: true },
//         ]
//     },  
//     {
//         service: "EsrApp",
//         displayModes: [
//         { level: "ERROR", checked: true },
//         { level: "WARNING", checked: true },
//         { level: "INFO", checked: true },
//         { level: "Function", checked: true },
//         { level: "HTTP", checked: true },
//         { level: "DEBUG", checked: true },
//         { level: "VERBOSE", checked: true },
//         { level: "MODE", checked: true },
//         ]
//     }
// ]
