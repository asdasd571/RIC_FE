import Header  from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
// import '../../styles/common.scss';
import stytls from "./DashBoard.module.scss";

const DashBoard: React.FC = () => {

        return(
            <div className="container">
                <Sidebar/>
                <div className="main_header_container">
                    <Header titleText="Dashboard"/>
                    <main className="main_container">
                        
                    </main>
                    
                </div>
            </div>
        )
}

export default DashBoard