import React from 'react'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar, Rectangle } from 'recharts';
import styles from './Charts.module.scss';
import testData from './testData';

import { ChartProps, MChartProps } from '../../types/Chart.types';

const MultiLineChart :React.FC<MChartProps> = ({
    data = testData,
    color = ["#99d98c","#2d3142"],
    dataKey=["pv","uv"],
    title="ChartName",
    name="name",
    })=>
    {
    
    return(
        <div className={styles.screen}>
            <ResponsiveContainer className={styles.responsive_container}>
                <LineChart  className = {styles.chart_container}
                
                width={700}
                height={300} 
                data={data} 
                >
                    <CartesianGrid strokeDasharray="3 3 " stroke="#cccccc" />
                    <XAxis dataKey={name} stroke="#5C5C5C" />
                    <YAxis hide={false} stroke="#5C5C5C"/>
                    <Tooltip />

                    {/* Data의 dataKey의 에 따라 Line이 늘어난다.  */}
                    {/* <Line animationDuration={0} type="monotone" dataKey={dataKey} stroke={color} activeDot={{ r: 8 } } strokeWidth={3} /> */}
                    {
                        (dataKey as string[]).map((currentName, index) => (
                            <Line
                                key={currentName} // 고유 key 설정
                                animationDuration={0}
                                type="monotone"
                                dataKey={currentName}
                                stroke={color[index]} // 색상 지정
                                activeDot={{ 
                                    r: 4,
                                    fill: color[index], // 점 내부를 선 색상과 동일하게 채우기
                                }}
                                strokeWidth={1}
                            />
                        ))
                    }
                    
                    
                </LineChart>
            </ResponsiveContainer>
            { title?.length > 0 ? // 차트 제목 길이가 0이상이면, 타이틀 출력!
                <h3 className={styles.chart_title} > {title} </h3> : <></>
            }
        </div>

        

    );
}

export default MultiLineChart;