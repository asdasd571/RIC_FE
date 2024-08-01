import { useEffect, useState } from "react";
import styles from "./Alarm.module.scss";
import defaultAxios from "../../../apis/defaultAxios";
import Swal from "sweetalert2";

// *알림을 출력하는 컴포넌트이다.
const Alarm:React.FC = () => {


    interface Data {
        title: string;
        text: string;
    }

    const datas : Data[] = [
        {   
            title: '알림1',
            text: '갑자기 수치가 80%가 넙고, 값이.. 그래프가... 높은... 경고... 등등... 어디 셀이 어떻고 저렇고'
        },
        {   
            title: '알림2',
            text: '갑자기 수치가 80%가 넙고, 값이.. 그래프가... 높은... 경고... 등등... 어디 셀이 어떻고 저렇고'
        },
        {   
            title: '알림3',
            text: '갑자기 수치가 80%가 넙고, 값이.. 그래프가... 높은... 경고... 등등... 어디 셀이 어떻고 저렇고'
        },
        {   
            title: '알림4',
            text: '갑자기 수치가 80%가 넙고, 값이.. 그래프가... 높은... 경고... 등등... 어디 셀이 어떻고 저렇고'
        },
        {   
            title: '알림5',
            text: '갑자기 수치가 80%가 넙고, 값이.. 그래프가... 높은... 경고... 등등... 어디 셀이 어떻고 저렇고'
        }
    ];

    //* ========== interface ================== //
    interface AlarmType {
        name: string
        //todo : 알림 내용을 다른 데이터 key 추가되면 넣어야함
    }

    // *========================================= //

    //* ========== state ======================= //
    const [alarmList, setAlarmList] = useState<AlarmType[]>([]);


    //* ======================================== //
    
    //* ========== API RAPP 데이터 받기 =========*// 

    // 알림 alarm 리스트를 받아오는 부분
    const getAlarmList = async (): Promise<void>  => {
        try{
            const url:string = `/alarm`;
            const response = await defaultAxios.get(url);

            setAlarmList(response.data); 
            // console.log('성공 /alarm', response.data );
        } catch (error) {
            console.error('오류 발생!',error);
        }// finally {
        //     console.log("항상 실행되는");
        // }        
    }


    // 각 알림아이템의 Aelrt를 띄워주자.
    const handleShowAlarmModal = (data:AlarmType):void => {
        Swal.fire({
            
            // icon: 'info',
            title: data?.name || "AlarmTitle",
            text: data?.name  || "AlarmTest", //todo : text 내용으로 추후 변경
        })
    }
    //* ======================================== //


    //첫 렌더링시, 실행!
    useEffect(()=>{
        getAlarmList(); // rApp 리스트 받아오기.
    },[]);

    return(
        <div className={styles.container}>
            <h3  className={styles.title}>Alarms</h3>
            <section className={styles.alarm_list}>
                {
                alarmList.map((data, index)=> (
                    <article onClick={()=>handleShowAlarmModal(data)} className={styles.item}>
                        <h4 className={styles.item_title}>{data.name}</h4>
                        {/* //todo : 알림 내용을 다른 데이터 추가되면 넣어야함 */  }
                        <p className={styles.item_text}>{data.name}</p>
                    </article>
                ))
                }

            </section>

        </div>
    )
}



export default Alarm;