
import styles from "./Sidebar.module.scss";
import etriLogo from "../../assets/imgs/etriLogo.svg";
import SidebarList from "./SidebarList";
import React from "react"
import Minibar from "./Minibar";



// 사이드바 컴포넌트
const Sidebar: React.FC = () => {

    return (
        <nav className={styles.container}>
            <section className={styles.top_container}>
                <img src={etriLogo} alt="ETRI Logo" />
            </section>

            <hr />
            <section className={styles.mini_nav_continaer}>
                <Minibar/>
            </section>
            <section className={styles.nav_container}>
                {/* <SidebarList sidebarDatas={sidebarDatas} setSidebarDatas={setSidebarDatas}/> */}
                <SidebarList/>
            
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


// *사이드바를 나타내는 데이터!
// 사이드바 데이터 정의
// const [sidebarDatas, setSidebarDatas] = useState<SidebarData[]>([
//     {
//         title: {name: null, path: null},
//         items: [
//             { name: 'Dashboard', icon: dashboard, path: '/' , id:0},
            
            
//         ]
//     },
//     {
//         title: {name: 'SMO/OAM', isToggle: false, externalUrl: process.env.REACT_APP_SMO_OAM_PATH},
//         items: [
//             { name: 'SMO/OAM', icon: smo_oam, externalUrl: process.env.REACT_APP_SMO_OAM_PATH ,id:3}
//         ]
//     },
//     {
//         title: {name:'Non-RT-RIC', isToggle: false, path:'/rapp'},
//         items: [
//             { name: 'rApps', icon: rapp, path: '/rapp' , id:4},
//             { name: 'Framework', icon: framework, path: '/framework' ,id:5}
//         ]
//     },
//     {
//         title: {name:'Near-RT-RIC', isToggle: false, path:'/xapp'},
//         items: [
//             { name: 'xApps', icon: xapp, path: '/xapp' ,id:6},
//             { name: 'Platform', icon: platform, path: '/platform' , id:7}
//         ]
//     },
//     {
//         title: {name:'E2 Node',  isToggle: false,externalUrl :process.env.REACT_APP_E2_NODE_PATH},
//         items: [
//             { name: 'E2 Node', icon: e2node, externalUrl: process.env.REACT_APP_E2_NODE_PATH ,id:8}
//         ]
//     },
//     {
//         title: {name:'Utilities', isToggle: false,externalUrl: process.env.REACT_APP_VIAVI_URL} ,
//         items: [
//             { name: 'VIAVI', icon: VIAVI, externalUrl: process.env.REACT_APP_VIAVI_URL ,id:9},
//             { name: 'InfluxDB', icon: influxdb, externalUrl: process.env.REACT_APP_INFLUXDB_PATH,id:10 },
//             { name: 'Grafana', icon: grafana, externalUrl: process.env.REACT_APP_GRAFANA_PATH ,id:11 }
//         ]
//     },
//     {
//         title: { name: null, externalUrl: process.env.REACT_APP_OVERVIEW_PATH },
//         items: [
//             { name: 'Overview', icon: structure, externalUrl: process.env.REACT_APP_OVERVIEW_PATH  , id:1},
//             { name: 'DM', icon: log, externalUrl: process.env.REACT_APP_DM_PATH  ,id:2 }
//         ]
//     }
// ]);
