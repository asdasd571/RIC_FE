
import styles from "./SignUpPage.module.scss";
import dashboradImg from "../../assets/imgs/dashboardImg.png";
import { useState } from "react";
import useNavigates from "../../hooks/useNavigates";

import eyeOFF from "../../assets/imgs/eyeOFF.svg";
import eyeON from "../../assets/imgs/eyeON.svg";
import Swal from "sweetalert2";
import defaultAxios from "../../apis/defaultAxios";

// 회원가입 폼 데이터
interface RegisterDto {
    username: string;
    email: string;
    password: string;
    password2: string;
    
}

const SignUpPage: React.FC = () => {

        const {  goSignUp, goLogin} = useNavigates(); // 홈으로 가는 네비게이션 함수.

        const [userName , setUserName] = useState(""); // 유저 id
        const [password, setPassword]  = useState(""); // 유저 비밀번호
        const [userEmail, setUserEmail] = useState("");
        const [isSignUp, setIsSignUp] = useState(false); // 로그인 상태

        const [isShowPass, setIsShowPass] = useState(false); // 비밀번호 볼건지 안볼건지

        //* 눈버튼 클릭 함수
        const handleShowPass = ():void =>{
            setIsShowPass(!isShowPass); // 반대로 변경!
        }

        //* 로그인하는 함수
        const handleSignUp = async () =>{
             // 로그인 처리 로직을 구현합니다.
            // console.log("회원가입 실행!",'userName',userName, 'password:',password);
            
            // // from에 입력한 데이터
            // const dtoData : RegisterDto = {
            //     username : userName,
            //     email: userEmail,
            //     password: password,
            //     password2: password
            // }            

            // 1. 폼 데이터 세팅
            const formData= new FormData();
            formData.append('username', userName);
            formData.append('email', userEmail);
            formData.append('password', password);
            formData.append('password2', password);

            // 2. API호출  //* 서버로 회원가입 요청
            const url= `/register`;
            try{
                const response = await defaultAxios.post(url,formData); //todo : 회원가입 로직 하기!
                // console.log('/register',response);

                // 3. 성공시 / 실패시 구현
                // 회원가입 성공 시 
                if (response.data.message === "OK"){
                    Swal.fire({
                        icon: 'info',
                        text: '회원가입 되었습니다.',
                    });
                    goLogin();// 로그인 페이지로 이동
                }else { //회원가입 실패시
                    Swal.fire({
                        icon: 'error',
                        text: '회원가입에 실패했습니다.',
                    });

                    // input 초기화
                    setUserName('');
                    setPassword('');
                    setUserEmail('');
                }

    
            }catch(error){ //회원가입 실패시
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    text: '회원가입에 실패했습니다.',
                });

                // input 초기화
                setUserName('');
                setPassword('');
                setUserEmail('');
            }
        } 


        //* 폼 제출 처리 함수
        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault(); // 폼의 이벤트 기본 동작 없앰( 새로고침 등)
            handleSignUp();
        };


        return(
            <div className={styles.container}>
                <section>
                    <img src={dashboradImg} alt="배경이미지"/>
                </section>

                <section>
                    <div className={styles.intro_container}>
                        <h1 className={styles.title} >
                            Sign UP
                        </h1>
                        <div className={styles.description}>
                            Create Your Account
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

                        <input 
                            required
                            maxLength={20}
                            type="text"
                            placeholder="Email"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
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
                            Sign Up</button>
                    </form>

                    <div className={styles.footer_container}>
                        <span className={styles.footer_text}>Already have an account?</span>
                        <button onClick={goLogin} className={styles.btn_sign}>Sign in</button>
                    </div>
                </section>


            </div>
        )
}

export default SignUpPage;