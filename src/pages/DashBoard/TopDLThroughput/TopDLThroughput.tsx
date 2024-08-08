
import Charts from "../../../components/Charts2/Charts";
import MultiLineChart from "../../../components/Charts2/MultiLineChart";
import SimpleAreaChart from "../../../components/Charts2/SimpleAreaChart";
import SimpleBarChart from "../../../components/Charts2/SimpleBarChart";
import SimpleLineChart from "../../../components/Charts2/SimpleLineChart";
import styles from "./TopDLThroughput.module.scss";
import testData from "../../../components/Charts2/testData";
// 위의 DL Throughput을 출력한다.

import GaugeChart from 'react-gauge-chart';

const TopDLThroughput : React.FC = () => {
    return(
        <div className={styles.container}>
            <section className={styles.item}>
                {/* //todo : 삐져나가는 거 해결. */}
                <GaugeChart id="gauge-chart1"
                        arcPadding={0} // 호 사이 패딩
                        nrOfLevels={100}  //100%까지
                        cornerRadius={0}  // 코너 둥글게?
                        percent={0.56}  /// todo : 차트 percent 백엔드로 받아와야함
                        textColor="black" 
                        colors={['#0077C2','#0077C2','#C8FFFF']} // 초록-노랑-빨강 그라데이션
                />
            </section>
            <section className={styles.item}>
                {/* <SimpleBarChart/> */}
                <Charts chartType="line"/>
                
            </section>
        </div>
    )
}

export default TopDLThroughput;