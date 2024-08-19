import { useQuery } from '@tanstack/react-query';
import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { fetchCellData, fetchCellSumData } from '../../../apis/dashboardApi';
import { CellSum , CellData} from '../../../types/apis.types';
import styles from '../../../components/Charts/Charts.module.scss';




// 바 차트 색상 .
const colors = [ // .//todo : 이 친구를 전체 상태로 해야할듯 (bar에 적용해야함)
    "#C8FFFF", "#A1EBFF", "#7AD8FF", "#55C4FF", "#00BFFF",
    "#0098D4", "#0080B3", "#00699B", "#005282", "#31297C"
];

const DLSumPieChart :React.FC = ()=>{
    const { data: cellSumData } = useQuery<CellSum>({
        queryKey: ['cellSumData'], // c동일한 쿼리 키
        queryFn: fetchCellSumData, // 데이터 fetching 함수
    });

    const { data: cellData} = useQuery<CellData[]>({
        queryKey: ['cellData'], // c동일한 쿼리 키
        queryFn: fetchCellData, // 데이터 fetching 함수
    });

    
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
                        innerRadius={50}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="DL_rate"
                        // label // 각 값 표시
                    >
                        
                        {cellData?.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                    </Pie>

                    <Pie
                        data={[cellSumData]}
                        dataKey="DL_rate"
                        cx="50%"
                        cy="50%"
                        fill="#8884d8"
                        label
                        outerRadius={20}
                    />
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
            <h3 className={styles.chart_title} > DL_SUM </h3>
        </div>
    )
}

export default DLSumPieChart;