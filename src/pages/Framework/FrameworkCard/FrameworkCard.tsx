
import Framework from "../../../assets/imgs/Framework.svg";
import styles from "./FrameworkCard.module.scss";
// Framework의 패널을 나타낸다.
import { FrameworkCardType } from "../../../types/Framework.types";




//* Props로 넘겨받기 위해 인터페이스 생성.
interface FrameworkProps{
    data: FrameworkCardType[];
}

// * 
/** Framework 카드들을 출력한다.
 * @param data : FrameworkCardType[] 으로, 출력할 Framework 카드 객체 배열이다.
 */
const FrameworkCard : React.FC<FrameworkProps> = ({data}) => {
    return (
        <>
            {data.map((item, index)=> (
                <div className={styles.container} key={index}>
                    <section className={styles.header_container}>
                        <div className={styles.header_content}>
                            <h2>{item.name}</h2>
                            <p>Version: {item.version}</p>
                        </div>
                        <div className={`${styles.header_img} ${item.status ==="on" ? '' : styles.off}` }>
                        </div>
                    </section>

                    <hr/>
                    <section className={styles.body_container}>
                        <p>{item.description}</p>
                    </section>
                </div>))
            }
        </>
    );
}


export default FrameworkCard;