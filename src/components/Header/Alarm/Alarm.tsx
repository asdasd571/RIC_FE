import { useEffect, useState } from "react";
import styles from "./Alarm.module.scss";
import defaultAxios from "../../../apis/defaultAxios";
import Swal from "sweetalert2";
import bellOFF from"../../../assets/imgs/bellOFF.svg";
import bellON from"../../../assets/imgs/bellON.svg";

//* 알림 데이터 형식
interface AlarmData {
    name: string;
    text?: string;
}

// *알림 있는지에 대한 props 정의
interface AlarmProps{
    
    data :AlarmData[];
}

//* 임시 데이터
const tempDatas : AlarmData[] = [
    {   
        name: '알림1',
        text: '갑자기 수치가 80%가 넙고, 값이.. 그래프가... 높은... 경고... 등등... 어디 셀이 어떻고 저렇고'
    },
    {   
        name: '알림2',
        text: '갑자기 수치가 80%가 넙고, 값이.. 그래프가... 높은... 경고... 등등... 어디 셀이 어떻고 저렇고'
    },
    {   
        name: '알림3',
        text: '갑자기 수치가 80%가 넙고, 값이.. 그래프가... 높은... 경고... 등등... 어디 셀이 어떻고 저렇고'
    },
    {   
        name: '알림4',
        text: '갑자기 수치가 80%가 넙고, 값이.. 그래프가... 높은... 경고... 등등... 어디 셀이 어떻고 저렇고'
    },
    {   
        name: '알림5',
        text: '갑자기 수치가 80%가 넙고, 값이.. 그래프가... 높은... 경고... 등등... 어디 셀이 어떻고 저렇고'
    }
];

// *알림을 출력하는 컴포넌트이다.
const Alarm:React.FC<AlarmProps> = ({data=[]}) => {

    // *== 상태 ========= //
    const [isShowAlarm, setIsShowAlarm] = useState<boolean>(false); // true : 알림창 보임, false : 알림창 끔
    // *================= //
    
    // *각 알림아이템의 Aelrt를 띄워주자.
    const handleShowAlarmModal = (data:AlarmData):void => {
        Swal.fire({
            
            // icon: 'info',
            title: data?.name || "AlarmTitle",
            text: data?.name  || "AlarmTest", //todo : text 내용으로 추후 변경
        })
    }

    // *  벨 버튼 클릭시 알림 on / off
    const handleShowAlarm = ():void =>{
        setIsShowAlarm(!isShowAlarm); //
    }


    return(
        <div className={styles.alarm_container}>
            <img 
                className={styles.bell}
                src={ data.length > 0 ? bellON : bellOFF} // 알림데이터가 있으면 bellON, 없으면 bell OFF
                alt="벨"
                onClick={handleShowAlarm}/>
            { isShowAlarm && ( // 알람 보이기  true
            <div className={styles.container} >
                <h3  className={styles.title}>Alarms</h3>
                {
                    data.length > 0 ? //데이터가 있다면
                        <section className={styles.alarm_list}>
                            {
                            data.map((element, index)=> (
                                <article onClick={()=>handleShowAlarmModal(element)} className={styles.item}>
                                    <h4 className={styles.item_title}>{element.name}</h4>
                                    {/* //todo : 알림 내용을 다른 데이터 추가되면 넣어야함 */  }
                                    <p className={styles.item_text}>{element.name}</p>
                                </article>
                            ))
                            }

                        </section>
                    :   // 데이터가 없다면,
                        <section className={styles.alarm_list}>
                            <h4 className={styles.item_title}>No notifications</h4>
                        </section>
                }
            </div>
            )}

        </div>
    )
}



export default Alarm;