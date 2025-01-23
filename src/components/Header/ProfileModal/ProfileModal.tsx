import profileRe from "../../../assets/imgs/profileRe.svg";
import styles from "./ProfileModal.module.scss";
import Swal from "sweetalert2";
import profile from '../../../assets/imgs/profile.svg';
import React, { useEffect, useState } from "react"
import profile_temp from '../../../assets/imgs/profile_temp.svg';
import defaultAxios from "../../../apis/defaultAxios";
import { useAuthStore } from "../../../store/useAuthStore";
import { useNicknameStore } from "../../../store/useNicknameStore";

// * 사용자 프로필모달

const ProfileModal :React.FC = () => {

    //* 전역상태
    const {nickname, storeNickname} = useNicknameStore(); // 유저닉네임 // nickname KSLEE
    const {username, password} = useAuthStore(); //전역 상태로 저장된 값 불러오기

    //* 상태
    // todo : 재랜더링이 너무 잦기 때문에, 추후 방법 생각 
    const [userEmail, setUserEmail] = useState<string>('email@etri.re.kr'); // 유저 이메일 저장
    const [inputNickname, setInputNickname] = useState<string>('etri'); // nickname KSLEE
    //* 상태-프로필모달
    const [isShowProfile, setIsShowProfile] = useState<boolean>(false); // true : 알림창 보임, false : 알림창 끔

    
    // * 사용자 정보 조회 /register GET
    const fetchUserInfo = async (username: string, password: string) =>{
        try{
            // 전역 상태로 쿼리스트링 
            const url = `http://localhost:8080/login/register?username=${username}`;
            const response = await defaultAxios.get(url);

            setUserEmail(response.data.email)
        }catch(error){
            console.log('/register GET ERROR!', error);
        }
    }

    // * 사용자 닉네임 업데이트.
    const handleModifyNickname = (newNickname : string):void =>{
        storeNickname(newNickname);
    }

    // * 사용자 정보 저장 // todo : 후에 patch 
    const handleSavePforile = (e: React.FormEvent<HTMLFormElement>):void =>{
        e.preventDefault(); // 폼의 이벤트 기본 동작 없앰( 새로고침 등)
        // 1. 닉네임 상태 변경
        handleModifyNickname(inputNickname); 

        // 2. 알림창 끄기
        setIsShowProfile(false);

        // 3. 모달 띄우기.
        Swal.fire({
            icon: 'success',
            text: 'Saved successfully.',
        });
    }

    
    //* 프로필모달 -------------------//
    

    //벨 버튼 클릭시 알림 on / off
    const handleShowProfile = ():void =>{
        setIsShowProfile(!isShowProfile); //
    }

     // * 프로필 모달 상태 변화 감지하여 사용자 정보 가져오기
    useEffect(()=>{
        if (isShowProfile && username && password){ // 세개 다 있는 경우만,
            fetchUserInfo(username, password); // 사용자 정보 조회
        }
    },[ isShowProfile]);


    //* 프로필모달끝 -----------------//
    
    return(
        <div className={styles.profile_all_container}>
                <div onClick={handleShowProfile} className={styles.profile}>
                    <span>{nickname}</span>
                    <img  src={profile_temp} alt="프로필 아이콘"/>
                </div>
            {
                isShowProfile === true ?
                <form  className={styles.container} onSubmit={handleSavePforile}>
                    <section>
                        <img src={profile_temp} alt="프로필 이미지 편집"/>
                    </section>
                    <section>
                        <div className={styles.info_container}>
                            <input type="text" 
                                placeholder={inputNickname}
                                aria-label="사용자닉네임" // 시각적요소로 표시되지 않는 텍스트
                                onChange={(e) => setInputNickname(e.target.value)}
                            /> 
                            <p>{userEmail}</p>
                        </div>
                        <button className={styles.btn_save} type="submit">저장하기</button>
                    </section>
                </form>
                :
                null
                
            }
            

            
            
        </div>
    )
}

export default ProfileModal;
