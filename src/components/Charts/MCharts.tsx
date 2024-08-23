import { MChartsProps } from "../../types/Chart.types"
import MultiLineChart from "./MultiLineChart"
import testData from "./testData"


// * 멀티 차트


/** 
 * 차트를 선택하여 렌더링하는 컴포넌트입니다.
 * @param chartType : 차트의 종류 ('bar', 'line', 'area', 'mLine')
 * @param data : 차트에 표시할 데이터 (기본값: testData)
 * @param color : 차트 색상 (기본값: "#59A5F5")
 * @param dataKey : 데이터의 기준이 되는 키 (기본값: "pv")
 * @param title : 차트 제목 (기본값: "ChartName")
 * @param name : x축의 기준이 되는 이름 (기본값: "name")
 */
const MCharts : React.FC<MChartsProps> = ({ 
    chartType="mLine",
    data = testData, 
    color = ["#59A5F5","#3e5b7a"], 
    dataKey=["pv", "uv"], 
    title="ChartName", 
    name="name"}) => 

{
    
    return(
        chartType === "mLine" ? (
            <MultiLineChart  data={data} name={name} title = {title} color={color} dataKey={dataKey}/>
        )  : null // 기본값 설정 또는 에러 처리
        
    )
}

export default MCharts;