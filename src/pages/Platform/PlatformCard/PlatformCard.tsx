
import Platform from "../../../assets/imgs/Platform.svg";
import styles from "./PlatformCard.module.scss";
import { PlatformCardType } from "../../../types/Platform.tpyes";
// Platform의 패널을 나타낸다.
import React from "react"

//* temp 데이터
//없앰.

//* Props로 넘겨받기 위해 인터페이스 생성.
interface PlatformProps{
    data?: PlatformCardType[]; // '?'를 붙여 선택적으로 넣기.
}

// * 
/** Platform 카드들을 출력한다.
 * @param data : PlatformCardType[] 으로, 출력할 Platform 카드 객체 배열이다.
 */
const PlatformCard : React.FC<PlatformProps> = ({data}) => {

    
    //* 각각 클릭시 적절한 페이지로 이동 
    const handleCardClick = (url:string) => {
        window.open(url, '_blank'); // 창 오픈
        // window.location.href= url; // 탭 오픈
    }

    return (
        <>
            {data?.map((item, index)=> (
                <div onClick={()=> {handleCardClick(item.open)}}className={styles.container} key={item.id}>
                    <section className={styles.header_container}>
                        <div className={styles.header_content}>
                            <h2>{item.name}</h2>
                            <p>
                                <strong>Version:</strong> {item.version} <br/>
                                <strong>ServiceType:</strong> {item.ServiceType} <br/>
                                <strong>Vendor:</strong> {item.vendor}
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


export default PlatformCard;