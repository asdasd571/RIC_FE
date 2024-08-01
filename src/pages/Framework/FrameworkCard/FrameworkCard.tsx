
import Framework from "../../../assets/imgs/Framework.svg";
import styles from "./FrameworkCard.module.scss";
// Framework의 패널을 나타낸다.
import { FrameworkCardType } from "../../../types/Framework.types";

//* temp 데이터
const tempData :FrameworkCardType[] = [
    {
        "description": "TEST",
        "name": "OSMB",
        "rappSchema": {
            "ServiceType": "http://127.0.0.1:9096",
            "rAppId": "OSMB",
            "vendor": "ETRI",
            "version": "v1.0.0"
        },
        "state": "ON"
    },
    {
        "description": "TEST",
        "name": "ODMB",
        "rappSchema": {
            "ServiceType": "http://localhost:20250",
            "rAppId": "ODMB",
            "vendor": "ETRI",
            "version": "v1.0.0"
        },
        "state": "ON"
    },
    {
        "description": "TEST",
        "name": "OAPB",
        "rappSchema": {
            "ServiceType": "http://127.0.0.1:8080",
            "rAppId": "OAPB",
            "vendor": "ETRI",
            "version": "v1.0.0"
        },
        "state": "ON"
    },
    {
        "description": "TEST",
        "name": "OOMB",
        "rappSchema": {
            "ServiceType": "http://localhost:20250",
            "rAppId": "OOMB",
            "vendor": "ETRI",
            "version": "v1.0.0"
        },
        "state": "ON"
    }
]

//* Props로 넘겨받기 위해 인터페이스 생성.
interface FrameworkProps{
    data?: FrameworkCardType[]; // '?'를 붙여 선택적으로 넣기.
}

// * 
/** Framework 카드들을 출력한다.
 * @param data : FrameworkCardType[] 으로, 출력할 Framework 카드 객체 배열이다.
 */
const FrameworkCard : React.FC<FrameworkProps> = ({data =tempData}) => {
    return (
        <>
            {data.map((item, index)=> (
                <div className={styles.container} key={index}>
                    <section className={styles.header_container}>
                        <div className={styles.header_content}>
                            <h2>{item.name}</h2>
                            <p>
                                Version: {item.rappSchema.version} <br/>
                                ServiceType: {item.rappSchema.ServiceType}
                            </p>

                        </div>
                        <div className={`${styles.header_img} ${item.state ==="ON" ? '' : styles.off}` }>
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