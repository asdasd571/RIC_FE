// SidebarList.tsx
import React from 'react';
import styles from './SidebarList.module.scss';
import { SidebarData, SidebarItem } from '../../types/Sidebar.types';
import { useNavigate } from 'react-router-dom';




//props에는 sidebar 데이터 모음이 있다. 아래와 같은 형식으로,,

// export const sidebarData: SidebarData[] = [
//     {
//         title: null,
//         items: [
//             { name: '대시보드', icon: dashboard },
//             { name: '구조화면', icon: structure }
//         ]
//     },
    

// 사이드바 List를 넣어주는 Props
interface SidebarListProps {
    sidebarDatas: SidebarData[];
}



const SidebarList: React.FC<SidebarListProps> = ({ sidebarDatas }) => {
    const navigate = useNavigate();

    const handleItemClick = (item: SidebarItem) => {
        if (item.action === 'logout') { //로그아웃시
            handleLogout();
        } else if (item.externalUrl) {
            window.open(item.externalUrl, '_blank'); // 외부 링크 새 창에서 열기
        } else if (item.path) {
            navigate(item.path); // 내부 링크 처리
        }
    };

    //* 로그아웃 로직 
    const handleLogout = () => {
        // 로그아웃 로직
        console.log("Logging out...");
        // 실제 로그아웃 후 네비게이션
        navigate('/login'); // 예를 들어, 로그인 페이지로 이동
    };

    return (
        <div className={styles.container}>
            {sidebarDatas.map((data, dataIndex) => (
                <section className={styles.nav_section} key={dataIndex}>
                    {data.title && <h3 className={styles.nav_title}>{data.title}</h3>}
                    <ul className={styles.nav_ul}>
                        {data.items.map((item, itemIndex) => (
                            <li
                                className={styles.nav_item}
                                key={itemIndex}
                                onClick={() => handleItemClick(item)}
                            >
                                <img className={styles.icon} src={item.icon} alt={item.name} />
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