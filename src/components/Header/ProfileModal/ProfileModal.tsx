import profileRe from "../../../assets/imgs/profileRe.svg";
import styles from "./ProfileModal.module.scss";
import Swal from "sweetalert2";
import profile from '../../../assets/imgs/profile.svg';
import React, { useState } from "react"
import profile_temp from '../../../assets/imgs/profile_temp.svg';

// * 사용자 프로필모달

const ProfileModal :React.FC = () => {


    const handleSavePforile = ():void =>{
        Swal.fire({
            icon: 'info',
            text: '저장 되었습니다.',
        });
    }

    
    //* 프로필모달 -------------------//
    const [isShowProfile, setIsShowProfile] = useState<boolean>(false); // true : 알림창 보임, false : 알림창 끔

    //벨 버튼 클릭시 알림 on / off
    const handleShowProfile = ():void =>{
        setIsShowProfile(!isShowProfile); //
    }
    //* 프로필모달끝 -----------------//
    
    return(
        <div className={styles.profile_all_container}>
                <div onClick={handleShowProfile} className={styles.profile}>
                    <span>김해든</span>
                    <img  src={profile_temp} alt="프로필 아이콘"/>
                </div>
            {
                isShowProfile === true ?
                <div  className={styles.container}>
                    <section>
                        <img src={profileRe} alt="프로필 이미지 편집"/>
                    </section>
                    <section>
                        <div className={styles.info_container}>
                            <input type="text" 
                                placeholder="이름"
                                aria-label="사용자이름" // 시각적요소로 표시되지 않는 텍스트
                            /> 
                            <p>abc123@abc.com</p>
                        </div>
                        <button className={styles.btn_save} onClick={handleSavePforile}>저장하기</button>
                    </section>
                </div>
                :
                null
                
            }
            

            
            
        </div>
    )
}

export default ProfileModal;
