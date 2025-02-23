
import styles from "./Header.module.scss";

import bellOFF from"../../assets/imgs/bellOFF.svg";
import bellON from"../../assets/imgs/bellON.svg";
import profile from"../../assets/imgs/profile.svg";
import Alarm from "./Alarm/Alarm";
import { useEffect, useState } from "react";
import ProfileModal from "./ProfileModal/ProfileModal";
import { AlarmData } from "../../types/Alarm.types";
import defaultAxios from "../../apis/defaultAxios";
import React from "react"

interface HeaderProps  {
    titleText?: string; // titleText, 선택적 속성
}

/**
 * `Header` 컴포넌트는 페이지의 상단 헤더를 렌더링합니다.
 * 
 * @param {HeaderProps} props - 컴포넌트에 전달되는 props
 * @param {string} [props.titleText="DashBoard"] - 제목 텍스트. 제공되지 않으면 기본값 "DashBoard"가 사용됩니다.
 * 
 * @returns {JSX.Element} - 렌더링된 헤더 요소
 */
const Header : React.FC<HeaderProps> = ( {titleText = "DashBoard"}) => {

    //* 알림 -------------------//
    const [alarmDatas, setAlarmDatas] = useState<AlarmData[]>([]); // 알림데이터

    
    // 알림 alarm 리스트 데이터를 받아오는 부분
    const getAlarmDatas = async (): Promise<void>  => {
        try{
            const url:string = `http://localhost:8080/alarm`;
            const response = await defaultAxios.get(url);

            setAlarmDatas(response?.data); 
            // console.log('성공 /alarm', response.data );
        } catch (error) {
            console.error('오류 발생!',error);
        }     
    }

        //첫 렌더링시, 실행!
        useEffect(()=>{
            getAlarmDatas(); // rApp 리스트 받아오기.
        },[]);
    

    //* 알림끝 -----------------//

    return(
        <header className={styles.container}> 
            <div className={styles.header_left}>
                <span className={styles.title}> {titleText}</span>
            </div>
            
            <div className={styles.header_right}>
                <Alarm data={alarmDatas}/>

                <ProfileModal/>
                

            </div>
        </header>
    )
}


export default Header;