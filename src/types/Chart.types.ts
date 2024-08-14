export interface ChartProps {
    data?: Array<Record<string, any>>; //data는 객체 배열이지만 아이템의 형태는 유연하다
    color? : string ;
    dataKey?: string;
    title?: string;
    name?: string;
    colors? :string[]; // 색상배열
}



export interface MChartProps {
    data?: Array<Record<string, any>>; //data는 객체 배열이지만 아이템의 형태는 유연하다
    color? : string[];
    dataKey?: string[];
    title?: string;
    name?: string
}


// 차트 타입을 선택할 수 있다.
/** 차트 타입을 선택하는 chartType이 추가되었다.
 *@param chartTpye: string -> bar, line,are,mLine 선택가능.
 */
export interface ChartsProps extends ChartProps{
    chartType: 'bar' | 'line' | 'area' | 'mLine' | 'cell';
}

// 차트 타입을 선택할 수 있다.
/** 차트 타입을 선택하는 chartType이 추가되었다.
 *@param chartTpye: string -> mLine 선택가능.
 */
export interface MChartsProps extends MChartProps{
    chartType: 'mLine';
}

