import Header from "../../components/Header/Header"
import Sidebar from "../../components/Sidebar/Sidebar"
import styles from "./Structure.module.scss"
import o_ran from "../../assets/imgs/o-ranStructure.png"


const  Structure: React.FC = () => {
    return(
        <div className="container">
            <Sidebar/>
            <div className="main_header_container">
                <Header titleText="구조 화면"/>
                <main className="main_container">
                    <section className={styles.img_section}>
                        <img className={styles.img_o_ran} src={o_ran} alt="o-ran 구조"/>
                    </section>
                    
                </main>
                
            </div>
        </div>
    )
}

export default Structure;