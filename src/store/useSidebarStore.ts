import { create } from "zustand";
import dashboard from "../assets/imgs/dashboard.svg";
import structure from "../assets/imgs/structure.svg";
import smo_oam from "../assets/imgs/smo_oam.svg";
import rapp from "../assets/imgs/rapp.svg";
import framework from "../assets/imgs/framework.svg";
import xapp from "../assets/imgs/xapp.svg";
import platform from "../assets/imgs/platform.svg";
import e2node from "../assets/imgs/e2node.svg";
import viavi from "../assets/imgs/viavi.svg";
import VIAVI from "../assets/imgs/VIAVI.png";
import influxdb from "../assets/imgs/influxdb.svg";
import setting from "../assets/imgs/setting.svg";
import logout from "../assets/imgs/logout.svg";
import grafana from "../assets/imgs/grafana.svg";
import log from "../assets/imgs/log.svg";
import ts from "../assets/imgs/ts.svg";
import { SidebarData } from "../types/Sidebar.types";

// 전역 상태 인터페이스
interface SidebarStore {
  sidebarDatas: SidebarData[]; // 사이드바 데이터 정보
  toggleTitle: (titleName: string) => void; //title toggle을 수정하는 부분
}

// *사이드바를 나타내는 데이터!
// 사이드바 데이터 정의
const sidebarDatas: SidebarData[] = [
  {
    title: { name: null, path: null },
    items: [{ name: "Dashboard", icon: dashboard, path: "/" }],
  },
  {
    title: {
      name: "SMO/OAM",
      isToggle: false,
      externalUrl: process.env.REACT_APP_SMO_OAM_PATH,
    },
    items: [
      {
        name: "SMO/OAM",
        icon: smo_oam,
        externalUrl: process.env.REACT_APP_SMO_OAM_PATH,
      },
    ],
  },
  {
    title: { name: "Non-RT RIC", isToggle: false, path: "/rapp" },
    items: [
      { name: "rApps", icon: rapp, path: "/rapp" },
      { name: "Framework", icon: framework, path: "/framework" },
    ],
  },
  {
    title: { name: "Near-RT RIC", isToggle: false, path: "/xapp" },
    items: [
      { name: "xApps", icon: xapp, path: "/xapp" },
      { name: "Platform", icon: platform, path: "/platform" },
    ],
  },
  {
    title: {
      name: "E2 Nodes",
      isToggle: false,
      externalUrl: process.env.REACT_APP_E2_NODE_PATH,
    },
    items: [
      // { name: 'E2 Node', icon: e2node, externalUrl: process.env.REACT_APP_E2_NODE_PATH },
      { name: "E2 Nodes", icon: e2node, path: "/e2-nodes" },
    ],
  },
  {
    title: {
      name: "Utilities",
      isToggle: false,
      externalUrl: process.env.REACT_APP_VIAVI_URL,
    },
    items: [
      {
        name: "VIAVI",
        icon: VIAVI,
        externalUrl: process.env.REACT_APP_VIAVI_URL,
      },
      {
        name: "InfluxDB",
        icon: influxdb,
        externalUrl: process.env.REACT_APP_INFLUXDB_PATH,
      },
      {
        name: "Grafana",
        icon: grafana,
        externalUrl: process.env.REACT_APP_GRAFANA_PATH,
      },
      { name: "Performance", icon: structure, path: "/performance" },
      { name: "DM", icon: log, path: "/dm" },
      { name: "TS", icon: ts, externalUrl: "http://129.254.220.111:10005/ts" },
    ],
  },
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
}));
