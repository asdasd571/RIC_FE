import { useEffect, useState } from "react";
import styles from "./EtriRIC.module.scss";
import defaultAxios from "../../../apis/defaultAxios";

// * ETRI RIC 목록을 모여주는 컨테이너

// * API 데이터
interface RicInfoType {
    value: string;
    name: string;
    state: "OFF" | "ON" | "ERROR" | "WARNING";  // 상태는 고정된 문자열이므로 Union 타입으로 정의
}


const EtriRIC : React.FC = ()=>{

    // *ETRI RIC 4개 데이터
    // const [ricInfoData, setRicInfoData] = useState<RicInfo[]>([]);
    // const [ricInfoData, setRicInfoData] = useState<Record<string, any>[]>([]);
    // Partial을 사용하면 모든 속성이 선택적(optional)이 됩니다.
    const [ricInfoData, setRicInfoData] = useState<Partial<RicInfoType>[]>([]);


    
    // todo : 실시간 연결.
    //* ricinfo 데이터 받기
    const getRicInfoData = async ():Promise<void> => {
        try {
            const url: string = `/ric-info`;
            const response=  await defaultAxios.get(url);

            // 성공 핸들링
            setRicInfoData(response.data);
        } catch (error) {
            console.log(error);
        }
    }


    // *첫 렌더링 시 실행
    useEffect(()=> {
        getRicInfoData();
        
    },[]);

    // * 테스트용 
    useEffect(()=>{
        console.log(ricInfoData);
    },[ricInfoData]);


    // todo : soft코딩으로 바꿔줘야할듯?
    return(
        <div className={styles.container}>
        <div className={styles.description}> 
            <div className={styles.des_item}>
                <span className={`${styles.state} ${styles.off}` }> </span>
                <span className={styles.text}>OFF</span>
            </div>
            <div className={styles.des_item}>
                <span className={`${styles.state} ${styles.on}`}></span>
                <span className={styles.text}>ON</span>
            </div>
            <div className={styles.des_item}>
                <span className={`${styles.state} ${ styles.error}`}></span>
                <span className={styles.text}>ERROR</span>
            </div>
            <div className={styles.des_item}>
                <span className={`${styles.state} ${ styles.warning}`}></span>
                <span className={styles.text}>WARNING</span>
            </div>
        </div>

        {ricInfoData.map((ric, index)=> (
            <section className={styles.item}>
                <div className={styles.item_values}>
                    <span className={styles.item_value}>
                        {ric.value}
                    </span>
                    <span className={styles.item_name}>
                        {ric.name}
                    </span>
                </div>
                <div  
                    className={styles.item_state}
                    style={{
                        backgroundColor: 
                            ric.state === "OFF" ? "#CCCCCC" : 
                            ric.state === "ON" ? "#9EEDA7" : 
                            ric.state === "WARNING" ? "#FFE990" : 
                            "#ED9E9F"
                    }}
                >
                    {/* 원 */}
                </div>
            </section>
        ))}

    </div>
    )
}

export default EtriRIC;