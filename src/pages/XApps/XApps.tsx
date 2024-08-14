import Header  from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
// import '../../styles/common.scss';
import styles from "./XApps.module.scss";
import { XAppCardType } from "../../types/XApp.types";
import XAppCard from "./XAppCard/XAppCard";
import { useEffect, useState } from "react";
import defaultAxios from "../../apis/defaultAxios";


const XApps: React.FC = () => {
    //xapp List를 저장할 state
    const [xAppList, setxAppList] = useState<XAppCardType[]>([]);
        
    //* ========== API XAPP 데이터 받기 =========*// 
    // xAPP 리스트를 받아오는 부분
    const getxAppList = async (): Promise<void>  => {
        try{
            const url:string = `/xapp`;
            const response = await defaultAxios.get(url);

            setxAppList(response.data); 
        } catch (error) {
            console.error('오류 발생!',error);
        }        
    }
    //* ======================================== //

    //첫 렌더링시, 실행!
    useEffect(()=>{
        getxAppList(); // rApp 리스트 받아오기.
    },[]);

        return(
            <div className="container">
                <Sidebar/>
                <div className="main_header_container">
                    <Header titleText="xApps"/>
                    <main className="main_container">
                        <article className={styles.rApps_card_container}>
                            <h1>xApps</h1>
                            <section className={styles.rApps_cards}>
                                <XAppCard data={xAppList}/>
                            </section>
                        </article>

                    </main>
                    
                </div>
            </div>
        )
}

export default XApps;