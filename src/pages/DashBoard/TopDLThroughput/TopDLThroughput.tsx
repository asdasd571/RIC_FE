
import Charts from "../../../components/Charts/Charts";
import MultiLineChart from "../../../components/Charts/MultiLineChart";
import SimpleAreaChart from "../../../components/Charts/SimpleAreaChart";
import SimpleBarChart from "../../../components/Charts/SimpleBarChart";
import SimpleLineChart from "../../../components/Charts/SimpleLineChart";
import styles from "./TopDLThroughput.module.scss";
import testData from "../../../components/Charts/testData";
// 위의 DL Throughput을 출력한다.
import React from "react"

import GaugeChart from 'react-gauge-chart';
import { useEffect, useState } from "react";
import defaultAxios from "../../../apis/defaultAxios";
import { useQuery } from "@tanstack/react-query";
import { fetchCellData, fetchCellSumData } from "../../../apis/dashboardApi";
import { CellSum } from "../../../types/apis.types";
import DLSumPieChart from "./DLSum";
import { chartColors } from "../../../utils/chartColors";

const TopDLThroughput : React.FC = () => {

    // useQuery로 실시간 데이터 패칭
    const {data: cellData  } = useQuery({ //useQuery가 반환하는 객체 중 data를 cellData라는 이름으로 할당 (서버에서 데이터를 받아와 컴포넌트에서 사용 가능)
        queryKey: ['cellData'], //queryKey는 쿼리의 고유한 키를 지정, 쿼리 결과를 캐싱하고 관리함
        queryFn: fetchCellData, //queryFn은 데이터를 가져오는 비동기 함수, useQuery가 데이터를 요청할 때 호출
        // refetchInterval : 1000, //1초마다 refetch (refetchInterval은 쿼리가 주기적으로 다시 실행되는 시간을 밀리초 단위로 설정)
    });

    return(
        <div className={styles.container}>
            <section className={styles.item}>
                <DLSumPieChart/>
            </section>
            <section className={styles.item}>
                {/* <SimpleBarChart/> */}
                <Charts 
                    chartType="cell"
                    data={cellData}
                    colors={chartColors}
                    dataKey="DL_rate"
                    title="DL_rate"
                    name="Cell_ID"
                />
                
                {/* <SimpleBarChart/> */}
            </section>
        </div>
    )
}

export default TopDLThroughput;