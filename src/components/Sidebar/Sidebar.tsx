
import styles from "./Sidebar.module.scss";
import etriLogo from "../../assets/imgs/etriLogo.svg";
import SidebarList from "./SidebarList";


import dashboard from "../../assets/imgs/dashboard.svg"
import structure from "../../assets/imgs/structure.svg"
import smo_oam from "../../assets/imgs/smo_oam.svg"
import rapp from "../../assets/imgs/rapp.svg"
import framework from "../../assets/imgs/framework.svg"
import xapp from "../../assets/imgs/xapp.svg"
import platform from "../../assets/imgs/platform.svg"
import e2node from "../../assets/imgs/e2node.svg"
import viavi from "../../assets/imgs/viavi.svg"
import VIAVI from "../../assets/imgs/VIAVI.png";
import influxdb from "../../assets/imgs/influxdb.svg"
import setting from "../../assets/imgs/setting.svg"
import logout from "../../assets/imgs/logout.svg"
import { SidebarData } from "../../types/Sidebar.types";
import useNavigates from "../../hooks/useNavigates";


// 사이드바를 나타내는 데이터!
// 사이드바 데이터 정의
export const sidebarDatas: SidebarData[] = [
    {
        title: null,
        items: [
            { name: '대시보드', icon: dashboard, path: '/' },
            { name: '구조화면', icon: structure, path: '/structure' }
        ]
    },
    {
        title: 'SMO/ OAM',
        items: [
            { name: 'SMO/OAM', icon: smo_oam, path: '/smo-oam' }
        ]
    },
    {
        title: 'Non-RT',
        items: [
            { name: 'rAPP 관리', icon: rapp, path: '/rapp' },
            { name: 'Framework 관리', icon: framework, path: '/framework' }
        ]
    },
    {
        title: 'Near-RT',
        items: [
            { name: 'xAPP 관리', icon: xapp, path: '/xapp' },
            { name: 'Platform 관리', icon: platform, path: '/platform' }
        ]
    },
    {
        title: 'E2Node',
        items: [
            { name: 'E2Node', icon: e2node, path: '/e2-node' }
        ]
    },
    {
        title: '외부연결',
        items: [
            { name: 'VIAVI', icon: VIAVI, externalUrl: 'https://naver.com' },
            { name: 'InfluxDB', icon: influxdb, externalUrl: 'https://naver.com' }
        ]
    },
    {
        title: null,
        items: [
            { name: '설정', icon: setting, path: '/setting' },
            { name: '로그아웃', icon: logout, action: 'logout' } // 로그아웃 처리}
        ]
    }
];


// 사이드바 컴포넌트
const Sidebar: React.FC = () => {
    return (
        <nav className={styles.container}>
            <section className={styles.top_container}>
                <img src={etriLogo} alt="ETRI Logo" />
            </section>

            <hr />

            <section className={styles.nav_container}>
                <SidebarList sidebarDatas={sidebarDatas}/>
            </section>
        </nav>
    );
};



export default Sidebar;


//* 추가 설명.
// ...item이란,
// 아래와 같이 작성할 수 있지만 불필요하게 긴 코드가 됨
{/* <SidebarItem
    key={itemIndex}
    name={item.name}
    icon={item.icon}
/> */}

//dlrjfkd rkxek.