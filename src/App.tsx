import React, { useEffect } from 'react';
import logo from './logo.svg';
// import './App.module.scss'; // 연결안됨
import styles from './App.module.scss';

import Test from './pages/Test/Test';
import { Route, Routes } from 'react-router-dom';
import DashBoard from './pages/DashBoard/DashBoard';

function App() {


  // ** =============뷰포트 높이 구하기 ===============** //
  
    /** 현재 뷰포트 높이의 1%를 계산한다. */
    const setVh = (): void => {
      const vh:number = window.innerHeight * 0.01; //window.innerHeight : 뷰포트의 높이를 가져온다. | 뷰포트 높이를 100분의 1로 나누어서 사용하는 것 (1%)
      document.documentElement.style.setProperty('--vh', `${vh}px`); // css 변수를 만들어준다.
    }

    // * 첫 렌더링시, 뷰포트 사이즈 계산 후 적용
    useEffect(()=> {
      setVh();
      
      // 사이즈가 변경될 때, 다시 뷰포트 높이를 구한다.
      const onResize = ():void => {
        setVh();
      }
                              // 이벤트 유형 , 이벤트가 발생할때 실행하는 함수.
      window.addEventListener('resize', onResize);
    },[]);


  // ** ============================================** //

  return (
    <div className={styles.screen}>
      <Routes>
        <Route path="/" element = {<DashBoard/>}/>
        <Route path="/structure" element={<div>구조화면</div>} />

        {/* SMO/OAM */}
        <Route path="/smo-oam" element={<div>smo-oam</div>} />

        {/* Non-RT */}
        <Route path="rapp" element={<div>rapp</div>} />
        <Route path="framework" element={<div>framework</div>} />

        {/* Near-RT */}
        <Route path="xapp" element={<div>xapp</div>} />
        <Route path="platform" element={<div>platform</div>} />

        {/* E2 Node */}
        <Route path="e2-node" element={<div>e2-node</div>} />

        </Routes>
    </div>
  );
}

export default App;
