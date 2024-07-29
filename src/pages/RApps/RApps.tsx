import Header  from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
// import '../../styles/common.scss';
import stytls from "./rApps.module.scss";

const RApps: React.FC = () => {

        return(
            <div className="container">
                <Sidebar/>
                <div className="main_header_container">
                    <Header titleText="rApps"/>
                    <main className="main_container">
                        <section>
                            <h1>rApps</h1>
                            <div>
                                <div>Energy Sav</div>
                            </div>
                        </section>

                    </main>
                    
                </div>
            </div>
        )
}

export default RApps;