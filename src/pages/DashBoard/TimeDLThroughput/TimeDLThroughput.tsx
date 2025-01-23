import React, { useEffect, useState } from "react";
import defaultAxios from "../../../apis/defaultAxios";
import Charts from "../../../components/Charts/Charts";
import MCharts from "../../../components/Charts/MCharts";
import { testMultiData } from "../../../components/Charts/testData";
import { useQuery } from "@tanstack/react-query";
import {
  fetchCellData,
  fetchDLData,
  fetchUEData,
  fetchULData,
} from "../../../apis/dashboardApi";
import { chartColors } from "../../../utils/chartColors";
import { useTimeDLThroughputQueueStore } from "../../../store/useTimeDLThroughputQueueStore";

interface ChartData {
  Timestamp: string;
  [key: string]: number | string;
}

// 이것중에 하나 결정
interface TimeDLThroughputProps {
  type: "DL_rate" | "UL_rate" | "Num_UE";
}

//todo : 이걸 마저 수정해야함. 과연 이게 맞는건가 ? type우로 pros를 주는 것이
/** 실시간 TimeStamp가 있는 멀티 라인 그래프 출력. (각각 DL,UL Throughput을 출력.)
 * @param type : 'DL_rate' | 'UL_rate' | 'Num_UE' - 라인 타입을 하나 고를 수 있다
 * ,
 *  */
const TimeDLThroughput: React.FC<TimeDLThroughputProps> = ({ type }) => {
  // * 전역 상태 =================== //
  const DLRateQueue = useTimeDLThroughputQueueStore((state) => state.DLRateQueue);
  const ULRateQueue = useTimeDLThroughputQueueStore((state) => state.ULRateQueue);
  const NumUEQueue = useTimeDLThroughputQueueStore((state) => state.NumUEQueue);
  // const updateDLRateQueue = useTimeDLThroughputQueueStore((state) => state.updateDLRateQueue);
  // const updateULRateQueue = useTimeDLThroughputQueueStore((state) => state.updateULRateQueue);
  // const updateNumUEQueue = useTimeDLThroughputQueueStore((state) => state.updateNumUEQueue);
 
  // const {DLRateQueue,ULRateQueue,NumUEQueue, updateQueue } = useTimeDLThroughputQueueStore();
  // * ============================= //
  // * 상태 ======================== //

  // const [DLRateQueue, setDLRateQueue] = useState<ChartData[]>([]); //dl rate 큐
  // const [ULRateQueue, setULRateQueue] = useState<ChartData[]>([]); //ue rate 멀티라인 큐
  // const [NumUEQueue, setNumUEQueue] = useState<ChartData[]>([]); // num ue 멀티라인 큐

  const [DLRateKey, setDLRateKey] = useState<string[]>(); //dl rate 큐 키
  const [ULRateKey, setULRateKey] = useState<string[]>(); //ue rate 멀티라인 큐 키
  const [NumUEKey, setNumUEKey] = useState<string[]>(); // num ue 멀티라인 큐 키

  // * ============================= //

  // * 데이터 큐를 업데이트하는 함수
  // const updateQueue = (
  //   newData: any,
  //   setQueue: React.Dispatch<React.SetStateAction<any[]>>
  // ) => {
  //   setQueue((prevQueue) => {
  //     let newQueue = [...prevQueue, newData]; // 새로운 데이터를 큐에 추가
  //     if (newQueue.length > 20) {
  //       // 20개까지 x축에 그린다.
  //       newQueue.shift(); // 가장 오래된 데이터 제거
  //     }
  //     return newQueue; // 업데이트된 큐 반환
  //   });
  // };

  // userQuery로 데이터 패칭 및 주기적 업데이트
  const { data: UEData } = useQuery({
    queryKey: ["UEData"],
    queryFn: fetchUEData,
    
    // refetchInterval: 1000 //1초마다 refetch
    
    // isStale : 신선한지 여부 , true : 상함, false : 신선
  });

  // userQuery로 데이터 패칭 및 주기적 업데이트
  const { data: DLData } = useQuery({
    queryKey: ["DLData"],
    queryFn: fetchDLData,
    staleTime: 5000, // 데이터가 상하는데까지 걸리는 시간
    refetchIntervalInBackground: true, // 브라우저에 focus 되어있지 않아도 refetch가 되게해준다
    // refetchInterval: 1000 //1초마다 refetch
  });

  // userQuery로 데이터 패칭 및 주기적 업데이트
  const { data: ULData } = useQuery({
    queryKey: ["ULData"],
    queryFn: fetchULData,
    // refetchInterval: 1000 //1초마다 refetch
  });

  

  useEffect(() => {
    if (DLData) {
      setDLRateKey(Object.keys(DLData).filter((key) => key !== "Timestamp")); // 키 저장
      // updateQueue(DLData, setDLRateQueue);
      // updateDLRateQueue(DLData);
    }
  }, [DLData]);


  useEffect(() => {
    if (ULData) {
      setULRateKey(Object.keys(ULData).filter((key) => key !== "Timestamp")); // 키 저장
      // updateQueue(ULData, setULRateQueue);
      // updateULRateQueue(ULData);
    }
  }, [ULData]);

  useEffect(() => {
    if (UEData) {
      setNumUEKey(Object.keys(UEData).filter((key) => key !== "Timestamp")); // 키 저장
      // updateQueue(UEData, setNumUEQueue);
      // updateNumUEQueue(UEData);
    }
  }, [UEData]);




  return type === "DL_rate" && DLData && DLRateKey ? ( //dl 이면,
    <MCharts
      data={DLRateQueue}
      dataKey={DLRateKey} // type으로 넣어줘서 데이터를 뽑는다.
      name="Timestamp"
      chartType="mLine"
      title=""
      color={chartColors}
      yLabel="Mbps"
    />
  ) : type === "UL_rate" && ULData && ULRateKey ? ( // ul이면,
    <MCharts
      data={ULRateQueue}
      dataKey={ULRateKey} // type으로 넣어줘서 데이터를 뽑는다.
      name="Timestamp"
      chartType="mLine"
      title=""
      color={chartColors}
      yLabel="kW"
    />
  ) : type === "Num_UE" && UEData && NumUEKey ? ( //num-ue이면,
    <MCharts
      data={NumUEQueue}
      dataKey={NumUEKey} // type으로 넣어줘서 데이터를 뽑는다.
      name="Timestamp"
      chartType="mLine"
      title=""
      color={chartColors}
      yLabel="UEs"
    />
  ) : null;
};

export default TimeDLThroughput;
