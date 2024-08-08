
import { ChartProps, ChartsProps} from "../../types/Chart.types";
import SimpleBarChart from './SimpleBarChart';
import SimpleLineChart from './SimpleLineChart';
import SimpleAreaChart from './SimpleAreaChart';
import MultiLineChart from './MultiLineChart';
import testData from "./testData";
import React from "react";
import { ResponsiveContainer } from "recharts";


/** 
 * 차트를 선택하여 렌더링하는 컴포넌트입니다.
 * @param chartType : 차트의 종류 ('bar', 'line', 'area', 'mLine')
 * @param data : 차트에 표시할 데이터 (기본값: testData)
 * @param color : 차트 색상 (기본값: "#59A5F5")
 * @param dataKey : 데이터의 기준이 되는 키 (기본값: "pv")
 * @param title : 차트 제목 (기본값: "ChartName")
 * @param name : x축의 기준이 되는 이름 (기본값: "name")
 */
const Charts : React.FC<ChartsProps> = ({ 
    chartType="bar",
    data = testData, 
    color = "#59A5F5", 
    dataKey="pv", 
    title="ChartName", 
    name="name"}) => 

{
    
    return(
        chartType === "bar" ? (
            <SimpleBarChart  data={data} name={name} title = {title} color={color} dataKey={dataKey}/>
        ) : chartType === "line" ? (
            <SimpleLineChart data={data} name={name} title = {title} color={color} dataKey={dataKey}/>
        ) : chartType === "area" ? (
            <SimpleAreaChart data={data} name={name} title = {title} color={color} dataKey={dataKey}/>
        ) : chartType === "mLine" ? (
            <MultiLineChart  data={data} name={name} title = {title} color={color} dataKey={dataKey}/>
        )  : null // 기본값 설정 또는 에러 처리
        
    )
}

export default Charts;