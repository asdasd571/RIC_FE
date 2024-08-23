

import React, { useEffect, useState } from "react"
import defaultAxios from "../../../apis/defaultAxios";
import Charts from "../../../components/Charts/Charts";
import MCharts from "../../../components/Charts/MCharts";
import { testMultiData } from "../../../components/Charts/testData";
import { useQuery } from "@tanstack/react-query";
import { fetchCellData, fetchDLData, fetchUEData, fetchULData } from "../../../apis/dashboardApi";
import { chartColors } from "../../../utils/chartColors";



interface ChartData {
    Timestamp: string;
    [key: string]: number | string  ;
}


// 이것중에 하나 결정 
interface TimeDLThroughputProps {
    type : 'DL_rate' | 'UL_rate' | 'Num_UE';
}


// * 유틸리티 함수: 랜덤 컬러 생성
const generateRandomColor = (): string => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

//todo : 이걸 마저 수정해야함. 과연 이게 맞는건가 ? type우로 pros를 주는 것이 
/** 실시간 TimeStamp가 있는 멀티 라인 그래프 출력. (각각 DL,UL Throughput을 출력.)
 * @param type : 'DL_rate' | 'UL_rate' | 'Num_UE' - 라인 타입을 하나 고를 수 있다
 * ,
 *  */ 
const TimeDLThroughput:React.FC<TimeDLThroughputProps> = ({type}) => {
    // * 상태 ======================== //
    const [cellQueue, setCellQueue] = useState<ChartData[]>([]);

    const [DLRateQueue, setDLRateQueue] = useState<ChartData[]>([]); //dl rate 큐
    const [ULRateQueue, setULRateQueue] = useState<ChartData[]>([]); //ue rate 멀티라인 큐
    const [NumUEQueue, setNumUEQueue] = useState<ChartData[]>([]); // num ue 멀티라인 큐

    const [DLRateKey, setDLRateKey] = useState<string[]>(); //dl rate 큐 키
    const [ULRateKey, setULRateKey] = useState<string[]>(); //ue rate 멀티라인 큐 키
    const [NumUEKey, setNumUEKey] = useState<string[]>(); // num ue 멀티라인 큐 키

    // * ============================= //


    // * 데이터 큐를 업데이트하는 함수
    const updateQueue = (newData: any, setQueue: React.Dispatch<React.SetStateAction<any[]>>) => {
        setQueue(prevQueue => {
            let newQueue = [...prevQueue, newData]; // 새로운 데이터를 큐에 추가
            if (newQueue.length > 10) { // 10개까지 x축에 그린다.
                newQueue.shift(); // 가장 오래된 데이터 제거
            }
            return newQueue; // 업데이트된 큐 반환
        }); 
    };

    // userQuery로 데이터 패칭 및 주기적 업데이트
    const {data: UEData} = useQuery({
        queryKey: ['UEData'],
        queryFn: fetchUEData,
        // refetchInterval: 1000 //1초마다 refetch

    });

    // userQuery로 데이터 패칭 및 주기적 업데이트
    const {data: DLData} = useQuery({
        queryKey: ['DLData'],
        queryFn: fetchDLData,
        // refetchInterval: 1000 //1초마다 refetch

    });

    // userQuery로 데이터 패칭 및 주기적 업데이트
    const {data: ULData} = useQuery({
        queryKey: ['ULData'],
        queryFn: fetchULData,
        // refetchInterval: 1000 //1초마다 refetch
    });

    useEffect(()=>{
        if (DLData){
            setDLRateKey(Object.keys(DLData).filter((key)=> key !== "Timestamp")); // 키 저장
            updateQueue(DLData, setDLRateQueue);
        }
    },[DLData]);

    useEffect(()=>{
        if (UEData){
            setNumUEKey(Object.keys(UEData).filter((key)=> key !== "Timestamp")); // 키 저장
            updateQueue(UEData, setNumUEQueue);
            // console.log('key',NumUEKey)
            // console.log(NumUEQueue)
        }
    },[UEData]);

    useEffect(()=>{
        if (ULData){
            setULRateKey(Object.keys(ULData).filter((key)=> key !== "Timestamp")); // 키 저장
            updateQueue(ULData, setULRateQueue);
        }   
    },[ULData]);

    return(
        (type === "DL_rate" && DLData && DLRateKey) ? //dl 이면, 
            <MCharts data={DLRateQueue} 
                dataKey={DLRateKey} // type으로 넣어줘서 데이터를 뽑는다.
                name="Timestamp"
                chartType="mLine"
                title=""
                color={chartColors}
            />
        : (type === "UL_rate" && ULData && ULRateKey) ? // ul이면,
            <MCharts data={ULRateQueue} 
                dataKey={ULRateKey} // type으로 넣어줘서 데이터를 뽑는다.
                name="Timestamp"
                chartType="mLine"
                title=""
                color={chartColors}/>
        :  (type === "Num_UE" && UEData && NumUEKey) ? //num-ue이면,
            <MCharts data={NumUEQueue} 
            dataKey={NumUEKey} // type으로 넣어줘서 데이터를 뽑는다.
            name="Timestamp"
            chartType="mLine"
            title=""
            color={chartColors}/>
        : null
    )
}

export default TimeDLThroughput;


    // // * cellData가 바뀔때마마다 실행 (큐 업데이트.) (기존의 멀티라인)
    // useEffect(()=>{

    //     if (cellData){
    //         const result: ChartData = { Timestamp: ""};
    //         // 모든 데이터를 하나로 합친다.
    //         cellData?.forEach((item:RawData) => {
    //             result[`DL_rate_Cell_ID_${item.Cell_ID}`] = item.DL_rate;
    //             result[`UL_rate_Cell_ID_${item.Cell_ID}`] = item.UL_rate;
    //             result[`Num_UE_Cell_ID_${item.Cell_ID}`] = item.Num_UE;
    //             result.Timestamp = item.Timestamp;          
    //         });

    //         updateQueue(result, setCellQueue);
    //         console.log(cellQueue);
    //         setKeys(Object.keys(result)); // 키 저장
    //     }
    // }, [cellData]);
