
import styles from "./Login.module.scss";
import dashboradImg from "../../assets/imgs/dashboardImg.png";
import { useState } from "react";
import useNavigates from "../../hooks/useNavigates";

import eyeOFF from "../../assets/imgs/eyeOFF.svg";
import eyeON from "../../assets/imgs/eyeON.svg";
import Swal from "sweetalert2";
import defaultAxios from "../../apis/defaultAxios";
import React from "react"
import { useAuthStore } from "../../store/useAuthStore";

const Login: React.FC = () => {

        const {goMain,  goSignUp} = useNavigates(); // 홈으로 가는 네비게이션 함수.

        const [userName , setUserName] = useState(""); // 유저 id
        const [password, setPassword]  = useState(""); // 유저 비밀번호

        const [isShowPass, setIsShowPass] = useState(false); // 비밀번호 볼건지 안볼건지

        //* 눈버튼 클릭 함수
        const handleShowPass = ():void =>{
            setIsShowPass(!isShowPass); // 반대로 변경!
        }

        //* 로그인하는 함수 (id : admin, password : admin)
        const handleLogin = async () => {            
            // 1. 폼 데이터 세팅
            const formData = new FormData();
            formData.append('username', userName); 
            formData.append('password',password);

            // 2. 로그인 API 호출
            const url=`/login`;

            try{
                const response = await defaultAxios.post(url, formData);
                
                //2-1. 성공시/실패시 호출 
                // 로그인 성공시,
                if (response.data.message === "Login OK"){
                    const { storeLogin } = useAuthStore.getState(); // storeLogin 함수 가져오기
                    storeLogin(userName, password); // 상태 업데이트
                    goMain(); //main 페이지로 이동
                } else { // 로그인 실패시  
                    Swal.fire({
                        icon:'error',
                        text:'Login failed.' // 로그인에 실패했습니다.
                    });
                }

                
            }catch(error){
                console.error(error);
                Swal.fire({
                    icon:'error',
                    text:'Login failed.' // 로그인에 실패했습니다.
                })
            }
        } 



        //* 폼 제출 처리 함수
        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault(); // 폼의 이벤트 기본 동작 없앰( 새로고침 등)
            handleLogin();
        };


        return(
            <div className={styles.container}>
                <section>
                    <img src={dashboradImg} alt="배경이미지"/>
                </section>

                <section>
                    <div className={styles.intro_container}>
                        <h1 className={styles.title} >
                            Welcome!
                        </h1>
                        <div className={styles.description}>
                            Sign in to your account to access<br/>
                            the O-RAN Dashboard!
                        </div>
                    </div>

                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <input 
                            required
                            maxLength={20}
                            type="text"
                            placeholder="UserName"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            />

                        <div className={styles.pass_container}>
                            <input 
                                required
                                maxLength={30}
                                type={isShowPass ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                />
                            <img 
                                className={styles.img_eye}
                                onClick={handleShowPass}
                                src={isShowPass ? eyeON : eyeOFF}/>
                            
                        </div>

                        <button 
                            className={styles.btn_submit}
                            type="submit"
                        >
                            Login</button>
                    </form>

                    <div className={styles.footer_container}>
                        <span className={styles.footer_text}>Don't have an account?</span>
                        <button onClick={goSignUp} className={styles.btn_sign}>Sign up</button>
                    </div>
                </section>


            </div>
        )
}

export default Login;