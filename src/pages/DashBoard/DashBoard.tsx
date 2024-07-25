import Header  from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

import stytls from "./DashBoard.module.scss";

const DashBoard: React.FC = () => {

        return(
            <div className={stytls.container}>
                <Sidebar/>
                <main className={stytls.main_container}>
                    <Header/>
                </main>
                
            </div>
        )
}

export default DashBoard