import { useQuery } from '@tanstack/react-query';
import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { fetchCellData, fetchCellSumData } from '../../../apis/dashboardApi';
import { CellSum , CellData} from '../../../types/apis.types';
import styles from '../../../components/Charts/Charts.module.scss';
import { chartColors } from '../../../utils/chartColors';


const DLSumPieChart :React.FC = ()=>{
    const { data: cellSumData } = useQuery<CellSum>({
        queryKey: ['cellSumData'], // c동일한 쿼리 키
        queryFn: fetchCellSumData, // 데이터 fetching 함수
    });

    const { data: cellData} = useQuery<CellData[]>({
        queryKey: ['cellData'], // c동일한 쿼리 키
        queryFn: fetchCellData, // 데이터 fetching 함수
    });
    
    //pie 차트 내부 스타일
    const innerTextStyle = {
        fontSize: '0.9rem', // 16px
        fontWeight: 'bold',
        fill: '#333333',  // SVG에서 색상은 'fill' 속성으로 지정
    };


    return(
        <div className={styles.screen}>
            <ResponsiveContainer className={styles.responsive_container}>
                <PieChart width={400} height={400}>
                    <Pie
                        data={cellData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        // endAngle={0}
                        innerRadius={45}
                        outerRadius={70}
                        fill="#8884d8"
                        dataKey="DL_rate" // DL_rate
                        // label // 각 값 표시
                        isAnimationActive={false} // 애니메이션 끄기
                    >
                        
                        {cellData?.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]}  />
                        ))}
                    </Pie>
                    {/* 텍스트 가운대 정렬 */}
                    <text style={innerTextStyle} x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">{cellSumData?.DL_rate}</text>
                    {/* <Pie
                        data={[cellSumData]}
                        dataKey="DL_rate"
                        cx="50%"
                        cy="50%"
                        fill={}
                        label={renderCustomLabel}
                        outerRadius={20}
                    /> */}
                    
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
            <h3 className={styles.chart_title}
                > Total </h3> 
        </div>
    )
}

export default DLSumPieChart;