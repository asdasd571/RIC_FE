import Header  from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
// import '../../styles/common.scss';
import styles from "./Framework.module.scss";
import FrameworkCard from "./FrameworkCard/FrameworkCard";
import { FrameworkCardType } from "../../types/Framework.types";
import { useEffect, useState } from "react";
import defaultAxios from "../../apis/defaultAxios";


const Framework: React.FC = () => {

    //* ========== state ======================= //
    const [FrameworkList, setFrameworkList] = useState([]);


    //* ======================================== //
    
    //* ========== API RAPP 데이터 받기 =========*// 

    // rAPP 리스트를 받아오는 부분
    const getFrameworkList = async (): Promise<void>  => {
        try{
            const url:string = `/rblock`;
            const response = await defaultAxios.get(url);

            setFrameworkList(response.data); 
            // console.log('성공 /rblock', response.data );
        } catch (error) {
            console.error('오류 발생!',error);
        }    
    }
    //* ======================================== //

    //첫 렌더링시, 실행!
    useEffect(()=>{
        getFrameworkList(); // rApp 리스트 받아오기.
    },[]);


        return(
            <div className="container">
                <Sidebar/>
                <div className="main_header_container">
                    <Header titleText="Non-RT RIC Framework"/>
                    <main className="main_container">
                        <article className={styles.framework_card_container}>
                            <h1>Non-RT RIC Framework Blocks</h1>
                            <section className={styles.framework_cards}>
                                <FrameworkCard data={FrameworkList}/>
                            </section>
                        </article>
                    </main>
                    
                </div>
            </div>
        )
}

export default Framework;