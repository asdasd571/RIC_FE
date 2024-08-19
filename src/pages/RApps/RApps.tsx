import Header  from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
// import '../../styles/common.scss';
import styles from "./RApps.module.scss";
import { rAppCardType } from "../../types/RApp.types";
import RAppCard from "./RAppCard/RAppCard";
import defaultAxios from "../../apis/defaultAxios";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react"

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
        }
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
                    {/* <Header titleText="rApps"/> */}
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