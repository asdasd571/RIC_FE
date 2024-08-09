import Header  from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
// import '../../styles/common.scss';
import styles from "./RApps.module.scss";
import { rAppCardType } from "../../types/RApp.types";
import RAppCard from "./RAppCard/RAppCard";
import defaultAxios from "../../apis/defaultAxios";
import { useEffect, useState } from "react";
import axios from "axios";

// 카드 데이터
// const rAppCardsData:rAppCardType[] =  [
//     {
//         name : "Energy Saving",
//         rappSchema : {
//             rAppId : "1",
//             ServiceType : "Network Energy Saving Service"
//         },
//         description : "Turns off cells if the loading is low"
//     },
//     {
//         name : "RAN Performance",
//         rappSchema : {
//             rAppId : "2",
//             ServiceType : "RAN KPI Monitoring Service"
//         },
//         description : "Provides insight into RAN KPI"
//     },
//     {
//         name : "RAN Performance",
//         rappSchema : {
//             rAppId : "2",
//             ServiceType : "RAN KPI Monitoring Service"
//         },
//         description : "Provides insight into RAN KPI"
//     },
//     {
//         name : "RAN Performance",
//         rappSchema : {
//             rAppId : "2",
//             ServiceType : "RAN KPI Monitoring Service"
//         },
//         description : "Provides insight into RAN KPI"
//     },
//     {
//         name : "RAN Performance",
//         rappSchema : {
//             rAppId : "2",
//             ServiceType : "RAN KPI Monitoring Service"
//         },
//         description : "Provides insight into RAN KPI"
//     },
//     {
//         name : "RAN Performance",
//         rappSchema : {
//             rAppId : "2",
//             ServiceType : "RAN KPI Monitoring Service"
//         },
//         description : "Provides insight into RAN KPI"
//     },
//     {
//         name : "RAN Performance",
//         rappSchema : {
//             rAppId : "2",
//             ServiceType : "RAN KPI Monitoring Service"
//         },
//         description : "Provides insight into RAN KPI"
//     }

// ]






const RApps: React.FC = () => {

    //* ========== state ======================= //
    const [rAppList, setrAppList] = useState<rAppCardType[]>([]);

    
    //* ======================================== //
    
    //* ========== API RAPP 데이터 받기 =========*// 

    // rAPP 리스트를 받아오는 부분
    const getrAppList = async (): Promise<void>  => {
        try{
            const url:string = `/rapp`;
            const response = await defaultAxios.get(url);

            setrAppList(response.data); 
            // console.log('성공 /rapp', response.data );
        } catch (error) {
            console.error('오류 발생!',error);
        }// finally {
        //     console.log("항상 실행되는");
        // }        
    }
    //* ======================================== //

    //첫 렌더링시, 실행!
    useEffect(()=>{
        getrAppList(); // rApp 리스트 받아오기.
    },[]);

    
        return(
            <div className="container">
                <Sidebar/>
                <div className="main_header_container">
                    <Header titleText="rApps"/>
                    <main className="main_container">
                        <article className={styles.rApps_card_container}>
                            <h1>rApps</h1>
                            <section className={styles.rApps_cards}>
                                <RAppCard data={rAppList}/>
                            </section>
                        </article>

                    </main>
                    
                </div>
            </div>
        )
}

export default RApps;