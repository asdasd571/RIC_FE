import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
  Rectangle,
  Label,
} from "recharts";
import styles from "./Charts.module.scss";
import testData from "./testData";
import React from "react";
import { ChartProps } from "../../types/Chart.types";

const SimpleLineChart: React.FC<ChartProps> = ({
  data = testData,
  color = "#59A5F5",
  dataKey = "pv",
  title = "ChartName",
  name = "name",
}) => {
  // const title = '기지국 번호 : '+props.title || '기지국 번호';
  return (
    <div className={styles.screen}>
      <ResponsiveContainer className={styles.responsive_container}>
        <LineChart width={700} height={300} data={data}>
          {/* 그래프를 격자 형태로 나누는 컴포넌트 */}
          <CartesianGrid strokeDasharray="3 3 " stroke="#cccccc" />
          {/* X축을 정의하는 커모넌트 */}
          <XAxis dataKey={name} stroke="#5C5C5C">
            <Label
              className={styles.chart_label_title}
              value={title || ""}
              offset={0}
              position="insideBottom"
            />
          </XAxis>
          {/* 왼쪽 Y축을 정의하는 컴포넌트 */}
          <YAxis hide={false} stroke="#5C5C5C" />
          {/* 데이터 포인트에 대한 정보를 보여주는 툴팁 컴포넌트 */}
          <Tooltip />
          {/* <Legend/> */}
          {/* 선을 나타내는 Line 컴포넌트. activeDot : 전 위 특정 지접 클릭시 나타나는활성화된 점의 모양  */}
          {/* <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 } } strokeWidth={2} /> */}
          {/* animationDuration={0} : 애니메이션 없애기 */}
          <Line
            animationDuration={0}
            type="monotone"
            dataKey={dataKey as string}
            stroke={color}
            activeDot={{ r: 8 }}
            strokeWidth={3}
          />

          {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" strokeWidth={2} /> */}
        </LineChart>
      </ResponsiveContainer>
      {/* { title?.length > 0 ? // 차트 제목 길이가 0이상이면, 타이틀 출력!
                <h3 className={styles.chart_title} > {title} </h3> : <></>
            } */}
    </div>
  );
};

export default SimpleLineChart;
