import { useEffect, useState } from "react";
import Header  from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
// import '../../styles/common.scss';
import styles from "./Platform.module.scss";
import PlatformCard from "./PlatformCard/PlatformCard";
import defaultAxios from "../../apis/defaultAxios";
import React from "react"

//todo Platoformdp 맞게 데이터, 컴포넌트 변경해야함.
//todo 일단 Framework 카드 그대로 들고옴 !
const Platform: React.FC = () => {
    //* ========== state ======================= //
    const [platformList, setPlatformList] = useState([]);
    //* ======================================== //
    
    //* ========== API RAPP 데이터 받기 =========*// 

    // rAPP 리스트를 받아오는 부분
    const getPlatformList = async (): Promise<void>  => {
        try{
            const url:string = `/xblock`;
            const response = await defaultAxios.get(url);
            setPlatformList(response.data); 
        } catch (error) {
            console.error('오류 발생!',error);
        }    
    }
    //* ======================================== //

    //첫 렌더링시, 실행!
    useEffect(()=>{
        getPlatformList(); // rApp 리스트 받아오기.
    },[]);


        return(
            <div className="container">
                <Sidebar/>
                <div className="main_header_container">
                    {/* <Header titleText="Platform"/> */}
                    <main className="main_container">
                        <article className={styles.framework_card_container}>
                            <h1>Platform</h1>
                            <section className={styles.framework_cards}>
                                <PlatformCard data={platformList}/>
                            </section>
                        </article>
                    </main>
                    
                </div>
            </div>
        )
}

export default Platform;