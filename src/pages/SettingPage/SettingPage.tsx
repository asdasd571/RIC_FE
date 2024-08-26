import React from "react"
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./SettingPage.module.scss";
import Swal from "sweetalert2";
import useNavigates from "../../hooks/useNavigates";
import defaultAxios from "../../apis/defaultAxios";
import { useAuthStore } from "../../store/useAuthStore";
import { settingData } from "./settingData";

const Setting: React.FC = () => {
    const {goLogin} = useNavigates();
    const {username, password, storeLogout} = useAuthStore();

        
        //* 삭제 API 호출
        // 1. localstorage로부터 id, password를 받으온다.
        //2. api를 호출한다.
        const fetchDeletUser = async (username : string, password: string) =>{
            //1. 폼 데이터 세팅 
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);

            //2. 회원탈퇴 API 호출
            const url=`/deregister`;
            try{
                const response = await defaultAxios.delete(url, { data: formData});

                // 성공 시, // todo : 나중에 message는 바뀔 수 있다.
                if (response.data.message === "Delete OK") {
                    storeLogout();/// 회원탈퇴 진행

                    // * 탈퇴 성공시. 
                    Swal.fire({
                        icon:'success',
                        text:'Account successfully deleted.'
                    });
    
                    goLogin(); // 홈화면으로 이동
                }else{
                    // * 탈퇴 실패시. 
                    Swal.fire({
                        icon:'error',
                        text: response.data.message
                    });
                }


            }catch(error){
                console.error(error);
                // * 탈퇴 실패시. 
                Swal.fire({
                    icon:'error',
                    text:'Failed to delete account.'
                });
            }

        }
        
        //* 삭제버튼 클릭시 핸들러. 
        const handleDeleteUser = () => {
            Swal.fire({
                icon:'warning',
                text: 'Are you sure you want to delete your account? This action cannot be undone.',
                showCancelButton: true,
                confirmButtonText: 'yes',
                cancelButtonText: 'no',
                confirmButtonColor: '#429f50',
                cancelButtonColor: '#d33',
            }).then(result =>{ // 회원 탈퇴시
                if (result.isConfirmed){
                    fetchDeletUser(username as string, password as string); //로그아웃 API 호출
                }else if (result.isDismissed){ // 탈퇴 안한다고 한다면,
                    Swal.fire({
                        icon:'info',
                        text:'Cancelled.'
                    })
                }
            });
        }
        return(
            <div className="container">
                <Sidebar/>
                <div className="main_header_container">
                    <main className="main_container">
                        <article className={styles.setting_container}>
                            <h1>Setting</h1>
                            {/* 회원 탈퇴*/}
                            <button 
                                className={styles.btn_delete_user}
                                onClick={handleDeleteUser}>Delete Account</button>
                            <section>
                                
                            <table>
                                <thead>
                                    <th>이름</th>
                                    <th>URL</th>
                                </thead>
                                <tbody>
                                    {/* 해당 object의 title을 찾은 뒤 인덱스를 반환한다. 그것을 토대로 화면에 띄워준다. */}
                                    {settingData.map((item, index) => (
                                        <tr>
                                            <td>{item.name}</td>
                                            <td>path (나중엔 보이게)</td> 
                                            {/* //! cetting url 나중엔 보여지게. */}
                                            {/* <td>{item.path}</td> */}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            </section>
                        </article>

                    </main>
                    
                </div>
            </div>
        )
}

export default Setting;