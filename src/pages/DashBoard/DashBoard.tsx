import Charts from "../../components/Charts/Charts";
import Header from "../../components/Header/Header";
import MapView from "../../components/MapView/MapView";
import Sidebar from "../../components/Sidebar/Sidebar";
// import '../../styles/common.scss';
import styles from "./DashBoard.module.scss";
import EtriRIC from "./EtriRIC/EtriRIC";
import TimeDLThroughput from "./TimeDLThroughput/TimeDLThroughput";
import TopDLThroughput from "./TopDLThroughput/TopDLThroughput";
import ValueCard from "./ValueCard/ValueCard";
import React from "react";

const DashBoard: React.FC = () => {
  return (
    <div className="container">
      <Sidebar />
      <div className="main_header_container">
        {/* <Header titleText="Dashboard"/> */}
        <main className="main_container">
          <div className={styles.dashboard_grid_container}>
            <section className={`${styles.item} ${styles.value1_1}`}>
              <h3 className={styles.item_title}>Performance</h3>
              <hr />
              <TopDLThroughput />
            </section>

            <section className={`${styles.item} ${styles.e2_nodes}`}>
              <h3 className={styles.item_title}>E2 Nodes</h3>
              <hr />
              <div className={styles.item_contents}>
                <MapView />
              </div>
            </section>

            <section className={`${styles.item} ${styles.etri_ric}`}>
              <h3 className={styles.item_title}>ERIC</h3>
              <hr />
              <EtriRIC />
            </section>

            <section className={`${styles.item} ${styles.value1_2}`}>
              <h3 className={styles.item_title}>Throughput</h3>
              <hr />
              <TimeDLThroughput type="DL_rate" />
              {/* <Charts chartType="mLine" title="" dataKey={['uv','pv']}/> */}
            </section>

            <section className={`${styles.item} ${styles.value2}`}>
              <h3 className={styles.item_title}>Power</h3>
              <hr />
              <TimeDLThroughput type="UL_rate" />
            </section>

            <section className={`${styles.item} ${styles.value3}`}>
              <h3 className={styles.item_title}>Throughput</h3>
              <hr />
              <ValueCard type="DL_rate" />
            </section>

            <section className={`${styles.item} ${styles.value4}`}>
              <h3 className={styles.item_title}>Power</h3>
              <hr />
              <ValueCard type="UL_rate" />
            </section>

            <section className={`${styles.item} ${styles.value5}`}>
              <h3 className={styles.item_title}>Active UE</h3>
              <hr />
              <TimeDLThroughput type="Num_UE" />
            </section>

            <section className={`${styles.item} ${styles.value6}`}>
              <h3 className={styles.item_title}>Active UE</h3>
              <hr />
              <ValueCard type="Num_UE" />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashBoard;
