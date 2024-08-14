import { useQuery } from '@tanstack/react-query';
import defaultAxios from '../../../apis/defaultAxios';
import styles from './ValueCard.module.scss';


interface ValueProps {
    type: "DL_rate" | "UL_rate" | "Num_UE";
}

//value 타입
interface Value {
    description : string;
    difference: number;
    name: string;
    value: number;
}
// value 나타내는 카드들 
const ValueCard : React.FC<ValueProps> = ({type}) => {

    const getValueIndex = ():number => {
        if (type === "DL_rate"){
            return 0; //DL Throughput
        }else if(type === "UL_rate"){
            return 1; //UL Throughput
        }else if(type ==="Num_UE"){
            return 2; //Active UE
        }
        return 0; // 기본 값 또는 에러 처리
    }

    
    // * /value3 데이터, 각각 카드 데이터 받기.
    const getValues = async () =>{
        try{
            const url:string = `/value3`;

            const response = await defaultAxios.get(url);
            // getValueIndex를 사용하여 필요한 데이터만 반환
            return response.data[getValueIndex()];
        }catch(error){
            console.log(error);
        }
    }

    const {data: value} = useQuery<Value>({
        queryKey :  ['values', type],  // * type에 따라 다른 queryKey 사용
        queryFn: getValues
        // refetchInterval: 1000 // 1초마다 refetch
    })

    return (
        <div className={styles.container}>
            <section className={styles.section_value}>
                <div className={styles.value}> {value?.value}</div>
                <div className={styles.plus_minus}>{value?.difference}</div>
            </section>
            <section className={styles.section_description}>
                {value?.description}
            </section>
        </div>
    )
}


export default ValueCard;