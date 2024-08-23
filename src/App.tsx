import React, { useEffect } from 'react';
import styles from './App.module.scss';

import { Route, BrowserRouter as Router, Routes, useLocation, useNavigate } from 'react-router-dom';
import DashBoard from './pages/DashBoard/DashBoard';
import Login from './pages/Login/Login';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import Test from './pages/Test/Test';
import RApps from './pages/RApps/RApps';
import Framework from './pages/Framework/Framework';
import Overview from './pages/Overview/Overview';
import XApps from './pages/XApps/XApps';
import Platform from './pages/Platform/Platform';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Setting from './pages/SettingPage/SettingPage';
import { useAuthStore } from './store/useAuthStore';
import useNavigates from './hooks/useNavigates';
import Swal from 'sweetalert2';


function App() {
  //* 전역 상태
  const {isLogin, initializeAuthState} = useAuthStore( state => ({
    isLogin: state.isLogin,
    initializeAuthState : state.initializeAuthState
  }))


  // * 선언
  const { goLogin } = useNavigates(); // 네비게이트 함수 
  const location = useLocation(); //현재 위치 구하기.
  

  // ** =============뷰포트 높이 구하기 ===============** //
  /** 현재 뷰포트 높이의 1%를 계산한다. */
  const setVh = () => {
    const vh = window.innerHeight * 0.01; // window.innerHeight : 뷰포트의 높이를 가져온다. | 뷰포트 높이를 100분의 1로 나누어서 사용하는 것 (1%)
    document.documentElement.style.setProperty('--vh', `${vh}px`); // css 변수를 만들어준다.
  };

  // * 첫 렌더링시, 뷰포트 사이즈 계산 후 적용
  useEffect(() => {
    setVh();

    // 사이즈가 변경될 때, 다시 뷰포트 높이를 구한다.
    const onResize = () => {
      setVh();
    };
    window.addEventListener('resize', onResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // ** ============================================** //

  //* react-query
  const queryClient = new QueryClient({
    defaultOptions:{
      queries:{
        refetchInterval : 1000, // *기본 refetchInterval 설정(1초)
      }
    }
  });


  // * 첫 실행 시 로컬스토리지와 토큰 가져와 전역 상태와 동기화.
  useEffect(()=>{
    initializeAuthState();
    // useAuthStore.getState().initializeAuthState(); // 상태 초기화.
  },[initializeAuthState]);

  
  //! 경로 변경마다 로그인 상태 판단하여 로그인 안되어있으면 login 페이지로 이동. --------//
  //! 로그인이 안됐을때 다른페이지에 가도록 적용하시려면, 해당 주석을 푸시면 됩니다. 
  useEffect(()=>{

    // *초기화 중이거나, 이미 로그인 페이지에 있거나, 회원가입 페이지에 있는 경우엔 아무 작업 안 함
    if (isLogin === null || ['/login', '/sign-up'].includes(location.pathname)) {
        return;
    }

    // *ㅑ로그인 페이지, 회원가입 페이지가 아니고 and 로그인 상태가 false이면? -> login 페이지로 이동!
    if (!isLogin && !['/login', '/sign-up'].includes(location.pathname)){
      Swal.fire({
        icon : "info",
        title: 'Please Log In',
        text: 'You need to log in to access this feature. Please log in to continue.', //이 기능을 사용하려면 로그인이 필요합니다. 계속하려면 로그인해 주세요.
        didClose: () => { // 닫힌 후에 실행.
          goLogin(); // '닫기' 버튼 클릭 시 , 로그인 페이지로 이동
        }
      })
    }
  },[location.pathname, isLogin]);
  //! -------------------------------------------------------------------------------//

  // 로그인 부분 나타냄.
  return (
    <QueryClientProvider client={queryClient}>
      {/* 기본적으로 개발 도구가 열려 있도록 설정한다. */}
      {/* <ReactQueryDevtools initialIsOpen={false}/>      */}
        <div className={styles.screen}>
            <Routes>
              <Route path="/" element={<DashBoard />} />
              <Route path="/overview" element={<Overview/>} />
              <Route path="/smo-oam" element={<div>smo-oam</div>} />
              <Route path="/rapp" element={<RApps/>} />
              <Route path="/framework" element={<Framework/>} />
              <Route path="/xapp" element={<XApps/>} />
              <Route path="/platform" element={<Platform/>} />
              <Route path="/e2-node" element={<div>e2-node</div>} />
              <Route path="/setting" element={<Setting/>} />
              <Route path="/login" element={<Login/>}/>
              <Route path="/sign-up" element={<SignUpPage/>}/>
              <Route path="*" element={<div>404 Not Found Page</div>}/>
              <Route path="/test" element={<Test/>}/>
            </Routes>
          
        </div>
    </QueryClientProvider>
  ); 
}


export default App;