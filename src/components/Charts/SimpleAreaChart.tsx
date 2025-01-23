import React, { PureComponent } from 'react';
import { ComposedChart,Line,AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import {stop, defs, LinearGradient } from 'recharts';
import * as Recharts from 'recharts';


import testData from './testData';
import styles from './Charts.module.scss';
import { ChartProps } from '../../types/Chart.types';


const  SimpleAreaChart:React.FC<ChartProps> = ( {
    data = testData,
    color = "#59A5F5",
    dataKey="pv" as string,
    title="ChartName",
    name="pv"} ) =>
        
    {
    return(
        <div className={styles.screen}>
            <ResponsiveContainer className={styles.responsive_container}>
                {/* <h1>SimpleAreaCharts</h1> */}
                {/* AreaChart(영역 차르)// ComposedChart (여러 차트들)를 그리기 위한 컴포넌트 */}
                <AreaChart className = {styles.chart_container}
                    width={500}
                    height={400}
                    data={data}
                    margin={{
                        top:10,
                        right:30,
                        left:0,
                        bottom:0, 
                    }}
                >
                    {/* 그라데이션 속성 넣기. defs 안에 넣어줘야함*/}
                    <defs>
                        {/* lnearGradient: 그라데이션을 'colorUv'로 정의함. */}
                        <linearGradient id={`colorUv${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                            {/* 시작과 끝 정의, stopColor:색상, stopOpacity : 투명도 */}
                            <stop offset="35%" stopColor={color} stopOpacity={0.9}/>
                            <stop offset="95%" stopColor={color} stopOpacity={0.2}/>
                        </linearGradient>
                    </defs>
                    {/* 그래프를 격자 형태로 나누는 컴포넌트 */}
                    <CartesianGrid strokeDasharray="6 3" stroke="#cccccc"/>
                    {/* X축을 정의하는 컴포넌트 */}
                    <XAxis dataKey={name} stroke="#5C5C5C"/>
                    {/* 데이터 포인트에 대한 정보를 보여주는 툴팁 컴포넌트 */}
                    <Tooltip/>
                    <YAxis stroke="#5C5C5C"/>
                    {/* 모노톤 영역차트르 그리는 컴포넌트 */}
                    <Area strokeWidth={2} animationDuration={1} type="monotone" dataKey={dataKey as string} stroke={color} fill={`url(#colorUv${dataKey})` } dot={{r : 2}}/>
                    {/* <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" /> */}
                    {/* 모노톤 라인차트를 그리는 컴포넌트 */}
                    {/* <Line type="monotone" dataKey="amt" stroke="#ff7300" /> */}
                    
                </AreaChart>
            </ResponsiveContainer>
            { title?.length > 0 ? // 차트 제목 길이가 0이상이면, 타이틀 출력!
                <h3 className={styles.chart_title} > {title} </h3> : <></>
            }
        </div>
    )
}

export default SimpleAreaChart;