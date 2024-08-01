import axios from "axios";

// process.env.REACT_APP_DEFAULT_ADDR 

// * axios 인스턴스 생성하기
const defaultAxios = axios.create({
    baseURL: process.env.REACT_APP_DEFAULT_ADDR // 기본 요청 URL 설정.
});

export default defaultAxios;
