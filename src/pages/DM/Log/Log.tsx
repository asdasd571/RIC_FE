

import styles from "./Log.module.scss";
import React, { useRef,forwardRef } from 'react';
// *!로그를 띄워주는 컴포넌트

import { useQuery } from "@tanstack/react-query";
import { tsDmAxios } from "../../../apis/defaultAxios";
import { useEffect, useState } from "react";
import { DMType, LogType } from "../../../types/DM.types";
import { useLogCheckBoxStore } from "../../../store/useLogCheckBoxStore";


interface LogProps{
    block : string; // 출력할 title
    data : LogType[]; // DM 로그 데이터 타입 
}

// **DM테이블 임시 데이터 
const DMDummyData:DMType[] = 
[
    {
        "block": "ESrApp",
        "description": "ETRI ESrApp INFO SCHEDULE_PERIOD =  2",
        "level": "INFO",
        "time": 5,
        "vendor": "ETRI"
    },
    {
        "block": "ESrApp",
        "description": "ETRI ESrApp INFO ES Algorithm    : rApp_algorithm_ES ()",
        "level": "WARNING",
        "time": 6,
        "vendor": "ETRI"
    },
    {
        "block": "rApp",
        "description": "ETRI ESrApp INFO ES Algorithm    : rApp_algorithm_ES ()",
        "level": "ERROR",
        "time": 6,
        "vendor": "ETRI"
    },
    {
        "block": "rApp",
        "description": "ithmAlgorithmAlgorithmAlgorithmsdorithmAlgorithmsdorithmAlgorithmsdorithmAlgorithmsdorithmsdsaAlgoithmsdsaAlgithmsdsaAlgrithm",
        "level": "INFO",
        "time": 6,
        "vendor": "ETRI"
    }

]


/** //! Log를 출력하는 컴포넌트.
 * Log를 출력하는 컴포넌트. 
 * @param block : string; - 출력할 title
 * @param data : DMType[]; DM 로그 데이터 타입 
 * @returns 로그 타이틀+ 로그목록 컴포넌트
 */
const Log = 
React.forwardRef<HTMLTableElement,LogProps>(({ data = DMDummyData , block = "title"}, logRef) => {
    // * 전역 store
    const { checkedData, setCheckedData } = useLogCheckBoxStore(); // checkbox 데이터 

    return(
        <section  className={styles.log_container}>
            <div className={styles.log_header}>
                {/* title (block 에 맞게 출력) */}
                <h2 className={styles.log_header_title}>{block}</h2> 
                <input className={styles.log_header_input}type="checkbox"/>
            </div>
            <div className={styles.log_contents_container}>
                <table  ref={block === "ALL" ? logRef : null}>
                    <colgroup>
                    {/* 열 너비 그룹 설정하기 */}
                        <col />
                        <col />
                        <col />
                        <col />
                        <col /> {/* 5번째 열 너비를 60%로 설정 */}
                    </colgroup>
                    <thead>
                        <tr>
                            <th>time</th>
                            <th>vendor</th>
                            <th>block</th>
                            <th>level</th>
                            <th>description</th>
                        </tr>
                    </thead>
                    {/* 
                        // * block이 ALL인 경우에만, ref를 넣어서 저장한다.
                    */}
                    <tbody>
                        {/* Data => data로 바꿔줘야함 (테스트용 DMDummyData) */}
                    {data.map((item) => {
                            return (
                                <tr key={item.time} className={`
                                    ${item.level === "WARNING" ? styles.warning 
                                    : item.level === "ERROR" ? styles.error 
                                    : ''}
                                    ${  
                                        block === "ALL" ? ''  // *ALL 이면 모두 띄운다 // todo : 추후 저장 기능 할때 마저 개발 .
                                        : item.block !== block ? styles.hidden : ''
                                    } 
                                    ${
                                         // *1. 맞는 데이터 찾고  2. 거기서 block 찾아서, checked 찾는다, check === flase이면 숨긴다.
                                        checkedData?.find(checkedDataItem => checkedDataItem.service === item.block )?.
                                        displayModes?.find( displayMode => displayMode.level === item.level)?.
                                        checked === false ? styles.hidden : ''

                                    }
                                
                                `}>
                                    <td>{item.time}</td>
                                    <td>{item.vendor}</td>
                                    <td>{item.block}</td>
                                    <td>{item.level}</td>
                                    <td>{item.description}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
    </section>
    )
});

export default Log;