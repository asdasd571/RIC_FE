import React from 'react'
import {Label, BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import testData from './testData';
import styles from './Charts.module.scss';

import { ChartProps } from '../../types/Chart.types';

// 바 차트 색상 .
const colors = [ // .//todo : 이 친구를 전체 상태로 해야할듯 (bar에 적용해야함)
    "#C8FFFF", "#A1EBFF", "#7AD8FF", "#55C4FF", "#00BFFF",
    "#0098D4", "#0080B3", "#00699B", "#005282", "#31297C"
];

// color : 컬러 입력 가능 (기본값)
/** color : 차트 색, dataKey : 차트  데이터 기준 // title : 바차트 이름  */
const SimpleCellChart: React.FC<ChartProps> = ({
    data = testData,
    color = "#59A5F5",
    colors  = [ "#C8FFFF", "#A1EBFF", "#7AD8FF", "#55C4FF", "#00BFFF",
                "#0098D4", "#0080B3", "#00699B", "#005282", "#31297C" ],
    dataKey="pv",
    title="ChartName",
    name="name"}) =>
    {

    return(
        // 반응형 컨테이너 만들기
        <div className={styles.screen}>
            <ResponsiveContainer className={styles.responsive_container}>

            <BarChart data={data} dataKey={dataKey}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={name} />
                <YAxis />
                <Tooltip />
                <Bar dataKey={dataKey}>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                </Bar>
            </BarChart>
            </ResponsiveContainer>
            { title?.length > 0 ? // 차트 제목 길이가 0이상이면, 타이틀 출력!
                <h3 className={styles.chart_title} > {title} </h3> : <></>
            }
        </div>

    )
}

export default SimpleCellChart;





// interface ChartProps {
//     data?: Array<Record<string, any>>; //data는 객체 배열이지만 아이템의 형태는 유연하다
//     color? : string;
//     dataKey: string;
//     title?: string;
//     name?: string
// }