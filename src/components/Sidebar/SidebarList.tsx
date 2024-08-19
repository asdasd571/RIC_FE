// SidebarList.tsx

import React, { useEffect, useState } from 'react';
import styles from './SidebarList.module.scss';
import { SidebarData, SidebarItem, SidebarTitle } from '../../types/Sidebar.types';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import {ReactComponent as Svg} from "../../assets/*.svg";
import defaultAxios from '../../apis/defaultAxios';


// 사이드바 리스트 컴포넌트 Props 정의
interface SidebarListProps {
    sidebarDatas: SidebarData[];
}

// 사이드바 리스트 컴포넌트
const SidebarList: React.FC<SidebarListProps> = ({ sidebarDatas }) => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const navigate = useNavigate();
    const location = useLocation();

    // *현재 경로에 맞는 메뉴 아이템을 자동으로 선택
    useEffect(() => {
        const currentPath = location.pathname;
        const matchedItem = sidebarDatas
            .flatMap(data => data.items)
            .find(item => item.path === currentPath);
        if (matchedItem) {
            setSelectedIndex(matchedItem.id as number) ;
        }
    }, [location.pathname, sidebarDatas]); // pathname과 sidebarData가 바뀔때마다 실행된다.


    // *사이드바 아이템 클릭 핸들러
    const handleItemClick = (item: SidebarItem) => {
        setSelectedIndex(item.id as number); // 선택된 아이템 index 설정

        // if (item.action === 'logout') { // * 로그아웃 처리
        //     handleLogout();
        // } else 
        if (item.externalUrl) {
            window.open(item.externalUrl, '_blank'); // 외부 링크 열기
        } else if (item.path) {
            navigate(item.path); // 내부 링크 처리
        }
    };

    //* 타이틀 아이템 클릭 핸들러
    const handleTitleClick= (titleItem: SidebarTitle) => {
        if (titleItem.externalUrl) {
            window.open(titleItem.externalUrl, '_blank'); // 외부 링크 열기
        } else if (titleItem.path) {
            navigate(titleItem.path); // 내부 링크 처리
        }
    }

    // *로그아웃 처리
    // const handleLogout = async () => {

    //     //1. 로그아웃 API 호출 
    //     const url=`/logout`; 
    //     try{
    //         const response = await defaultAxios.get(url);
    //         //todo 로그아웃 성공했는지 비교하는 로직도 필요 (api data 추가되면 수정하기, 0812 ) 
    //         Swal.fire({
    //             icon: 'info',
    //             text: '로그아웃 되었습니다.',
    //         });
    //         navigate('/login'); // 로그인 페이지로 이동
    //     } catch(error){
    //         console.error(error);
    //         Swal.fire({
    //             icon: 'error',
    //             text: '로그아웃에 실패했습니다.',
    //         });
    //     }
    //     // console.log('Logging out...');

    // };

    return (
        <div className={styles.container}>
            {sidebarDatas.map((data, dataIndex) => (
                <section className={styles.nav_section} key={dataIndex}>
                    {data.title && 
                    <h3 className={styles.nav_title}
                        onClick={()=> handleTitleClick(data.title)}>{data.title.name}</h3>}
                    <ul className={styles.nav_ul}>
                        {data.items.map((item) => (
                            <li
                                className={`${styles.nav_item} ${selectedIndex === item.id ? styles.clicked : ''}`}
                                key={item.id}
                                onClick={() => handleItemClick(item)}
                            >
                                <img className={styles.icon} 
                                    src={item.icon}
                                />
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </section>
            ))}
        </div>
    );
};

export default SidebarList;
