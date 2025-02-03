import { useQuery } from "@tanstack/react-query";
import React, { PureComponent } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  RadialBar,
} from "recharts";
import { fetchCellData, fetchCellSumData } from "../../../apis/dashboardApi";
import { CellSum, CellData } from "../../../types/apis.types";
import styles from "../../../components/Charts/Charts.module.scss";
import { chartColors } from "../../../utils/chartColors";
import { RadialBarChart } from "recharts";
import { Legend } from "recharts";
import { GaugeComponent } from "react-gauge-component";
import GaugeChart from "react-gauge-chart";

// ! 반원 모양으로 DL Sum 값을 표시한다.
const DLSumGagueChart: React.FC = () => {
  const { data: cellSumData } = useQuery<CellSum>({
    queryKey: ["cellSumData"], // c동일한 쿼리 키
    queryFn: fetchCellSumData, // 데이터 fetching 함수
  
  });

  return (
    <div
      className={styles.screen}
      style={{
        // flex 속성을 먹여주면 크기가 자연스럽게 잘 바뀐다.
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GaugeComponent
        marginInPercent={{ top: 0.08, bottom: 0.0, left: 0.15, right: 0.1 }}
        type="semicircle"
        arc={{
          width: 0.2,
          padding: 0.005,
          cornerRadius: 1,
          gradient: true, // 그라데이션으로 이어진다.
          subArcs: [
            {
              limit: 50,
              color: "#00BFFF", //"#5C5C5C", //"#C8FFFF",
              showTick: true,
              tooltip: {
                text: "OK temperature!",
              },
            },
            {
              limit: 100,
              color: "#00BFFF",
              showTick: true, // tick 보이기
              tooltip: {
                text: "High temperature!",
              },
            },
            {
              color: "#00619A",
              tooltip: {
                text: "Too high temperature!",
              },
            },
          ],
        }}
        pointer={{
          color: "#00DFFF", //"#5C5C5C",
          length: 0.7,
          width: 15,
          // elastic: true,
        }}
        labels={{
          // 값 글자 설정
          valueLabel: {
            formatTextValue: (value) => value + "Mbps",
            style: { fill: "#333333", fontWeight: "bold", textShadow: "none" },
          },
          tickLabels: {
            //tick 글자 설정
            type: "outer",
            defaultTickValueConfig: {
              formatTextValue: (value: any) => value, // + "Mbps",
              style: { fontSize: 10 },
            },

            ticks: [
              { value: 0 },
              { value: 300 },
              { value: 500 },
              { value: 700 },
//              { value: 800 },
              { value: 900 },
//              { value: 1000 },
            ], // 추가 tick 표시
          },
        }}
        value={cellSumData?.DL_rate || 0}
        minValue={0}
        maxValue={1000}
      />
      <h3 className={styles.chart_title}> Throughput (DL)</h3>
    </div>
  );
};

export default DLSumGagueChart;
