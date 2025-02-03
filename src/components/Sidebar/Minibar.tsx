
import setting from '../../assets/imgs/setting.svg';
import logout from '../../assets/imgs/logout.svg';
import profile from '../../assets/imgs/profile.svg';
import ProfileModal from '../Header/ProfileModal/ProfileModal';
import { AlarmData } from "../../types/Alarm.types";
import { useEffect, useState } from 'react';
import defaultAxios from '../../apis/defaultAxios';
import Alarm from '../Header/Alarm/Alarm';
import styles from './Minibar.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuthStore } from '../../store/useAuthStore';
import useNavigates from '../../hooks/useNavigates';

const Minibar:React.FC= () =>{
    // * 전역 상태 --------------//
    const {isLogin, storeLogout} = useAuthStore();

    //* hook
    const {goLogin} = useNavigates();

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
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const navigate = useNavigate();
    const location = useLocation();


    //* 클릭 시 색상 변경 핸들러 -------- */
    const handleItemClick = (index: number) => {
        setSelectedIndex(index);
    }

    // *현재 경로에 맞는 메뉴 아이템을 자동으로 선택
    useEffect(() => {
        if (location.pathname === "/setting") {
            handleItemClick(0);
        } else if( location.pathname ==="/login/logout"){
            handleItemClick(1);
            
        }
    }, [location.pathname]); // pathname과 sidebarData가 바뀔때마다 실행된다.

    //* setting 클릭 핸들리 -------- */
    const handleSetting = () => {
        navigate('/setting');
    }

    // *로그아웃 처리 핸들러 -------- */ 
    // todo : 후에 로그아웃 핸들러로 변경.
    const handleLogout = async () => {
        storeLogout(); // todo  후에 handleLogout으로 변경
        Swal.fire({
            icon: 'success',
            text: 'Logged out successfully.',
        });
        goLogin(); // todo  후에 handleLogout으로 변경

                    

        // //1. 로그아웃 API 호출 
        // const url=`/login/logout`; 
        // try{
        //     const response = await defaultAxios.get(url);
        //     //todo 로그아웃 성공했는지 비교하는 로직도 필요 (api data 추가되면 수정하기, 0812 ) 
        //     // storeLogout(); // 로그아웃 진행 (토큰 삭제, 전역 상태)
            
        //     Swal.fire({
        //         icon: 'info',
        //         text: 'Logged out successfully.',
        //     });
        //     navigate('/login/login'); // 로그인 페이지로 이동
        // } catch(error){
        //     console.error(error);
        //     Swal.fire({
        //         icon: 'error',
        //         text: 'Logout failed.',
        //     });
        // }
        // console.log('Logging out...');
    };
        
    return(
        <div className= {styles.container}>
            <div 
                className= {`${styles.item} ${selectedIndex === 0 ? styles.clicked : ''}` } 
                onClick={() =>{
                    handleItemClick(0);
                    handleSetting();
                }}>
                <img className= {styles.icon} src={setting} alt='setting'/>
            </div>
            <div 
                className= {`${styles.item} ${selectedIndex === 1 ? styles.clicked : ''}`} 
                onClick={()=>{
                    handleLogout(); //todo 후에 이걸로 사용

                    handleItemClick(1);
                    }}>
                <img className= {styles.icon} src={logout} alt='logout'/>
            </div>
            <div className= {styles.item}>
                <Alarm data={alarmDatas}/>
            </div>
            
            <div className= {styles.item}>
                <ProfileModal/>
            </div>

            

        </div>)
}



export default Minibar;