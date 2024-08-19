import { useEffect, useState } from "react";
import styles from "./EtriRIC.module.scss";
import defaultAxios from "../../../apis/defaultAxios";
import { useQuery } from "@tanstack/react-query";
import React from "react"
import { fetchRicInfoData } from "../../../apis/dashboardApi";

// * ETRI RIC 목록을 모여주는 컨테이너

// * API 데이터
interface RicInfoType {
    value: string;
    name: string;
    state: "OFF" | "ON" | "ERROR" | "WARNING";  // 상태는 고정된 문자열이므로 Union 타입으로 정의
    description: string; // value에 대한 설명
}


const EtriRIC : React.FC = ()=>{    


    //* useQuery로 실시간 데이터 패칭
    const {data: ricInfoData} = useQuery<RicInfoType[]>({
        queryKey:['ricInfoData'], // 쿼리 키 
        queryFn: fetchRicInfoData, // 쿼리 실행 함수
        // refetchInterval: 1000, // 1초 단위 실행 
    });


    // todo : soft코딩으로 바꿔줘야할듯?
    return(
        <div className={styles.container}>
        <div className={styles.description}> 
            <div className={styles.des_item}>
                <span className={`${styles.state} ${styles.off}` }> </span>
                <span className={styles.text}>OFF</span>
            </div>
            <div className={styles.des_item}>
                <span className={`${styles.state} ${styles.on}`}></span>
                <span className={styles.text}>ON</span>
            </div>
            <div className={styles.des_item}>
                <span className={`${styles.state} ${ styles.error}`}></span>
                <span className={styles.text}>ERROR</span>
            </div>
            <div className={styles.des_item}>
                <span className={`${styles.state} ${ styles.warning}`}></span>
                <span className={styles.text}>WARNING</span>
            </div>
        </div>

        {ricInfoData?.map((ric, index)=> (
            <section className={styles.item}>
                <div className={styles.item_titles}>
                    <span className={styles.item_name}>
                        {ric.name}
                    </span>
                    <span className={styles.item_description}>
                        {ric.description}
                    </span>    
                </div>
                <div className={styles.item_value}>
                        {ric.value}
                </div>       
                <div  
                    className={styles.item_state}
                    style={{
                        backgroundColor: 
                            ric.state === "OFF" ? "#CCCCCC" : 
                            ric.state === "ON" ? "#9EEDA7" : 
                            ric.state === "WARNING" ? "#FFE990" : 
                            "#ED9E9F"
                    }}
                >
                    {/* 원 */}
                </div>
            </section>
        ))}

    </div>
    )
}

export default EtriRIC;