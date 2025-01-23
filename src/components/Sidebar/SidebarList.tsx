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

// 사이드바 리스트 컴포넌트
const SidebarList: React.FC = () => {
    // * 전역 state
    const { sidebarDatas, toggleTitle } = useSidebarStore(); // 사이드바 데이터
    
    const navigate = useNavigate();
    const location = useLocation();


    // *사이드바 아이템 클릭 핸들러
    const handleItemClick = (item: SidebarItem) => {
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
                        <h3 className={styles.nav_title}>{data.title.name} </h3>
                        {  data.title.isToggle != null && <img src={ data.title.isToggle ? toggleON :toggleOFF} alt=''/>    }
                    </div>

                    
                    }

                    <ul className={`${styles.nav_ul} ${data.title.isToggle === true ? styles.toggled : ''}`}>
                        {data.items.map((item) => (
                            <li
                                className={`
                                    ${styles.nav_item} 
                                    ${location.pathname === item.path ? styles.clicked : ''} 
                                    ${item.name === 'Dashboard' ? styles.nav_item_dashboard : ''}
                                    `}
                                onClick={() => handleItemClick(item)}
                            >
                                <img className={styles.icon} 
                                    src={item.icon}
                                    alt='icon'
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
