import Swal from 'sweetalert2';
import  { create }  from 'zustand';
import useNavigates from '../hooks/useNavigates';

// * 로그인 부분
interface StoreState {
    isLogin : boolean ; // 로그인 상태정보
    username: string | null; // 사용자 이름 저장
    password: string | null; // 비밀번호 저장
    token: string | null;
    storeLogin: (username: string, password: string, token: string) => void; // 로그인 액션 함수
    storeLogout: () => void; // 로그아웃 액션 함수
    initializeAuthState: () => void; // 초기화 함수 추가
}

//* 토큰 저장 / 삭제 / 조회 
// const getToken = () => {
//     const token = localStorage.getItem('token');
//     return token;
// };
// 로컬 스토리지에서 토큰 가져오기
const getToken = () => {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    const token = localStorage.getItem('token');
    return { username, password , token};
};

// const setToken = (token: string) => {
// localStorage.setItem('token', token);
// };

// todo : 후에 token으로 변경
const setToken = (username:string, password:string, token:string) => {
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    localStorage.setItem('token', token);   // 토큰 저장 
};

const removeToken = () => {
    localStorage.clear();
};


//todo : 로그인 상태와 유저 정보를 저장하는 전역 상태.
// * 로그인 전역 상태 
export const useAuthStore = create<StoreState>((set) => ({
    isLogin : false, // 로그인 상태 null 선언. (isLogin 초기값을 null로 설정: isLogin이 null일 때 초기화가 진행 중)
    username: null, // 초기값 null //todo : 후에 token으로 변경 
    password: null, // 초기값 null
    token: null,

    //* 로그인 진행 함수 (전역변수 지정, localstorage 저장)
    storeLogin: (username: string, password: string, token:string) => {
        set(() => ({
            isLogin : true, 
            username: username , 
            password: password ,
            token: token
        }));
        setToken(username, password,token); // 토큰 저장 //todo : 후에 token으로 변경  
    }, // 로그인 상태로 지정하는 함수
    
    //*로그아웃 상태 (전역변수 비우기, localstorage 삭제)
    storeLogout: () => {
        set(() => ({
            isLogin: false,
            username: null, //todo : 후에 token으로 변경  
            password: null, //logout 상태로 지정
            token: null
        }));

        removeToken(); // 토큰 삭제.
    },

    //* 초기화 함수 (로컬 스토리지에서 토큰 가져와 전역 상태와 동기화)
    initializeAuthState: () => {
        const { username, password, token } = getToken();
        // console.log('응애',username, password, token); // 있는데,,
        if (username && password && token) {
            set(() => ({
                isLogin: true,
                username: username,
                password: password,
                token: token
            }));
        } 
        // ! 로그인이 되어 있지 않은 경우, /login 페이지로 이동한다. --------------//
        else{
            if (!['/login/login', '/sign-up'].includes(window.location.pathname)){
                Swal.fire({
                    icon : "info",
                    title: 'Please Log In',
                    text: 'You need to log in to access this feature. Please log in to continue.', //이 기능을 사용하려면 로그인이 필요합니다. 계속하려면 로그인해 주세요.
                    didClose: () => { // 닫힌 후에 실행.
                      window.location.href = '/login/login'; // '닫기' 버튼 클릭 시 , 로그인 페이지로 이동
                    }
                })
            }
        }
        // ! ----------------------------------------------------------------//
    }
}))


// * 사용법
// const { isLogin, username, password, storeLogin, storeLogout } = useAuthStore();

// 사용 예시 (초기화 호출)
// useAuthStore.getState().initializeAuthState();