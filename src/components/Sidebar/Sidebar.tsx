
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
import grafana from "../../assets/imgs/grafana.svg";


// 사이드바를 나타내는 데이터!
// 사이드바 데이터 정의
export const sidebarDatas: SidebarData[] = [
    {
        title: null,
        items: [
            { name: 'Dashboard', icon: dashboard, path: '/' , id:0},
            { name: 'Overview', icon: structure, path: '/overview' , id:1}
        ]
    },
    {
        title: 'SMO/ OAM',
        items: [
            { name: 'SMO/OAM', icon: smo_oam, path: '/smo-oam' ,id:2}
        ]
    },
    {
        title: 'Non-RT-RIC',
        items: [
            { name: 'rApps', icon: rapp, path: '/rapp' , id:3},
            { name: 'Framework', icon: framework, path: '/framework' ,id:4}
        ]
    },
    {
        title: 'Near-RT-RIC',
        items: [
            { name: 'xApps', icon: xapp, path: '/xapp' ,id:5},
            { name: 'Platform', icon: platform, path: '/platform' , id:6}
        ]
    },
    {
        title: 'E2 Node',
        items: [
            { name: 'E2 Node', icon: e2node, path: '/e2-node' ,id:7}
        ]
    },
    {
        title: 'Utilities',
        items: [
            { name: 'VIAVI', icon: VIAVI, externalUrl: process.env.REACT_APP_VIAVI_URL ,id:8},
            { name: 'InfluxDB', icon: influxdb, externalUrl: 'https://naver.com',id:9 },
            { name: 'DM', icon: influxdb, externalUrl: 'https://naver.com',id:10 },
            { name: 'Grafana', icon: grafana, externalUrl: 'https://naver.com',id:11 }
        ]
    },
    {
        title: null,
        items: [
            { name: 'Settings', icon: setting, path: '/setting' ,id:12},
            { name: 'Log out', icon: logout, action: 'logout' , id:13} // 로그아웃 처리}
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