import { create } from 'zustand';
import dashboard from "../assets/imgs/dashboard.svg"
import structure from "../assets/imgs/structure.svg"
import smo_oam from "../assets/imgs/smo_oam.svg"
import rapp from "../assets/imgs/rapp.svg"
import framework from "../assets/imgs/framework.svg"
import xapp from "../assets/imgs/xapp.svg"
import platform from "../assets/imgs/platform.svg"
import e2node from "../assets/imgs/e2node.svg"
import viavi from "../assets/imgs/viavi.svg"
import VIAVI from "../assets/imgs/VIAVI.png";
import influxdb from "../assets/imgs/influxdb.svg"
import setting from "../assets/imgs/setting.svg"
import logout from "../assets/imgs/logout.svg"
import grafana from "../assets/imgs/grafana.svg";
import log from "../assets/imgs/log.svg";
import { SidebarData } from '../types/Sidebar.types';





// 전역 상태 인터페이스
interface SidebarStore {
    sidebarDatas : SidebarData[]; // 사이드바 데이터 정보
    toggleTitle: (titleName: string) => void; //title toggle을 수정하는 부분

}

// *사이드바를 나타내는 데이터!
// 사이드바 데이터 정의
const sidebarDatas :SidebarData[] =[
    {
        title: {name: null, path: null},
        items: [
            { name: 'Dashboard', icon: dashboard, path: '/' , id:0},
            
            
        ]
    },
    {
        title: {name: 'SMO/OAM', isToggle: false, externalUrl: process.env.REACT_APP_SMO_OAM_PATH},
        items: [
            { name: 'SMO/OAM', icon: smo_oam, externalUrl: process.env.REACT_APP_SMO_OAM_PATH ,id:3}
        ]
    },
    {
        title: {name:'Non-RT-RIC', isToggle: false, path:'/rapp'},
        items: [
            { name: 'rApps', icon: rapp, path: '/rapp' , id:4},
            { name: 'Framework', icon: framework, path: '/framework' ,id:5}
        ]
    },
    {
        title: {name:'Near-RT-RIC', isToggle: false, path:'/xapp'},
        items: [
            { name: 'xApps', icon: xapp, path: '/xapp' ,id:6},
            { name: 'Platform', icon: platform, path: '/platform' , id:7}
        ]
    },
    {
        title: {name:'E2 Node',  isToggle: false,externalUrl :process.env.REACT_APP_E2_NODE_PATH},
        items: [
            { name: 'E2 Node', icon: e2node, externalUrl: process.env.REACT_APP_E2_NODE_PATH ,id:8}
        ]
    },
    {
        title: {name:'Utilities', isToggle: false,externalUrl: process.env.REACT_APP_VIAVI_URL} ,
        items: [
            { name: 'VIAVI', icon: VIAVI, externalUrl: process.env.REACT_APP_VIAVI_URL ,id:9},
            { name: 'InfluxDB', icon: influxdb, externalUrl: process.env.REACT_APP_INFLUXDB_PATH,id:10 },
            { name: 'Grafana', icon: grafana, externalUrl: process.env.REACT_APP_GRAFANA_PATH ,id:11 }
        ]
    },
    {
        title: { name: null, externalUrl: process.env.REACT_APP_OVERVIEW_PATH },
        items: [
            { name: 'Overview', icon: structure, externalUrl: process.env.REACT_APP_OVERVIEW_PATH  , id:1},
            { name: 'DM', icon: log, externalUrl: process.env.REACT_APP_DM_PATH  ,id:2 }
        ]
    }
];


// * 사이드바 데이터 전역상태 관리.
export const useSidebarStore = create<SidebarStore>((set) => ({
    sidebarDatas: sidebarDatas,
    toggleTitle: (titleName: string) =>
        set((state) => ({
            sidebarDatas: state.sidebarDatas.map((data) => {
                if (data.title.name === titleName) {
                return {
                    ...data,
                    title: {
                    ...data.title,
                    isToggle: !data.title.isToggle,
                    },
                };
                }
                return data;
            }),
        })),
}))