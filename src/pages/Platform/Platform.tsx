import Header  from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
// import '../../styles/common.scss';
import styles from "./Platform.module.scss";
import FrameworkCard from "../Framework/FrameworkCard/FrameworkCard";
import { FrameworkCardType } from "../../types/Framework.types";

//todo Platoformdp 맞게 데이터, 컴포넌트 변경해야함.
//todo 일단 Framework 카드 그대로 들고옴 !
const Platform: React.FC = () => {

        return(
            <div className="container">
                <Sidebar/>
                <div className="main_header_container">
                    <Header titleText="Platform"/>
                    <main className="main_container">
                        <article className={styles.framework_card_container}>
                            <h1>Platform</h1>
                            <section className={styles.framework_cards}>
                                <FrameworkCard/>
                            </section>
                        </article>
                    </main>
                    
                </div>
            </div>
        )
}

export default Platform;