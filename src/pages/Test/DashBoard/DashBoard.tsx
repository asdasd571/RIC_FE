import Header from "../../../components/Header/Header"

import stytls from "./DashBoard.module.scss";

const DashBoard: React.FC = () => {

        return(
            <div className={stytls.container}> 
                <Header/>
                <div>대시보드 페이지</div>
            </div>
        )
}

export default DashBoard