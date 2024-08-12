
import rapp from "../../../assets/imgs/rapp.svg";
import styles from "./RAppCard.module.scss";
// RAPP의 패널을 나타낸다.
import { rAppCardType } from "../../../types/RApp.types";



//* Props로 넘겨받기 위해 인터페이스 생성.
interface RAppProps{
    data?: rAppCardType[]; // 선택적으로 데이터를 넣어준다!
}

// * 
/** RAPP 카드들을 출력한다.
 * @param data : rAppCardType[] 으로, 출력할 RAPP 카드 객체 배열이다.
 */
const RAppCard : React.FC<RAppProps> = ({data }) => {
    return (
        <>
            {data?.map((item, index)=> (
                <div className={styles.container} key={item.rappSchema.rAppId}>
                    <section className={styles.header_container}>
                        <div className={styles.header_content}>
                            <h2>{item.name}</h2>
                            <p>{item.rappSchema.ServiceType}</p>
                        </div>
                        <div className={styles.header_img}>
                            <img src={rapp} alt="rapp" />
                        </div>
                    </section>

                    <hr/>
                    <section className={styles.body_container}>
                        <p>{item.description}</p>
                    </section>

                    <section className={styles.footer_container}>
                        <div className={styles.rapp_id}> rAppID: {item.rappSchema.rAppId}</div>
                        <button 
                            disabled={item.open ? false: true} 
                            className={styles.btn_open}
                            onClick={() => {window.open(item.open)} // 클릭시, open 사이트로 이동
                        }
                        >
                            open
                            {/* /<a href={item.open} target="_blank" rel="noopener noreferrer" >open</a> */}
                        </button>
                    </section>
                </div>))
            }
        </>
    );
}


export default RAppCard;