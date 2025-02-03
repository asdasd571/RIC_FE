import Sidebar from "../../components/Sidebar/Sidebar"
import styles from "./E2Nodes.module.scss";
import Flow from "./Flow/Flow";

// ! 구조도를 나타내는 부분
const E2Nodes:React.FC = ()=> {
    return(
        <div className="container">        
        <Sidebar/> 
        <div className="main_header_container">
            {/* <Header titleText="Dashboard"/> */}
            <main className="main_container">
            <h1 className="main_title">E2 Nodes</h1>

            <article className={styles.flow_container}>  
                <Flow/>
            </article>

            </main>
        </div>
    </div>

    )
}


export default E2Nodes;