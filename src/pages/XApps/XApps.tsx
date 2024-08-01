import Header  from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
// import '../../styles/common.scss';
import styles from "./XApps.module.scss";
import { rAppCardType } from "../../types/RApp.types";
import RAppCard from "../RApps/RAppCard/RAppCard";

//todo. data랑 모두 갈아야함 임시로 rAPP 띄워둠.


const XApps: React.FC = () => {

        return(
            <div className="container">
                <Sidebar/>
                <div className="main_header_container">
                    <Header titleText="xApps"/>
                    <main className="main_container">
                        <article className={styles.rApps_card_container}>
                            <h1>xApps</h1>
                            <section className={styles.rApps_cards}>
                                <RAppCard />
                            </section>
                        </article>

                    </main>
                    
                </div>
            </div>
        )
}

export default XApps;