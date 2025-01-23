export interface settingItem{
    name: string; //이름
    path? : string; // 경로
}


//setting 테이블 데이터
export const settingData: settingItem[] = [
    {
        name: "REACT_APP_DEFAULT_ADDR",
        path: process.env.REACT_APP_DEFAULT_ADDR
    },
    {
        name: "REACT_APP_TS_DM_ADDR",
        path: process.env.REACT_APP_TS_DM_ADDR
    },
    {
        name: "REACT_APP_KAKAO_KEY",
        path: process.env.REACT_APP_KAKAO_KEY
    },
    {
        name: "REACT_APP_SMO_OAM_PATH",
        path: process.env.REACT_APP_SMO_OAM_PATH
    },
    {
        name: "REACT_APP_SME_ADDR_PORT",
        path: process.env.REACT_APP_SME_ADDR_PORT
    },
    {
        name: "REACT_APP_SME_END_POINT",
        path: process.env.REACT_APP_SME_END_POINT
    },
    {
        name: "REACT_APP_DME_ADDR_PORT",
        path: process.env.REACT_APP_DME_ADDR_PORT
    },
    {
        name: "REACT_APP_PMS_ADDR_PORT",
        path: process.env.REACT_APP_PMS_ADDR_PORT
    },
    {
        name: "REACT_APP_ETRI_ES_FE",
        path: process.env.REACT_APP_ETRI_ES_FE
    },
    {
        name: "REACT_APP_PLT_ADDR_PORT",
        path: process.env.REACT_APP_PLT_ADDR_PORT
    },
    {
        name: "REACT_APP_E2_NODE_PATH",
        path: process.env.REACT_APP_E2_NODE_PATH
    },
    {
        name: "REACT_APP_VIAVI_URL",
        path: process.env.REACT_APP_VIAVI_URL
    },
    {
        name: "REACT_APP_INFLUXDB_PATH",
        path: process.env.REACT_APP_INFLUXDB_PATH
    },
    {
        name: "REACT_APP_GRAFANA_PATH",
        path: process.env.REACT_APP_GRAFANA_PATH
    },
    {
        name: "REACT_APP_OVERVIEW_PATH",
        path: process.env.REACT_APP_OVERVIEW_PATH
    },
    {
        name: "REACT_APP_DM_PATH",
        path: process.env.REACT_APP_DM_PATH
    }

]