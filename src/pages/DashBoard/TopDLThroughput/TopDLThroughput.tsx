
import Charts from "../../../components/Charts/Charts";
import MultiLineChart from "../../../components/Charts/MultiLineChart";
import SimpleAreaChart from "../../../components/Charts/SimpleAreaChart";
import SimpleBarChart from "../../../components/Charts/SimpleBarChart";
import SimpleLineChart from "../../../components/Charts/SimpleLineChart";
import styles from "./TopDLThroughput.module.scss";
import testData from "../../../components/Charts/testData";
// 위의 DL Throughput을 출력한다.

import GaugeChart from 'react-gauge-chart';
import { useEffect, useState } from "react";
import defaultAxios from "../../../apis/defaultAxios";





const TopDLThroughput : React.FC = () => {

    // * 상태 ======================== //
    const [cellData, setCellData] = useState([]);
    // * ============================= //


    //* cellMetrics 데이터 받기 //cell-metrics
    const getCellData = async () => { // todo : Charts 실시간 API 연결. 
        try {
            const url: string = `/cell-metrics`;
            const response = await defaultAxios.get(url);

            // 성공 핸들링
            setCellData(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    //*첫 렌더링 시 실행
    useEffect(()=>{
        getCellData(); // 셀 데이터를 받아온다.
        console.log(cellData);
    },[]);

    //todo : 추후 GagueChart API 연결
    


    return(
        <div className={styles.container}>
            <section className={styles.item}>
                {/* //todo : 삐져나가는 거 해결. */}
                <GaugeChart 
                        style={{width: "80%" , margin: "0", padding: "0"}}
                        id="gauge-chart1"
                        arcPadding={0} // 호 사이 패딩
                        nrOfLevels={100}  //100%까지
                        cornerRadius={0}  // 코너 둥글게?
                        percent={0.56}  /// todo : 차트 percent 백엔드로 받아와야함
                        textColor="black" 
                        colors={['#0077C2','#0077C2','#C8FFFF']} // 초록-노랑-빨강 그라데이션
                />
                <h3 className={styles.chart_title}> 바늘 차트</h3>
                
            </section>
            <section className={styles.item}>
                {/* <SimpleBarChart/> */}
                <Charts 
                    chartType="bar"
                    data={cellData}
                    color="#59A5F5"
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