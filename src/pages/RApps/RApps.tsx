import Header  from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
// import '../../styles/common.scss';
import styles from "./RApps.module.scss";
import { rAppCardType } from "../../types/RApp.types";
import RAppCard from "./RApp/RAppCard";
// 카드 데이터
const rAppCardsData:rAppCardType[] =  [
    {
        name : "Energy Saving",
        rappSchema : {
            rAppID : "1",
            ServiceType : "Network Energy Saving Service"
        },
        description : "Turns off cells if the loading is low"
    },
    {
        name : "RAN Performance",
        rappSchema : {
            rAppID : "2",
            ServiceType : "RAN KPI Monitoring Service"
        },
        description : "Provides insight into RAN KPI"
    },
    {
        name : "RAN Performance",
        rappSchema : {
            rAppID : "2",
            ServiceType : "RAN KPI Monitoring Service"
        },
        description : "Provides insight into RAN KPI"
    },
    {
        name : "RAN Performance",
        rappSchema : {
            rAppID : "2",
            ServiceType : "RAN KPI Monitoring Service"
        },
        description : "Provides insight into RAN KPI"
    },
    {
        name : "RAN Performance",
        rappSchema : {
            rAppID : "2",
            ServiceType : "RAN KPI Monitoring Service"
        },
        description : "Provides insight into RAN KPI"
    },
    {
        name : "RAN Performance",
        rappSchema : {
            rAppID : "2",
            ServiceType : "RAN KPI Monitoring Service"
        },
        description : "Provides insight into RAN KPI"
    },
    {
        name : "RAN Performance",
        rappSchema : {
            rAppID : "2",
            ServiceType : "RAN KPI Monitoring Service"
        },
        description : "Provides insight into RAN KPI"
    }

]




const RApps: React.FC = () => {

        return(
            <div className="container">
                <Sidebar/>
                <div className="main_header_container">
                    <Header titleText="rApps"/>
                    <main className="main_container">
                        <article className={styles.rApps_card_container}>
                            <h1>rApps</h1>
                            <section className={styles.rApps_cards}>
                                <RAppCard data={rAppCardsData}/>
                            </section>
                        </article>

                    </main>
                    
                </div>
            </div>
        )
}

export default RApps;