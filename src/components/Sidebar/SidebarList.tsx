// SidebarList.tsx
import React from 'react';
import styles from './SidebarList.module.scss';
import { SidebarData } from '../../types/Sidebar.types';




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

const SidebarList: React.FC<SidebarListProps> = ({sidebarDatas}) => (
    <div className={styles.container}>
        {sidebarDatas.map((data, dataIndex) => (
            <section className={styles.nav_section} key={dataIndex}>
                {data.title && <h3 className={styles.nav_title}>{data.title}</h3>}
                <ul className={styles.nav_ul}>
                    {data.items.map((item, itemIndex) => (
                        <li className={styles.nav_item}  key={itemIndex}>
                            <img className={styles.icon} src={item.icon} alt={item.name} />
                            {item.name}
                        </li>
                    ))}
                </ul>
            </section>
        ))}
    </div>
);

export default SidebarList;