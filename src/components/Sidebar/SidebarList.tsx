// SidebarList.tsx

import React, { useEffect, useState } from 'react';
import styles from './SidebarList.module.scss';
import { SidebarData, SidebarItem, SidebarTitle } from '../../types/Sidebar.types';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import {ReactComponent as Svg} from "../../assets/*.svg";
import defaultAxios from '../../apis/defaultAxios';
import toggleON from '../../assets/imgs/toggleON.svg';
import toggleOFF from '../../assets/imgs/toggleOFF.svg';
import { useSidebarStore } from '../../store/useSidebarStore';

// // 사이드바 리스트 컴포넌트 Props 정의
// interface SidebarListProps {
//     sidebarDatas: SidebarData[];
//     setSidebarDatas : React.Dispatch<React.SetStateAction<SidebarData[]>>;
// }


// 사이드바 리스트 컴포넌트
const SidebarList: React.FC = () => {
    // * 전역 state
    const { sidebarDatas, toggleTitle } = useSidebarStore(); // 사이드바 데이터
    //* 지역 state
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null); // 선택된 사이드바 index

    
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

        if (item.externalUrl) {
            window.open(item.externalUrl, '_blank'); // 외부 링크 열기
        } else if (item.path) {
            navigate(item.path); // 내부 링크 처리
        }
    };
    
    return (
        <div className={styles.container}>
            {sidebarDatas.map((data, dataIndex) => (
                <section className={styles.nav_section} key={dataIndex}>
                    {data.title.name && 
                    <div className={styles.nav_title_container} onClick={()=> toggleTitle(data.title.name as string)}>
                        <h3 className={styles.nav_title}>{data.title.name} 
                        </h3>
                        {  data.title.isToggle != null && <img src={ data.title.isToggle ? toggleON :toggleOFF} alt=''/>    }
                    </div>

                    
                    }

                    <ul className={`${styles.nav_ul} ${data.title.isToggle === true ? styles.toggled : ''}`}>
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
