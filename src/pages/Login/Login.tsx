
import styles from "./Login.module.scss";
import dashboradImg from "../../assets/imgs/dashboardImg.png";
import { useState } from "react";
import useNavigates from "../../hooks/useNavigates";

import eyeOFF from "../../assets/imgs/eyeOFF.svg";
import eyeON from "../../assets/imgs/eyeON.svg";

const Login: React.FC = () => {

        const {goMain} = useNavigates(); // 홈으로 가는 네비게이션 함수.

        const [userName , setUserName] = useState(""); // 유저 id
        const [password, setPassword]  = useState(""); // 유저 비밀번호
        const [isLogin, setIsLogin] = useState(false); // 로그인 상태

        const [isShowPass, setIsShowPass] = useState(false); // 비밀번호 볼건지 안볼건지

        //* 눈버튼 클릭 함수
        const handleShowPass = ():void =>{
            setIsShowPass(!isShowPass); // 반대로 변경!
        }

        //* 로그인하는 함수
        const handleLogin = ():void =>{
             // 로그인 처리 로직을 구현합니다.
            console.log("로그인 실행!",'userName',userName, 'password:',password);
            goMain();
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
                </section>
            </div>
        )
}

export default Login;