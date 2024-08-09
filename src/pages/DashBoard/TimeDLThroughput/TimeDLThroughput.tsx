

import React, { useEffect, useState } from "react"
import defaultAxios from "../../../apis/defaultAxios";
import Charts from "../../../components/Charts/Charts";
import { testMultiData } from "../../../components/Charts/testData";


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

/** 실시간 TimeStamp가 있는 멀티 라인 그래프 출력. (각각 DL,UL Throughput을 출력.)
 * @param type : 'DL_rate' | 'UL_rate' | 'Num_UE' - 라인 타입을 하나 고를 수 있다
 * ,
 *  */ 
const TimeDLThroughput:React.FC<TimeDLThroughputProps> = ({type}) => {
    // * 상태 ======================== //
    const [cellData, setCellData] = useState<RawData[]>([]); // cellMetrics 데이터
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

            // 성공 핸들링
            setCellData(response.data); // 성공 데이터 저장

            const data : RawData[] = response.data;

            const result: ChartData = { Timestamp: ""};
            

            // 모든 데이터를 하나로 합친다.
            data.forEach((item) => {
                result[`DL_rate_Cell_ID_${item.Cell_ID}`] = item.DL_rate;
                result[`UL_rate_Cell_ID_${item.Cell_ID}`] = item.UL_rate;
                result[`Num_UE_Cell_ID_${item.Cell_ID}`] = item.Num_UE;
                result.Timestamp = item.Timestamp;          
            });

            updateQueue(result, setCellQueue);
            setKeys(Object.keys(result)); // 키 저장

        } catch (error) {
            console.log(error);
        }
    }

    //*첫 렌더링 시 실행
    useEffect(()=>{
        
        for (let i:number =0; i <=10; i++){
            getCellData(); // 셀 데이터를 받아온다.
            // console.log(cellData);
            
            console.log(cellQueue);
        }

    },[]);


    return(
        <Charts data={cellQueue} 
        dataKey={keys.filter((key) => key.startsWith(type))} // type으로 넣어줘서 데이터를 뽑는다.
        name="Timestamp"
        chartType="mLine"
        title="" />
        
    )
}


export default TimeDLThroughput;
