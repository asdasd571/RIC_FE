import styles from "./Alarm.module.scss";


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
    ]

    return(
        <div className={styles.container}>
            <h3  className={styles.title}>Alarms</h3>
            <section className={styles.alarm_list}>
                {
                datas.map((data, index)=> (
                    <article className={styles.item}>
                        <h4 className={styles.item_title}>{data.title}</h4>
                        <p className={styles.item_text}>{data.text}</p>
                    </article>
                ))
                }

            </section>

        </div>
    )
}



export default Alarm;