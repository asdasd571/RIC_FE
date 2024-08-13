

import React, { useEffect, useState } from "react"
import defaultAxios from "../../../apis/defaultAxios";
import Charts from "../../../components/Charts/Charts";
import { testMultiData } from "../../../components/Charts/testData";
import { useQuery } from "@tanstack/react-query";


interface RawData{
    Cell_ID: number;
    DL_rate: number;
    UL_rate: number;
    Num_UE: number;
    Timestamp: string;
}

interface ChartData {
    Timestamp: string;
    [key: string]: number | string  ;
}


// 이것중에 하나 결정 
interface TimeDLThroughputProps {
    type : 'DL_rate' | 'UL_rate' | 'Num_UE';
}




//todo : 이걸 마저 수정해야함. 과연 이게 맞는건가 ? type우로 pros를 주는 것이 
/** 실시간 TimeStamp가 있는 멀티 라인 그래프 출력. (각각 DL,UL Throughput을 출력.)
 * @param type : 'DL_rate' | 'UL_rate' | 'Num_UE' - 라인 타입을 하나 고를 수 있다
 * ,
 *  */ 
const TimeDLThroughput:React.FC<TimeDLThroughputProps> = ({type}) => {
    // * 상태 ======================== //
    const [cellQueue, setCellQueue] = useState<ChartData[]>([]);
    const [keys, setKeys] = useState<string[]>([]); // 키 모음
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

    //* cellMetrics 데이터 받기 //cell-metrics (셀별 DL_Rate)
    const getCellData = async () => { // todo : Charts 실시간 API 연결. 
        try {
            const url: string = `/cell-metrics`;
            const response = await defaultAxios.get(url);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }



    // userQuery로 데이터 패칭 및 주기적 업데이트
    const {data: cellData} = useQuery({
        queryKey: ['cellData'],
        queryFn: getCellData,
        // refetchInterval: 1000 //1초마다 refetch

    });

    // * cellData가 바뀔때마마다 실행 (큐 업데이트.)
    useEffect(()=>{

        if (cellData){
            const result: ChartData = { Timestamp: ""};
            // 모든 데이터를 하나로 합친다.
            cellData?.forEach((item:RawData) => {
                result[`DL_rate_Cell_ID_${item.Cell_ID}`] = item.DL_rate;
                result[`UL_rate_Cell_ID_${item.Cell_ID}`] = item.UL_rate;
                result[`Num_UE_Cell_ID_${item.Cell_ID}`] = item.Num_UE;
                result.Timestamp = item.Timestamp;          
            });

            updateQueue(result, setCellQueue);
            setKeys(Object.keys(result)); // 키 저장
        }
    }, [cellData]);


    return(
        <Charts data={cellQueue} 
        dataKey={keys.filter((key) => key.startsWith(type))} // type으로 넣어줘서 데이터를 뽑는다.
        name="Timestamp"
        chartType="mLine"
        title="" />
        
    )
}


export default TimeDLThroughput;
