
import styles from "./Header.module.scss";

import bellOFF from"../../assets/imgs/bellOFF.svg";
import bellON from"../../assets/imgs/bellON.svg";
import profile from"../../assets/imgs/profile.svg";
import Alarm from "./Alarm/Alarm";
import { useState } from "react";
import ProfileModal from "./ProfileModal/ProfileModal";

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
    const [isShowAlarm, setIsShowAlarm] = useState<boolean>(false); // true : 알림창 보임, false : 알림창 끔

    //벨 버튼 클릭시 알림 on / off
    const handleShowAlarm = ():void =>{
        setIsShowAlarm(!isShowAlarm); //
    }
    //* 알림끝 -----------------//

    //* 프로필모달 -------------------//
    const [isShowProfile, setIsShowProfile] = useState<boolean>(false); // true : 알림창 보임, false : 알림창 끔

    //벨 버튼 클릭시 알림 on / off
    const handleShowProfile = ():void =>{
        setIsShowProfile(!isShowProfile); //
    }
    //* 프로필모달끝 -----------------//

    return(
        <header className={styles.container}> 
            <div className={styles.header_left}>
                <span className={styles.title}> {titleText}</span>
            </div>
            
            <div className={styles.header_right}>

                <img 
                    className={styles.bell}
                    src={bellON}
                    alt="벨"
                    onClick={handleShowAlarm}/>
                { isShowAlarm ? <Alarm/> : <></>}

                <div className={styles.profile}>
                    <span>홍길동</span>
                    <img onClick={handleShowProfile} src={profile} alt="프로필 아이콘"/>
                    { isShowProfile ? <ProfileModal/> : <></>}
                </div>
                

            </div>
        </header>
    )
}


export default Header;