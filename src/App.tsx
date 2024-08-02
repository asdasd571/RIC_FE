import React, { useEffect } from 'react';
import styles from './App.module.scss';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
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


function App() {
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

  // 로그인 부분 나타냄.
  return (
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
          <Route path="/setting" element={<div>setting</div>} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/sign-up" element={<SignUpPage/>}/>
          <Route path="*" element={<div>404 Not Found Page</div>}/>
          <Route path="/test" element={<Test/>}/>
        </Routes>
    </div>
  ); 
}


export default App;