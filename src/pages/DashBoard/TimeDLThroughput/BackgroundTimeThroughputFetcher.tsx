import { useEffect } from 'react';
import { fetchDLData, fetchUEData, fetchULData } from '../../../apis/dashboardApi';
import { useTimeDLThroughputQueueStore } from '../../../store/useTimeDLThroughputQueueStore';
import { useQuery } from '@tanstack/react-query';

// ! 대시보내 내의 아래 3개 그래프는 백그라운드에서 항상 실행되도록 합니다. 
const BackgroundTimeThroughputFetcher = () => {
  const { updateDLRateQueue, updateULRateQueue, updateNumUEQueue } = useTimeDLThroughputQueueStore();
  
  
  const { data: UEData } = useQuery({
    queryKey: ["UEData"],
    queryFn: fetchUEData,
    // refetchInterval: 1000, //1초마다 refetch
    refetchIntervalInBackground: true, // 백그라운드에서 refetch 계속 실행
  });
  

  // userQuery로 데이터 패칭 및 주기적 업데이트
  const { data: DLData } = useQuery({
    queryKey: ["DLData"],
    queryFn: fetchDLData,
    // refetchInterval: 1000, //1초마다 refetch
    refetchIntervalInBackground: true, // 백그라운드에서 refetch 계속 실행
  });

  // userQuery로 데이터 패칭 및 주기적 업데이트
  const { data: ULData } = useQuery({
    queryKey: ["ULData"],
    queryFn: fetchULData,
    // refetchInterval: 1000, //1초마다 refetch
    refetchIntervalInBackground: true, // 백그라운드에서 refetch 계속 실행
  });

  useEffect(() => {
    if (DLData) {
      updateDLRateQueue(DLData);
    }
  }, [DLData]);


  useEffect(() => {
    if (ULData) {
      updateULRateQueue(ULData);
    }
  }, [ULData]);

  useEffect(() => {
    if (UEData) {
      updateNumUEQueue(UEData);
    }
  }, [UEData]);

  return null;


}

export default BackgroundTimeThroughputFetcher;
