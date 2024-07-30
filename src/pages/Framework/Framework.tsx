import Header  from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
// import '../../styles/common.scss';
import styles from "./Framework.module.scss";
import FrameworkCard from "./FrameworkCard/FrameworkCard";
import { FrameworkCardType } from "../../types/Framework.types";


const Framework: React.FC = () => {
    // 카드 데이터
    const FrameworkCardsData:FrameworkCardType[] =  [
        {
            name : "ODMB",
            version: "1.0.0",
            status: "off",
            description : "설명을 기록하는 부분"
        },{
            name : "OAPB",
            version: "1.0.0",
            status: "off",
            description : "설명을 기록하는 부분"
        }
        ,{
            name : "OSMB",
            version: "1.0.0",
            status: "on",
            description : "설명을 기록하는 부분"
        }
        ,{
            name : "OOMB",
            version: "1.0.0",
            status: "on",
            description : "설명을 기록하는 부분"
        },{
            name : "InfluxDB",
            version: "1.0.0",
            status: "on",
            description : "설명을 기록하는 부분"
        }
        ,{
            name : "MINIO DB",
            version: "1.0.0",
            status: "on",
            description : "설명을 기록하는 부분"
        }

    ]
        return(
            <div className="container">
                <Sidebar/>
                <div className="main_header_container">
                    <Header titleText="Non-RT RIC Framework"/>
                    <main className="main_container">
                        <article className={styles.framework_card_container}>
                            <h1>Non-RT RIC Framework Blocks</h1>
                            <section className={styles.framework_cards}>
                                <FrameworkCard data={FrameworkCardsData}/>
                            </section>
                        </article>
                    </main>
                    
                </div>
            </div>
        )
}

export default Framework;