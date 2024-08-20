import profileRe from "../../../assets/imgs/profileRe.svg";
import styles from "./ProfileModal.module.scss";
import Swal from "sweetalert2";
import profile from '../../../assets/imgs/profile.svg';
import React, { useEffect, useState } from "react"
import profile_temp from '../../../assets/imgs/profile_temp.svg';
import defaultAxios from "../../../apis/defaultAxios";
import { useAuthStore } from "../../../store/useAuthStore";

// * 사용자 프로필모달

const ProfileModal :React.FC = () => {
// todo : 재랜더링이 너무 잦기 때문에, 방법 생각 
    const {username, password} = useAuthStore(); //전역 상태로 저장된 값 불러오기
    const [userEmail, setUserEmail] = useState<string>('email@abc.def'); // 유저 이메일 저장
    
    // * 사용자 정보 조회 /register GET
    const fetchUserInfo = async (username: string, password: string) =>{
        try{
            // 전역 상태로 쿼리스트링 
            const url = `/register?username=${username}&password=${password}`;
            const response = await defaultAxios.get(url);

            setUserEmail(response.data.email)
        }catch(error){
            console.log('/register GET ERROR!', error);
        }
    }

    // * 사용자 정보 저장 // todo : 후에 patch 
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

     // * 프로필 모달 상태 변화 감지하여 사용자 정보 가져오기
    useEffect(()=>{
        if (isShowProfile && username && password){ // 세개 다 있는 경우만,
            fetchUserInfo(username, password); // 사용자 정보 조회
        }
    },[ isShowProfile])


    //* 프로필모달끝 -----------------//
    
    return(
        <div className={styles.profile_all_container}>
                <div onClick={handleShowProfile} className={styles.profile}>
                    <span>{username ? username : '김해든'} </span>
                    <img  src={profile_temp} alt="프로필 아이콘"/>
                </div>
            {
                isShowProfile === true ?
                <div  className={styles.container}>
                    <section>
                        <img src={profile_temp} alt="프로필 이미지 편집"/>
                    </section>
                    <section>
                        <div className={styles.info_container}>
                            <input type="text" 
                                placeholder={username ? username : '김해든'}
                                aria-label="사용자이름" // 시각적요소로 표시되지 않는 텍스트
                            /> 
                            <p>{userEmail}</p>
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
