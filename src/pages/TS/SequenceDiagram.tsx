import React, { useState, useEffect, useRef,forwardRef } from 'react';
import mermaid from 'mermaid';
import { tsDmAxios } from '../../apis/defaultAxios';
import { useQuery } from '@tanstack/react-query';
import { saveAs } from "file-saver";
import axios from 'axios';
import styles from "./SequenceDiagram.module.scss";
import html2canvas from "html2canvas"; // html2canvas 추가

// API 응답 데이터 인터페이스
interface TsData {
  msg: string;
  time: number;
}


// props 타입 정의
interface SequenceDiagramProps {
  chartData: string; // 차트에 넣을 데이터
  setChartData: React.Dispatch<React.SetStateAction<string>>;
}

//! SequenceDiagram (Mermaid)
const SequenceDiagram =
React.forwardRef<HTMLDivElement,SequenceDiagramProps>(( { chartData, setChartData}, ref ) => {
  const chartRef = ref as React.RefObject<HTMLDivElement>; ; // ref를 별칭으로 할당
  const REFRESH_INTERVAL = 1000; // *데이터 요청 주기 (1초)
  // * 최대 라인 수 
  const MAX_LINES = 20; // 최대 라인 수를 20으로 설정 (20줄이 넘어가면 리셋)

  const panelContentsRef = useRef<HTMLDivElement>(null); // panel_contents에 대한 ref. 스크롤 유지를 위함.
  const [scrollPosition, setScrollPosition] = useState(0); // 스크롤 위치 상태


  //* TS 머메이드 데이터 받기.
  const fetchTsData = async () => { 
    try {
        const url: string = `/ts`;
        const response = await tsDmAxios.get(url);
        return response.data;

    } catch (error) {
        console.log(error);
    }
  }

  //* react-query를 사용해 실시간 데이터 패칭 (3초마다 refetch)
  const { data: tsData } = useQuery({
    queryKey: ['tsData'], // 쿼리 키 (캐시 식별용)
    queryFn: fetchTsData, // 데이터를 가져오는 함수
    refetchInterval: REFRESH_INTERVAL, // 3초마다 재요청하여 데이터 갱신
  });

  
  // *tsData가 바뀔 때마다 새로운 데이터를 chartData에 추가
  useEffect(() => {
    // console.log(tsData); // 가져온 데이터 콘솔 출력
    if (tsData && tsData.length > 0) {
      let allMsg = ''; // 메시지들을 누적할 변수
      tsData.forEach((element: TsData) => { // tsData 배열을 순회하며 메시지를 누적
        const newEntry = `${element.msg}\n`; // 새로운 메시지를 문자열로 변환
        allMsg += newEntry; // 메시지 추가
      });

      // *chartData에 메시지 추가, 라인 수가 MAX_LINES를 넘으면 초기화
      setChartData((prevData) => {
        const updatedData = prevData + allMsg; // 새로운 데이터를 이전 데이터에 추가
       
        // * // * 최대 라인 수 넘으면 초기화. (우선은 주석 처리.)
        // const lineCount = updatedData.split('\n').length; // 줄 수를 체크 (개행 문자 기준으로 나누기)
        // if (lineCount > MAX_LINES) { // 줄 수가 20줄을 초과하면
        //   return `sequenceDiagram\n`; // 초기화 (기본 Mermaid 시퀀스 다이어그램 초기 상태)
        // }

        return updatedData; // 줄 수가 20줄 이하이면 그대로 업데이트
      });
    }
  }, [tsData, setChartData]); // tsData 또는 setChartData가 변경되면 실행됨


  //* 컴포넌트가 처음 렌더링될 때 Mermaid 초기화
  useEffect(() => {
    mermaid.initialize({ startOnLoad: true }); // Mermaid 초기화 설정
    setChartData(`sequenceDiagram\n`); // 초기 chartData 설정 (첫 렌더링 시 초기화)
  }, [setChartData]);

  
  //* chartData가 변경될 때마다 Mermaid 렌더링
  useEffect(() => {
    const initializeMermaid = async () => {
      if (chartRef.current && chartData) { // chartData가 있고 chartRef가 존재하는 경우에만 실행
        try {
          // Mermaid 다이어그램을 렌더링하고 HTML에 삽입
          const { svg, bindFunctions } = await mermaid.render('mermaid-diagram-123', chartData); 
          chartRef.current.innerHTML = svg; // 렌더링된 SVG를 chartRef의 innerHTML에 삽입
          bindFunctions?.(chartRef.current); // Mermaid가 필요한 바인딩 함수 적용
        } catch (error) {
          console.error('Mermaid rendering error:', error); // Mermaid 렌더링 오류를 출력
        }
      }

      // *저장된 스크롤 위치로 복원
      if (panelContentsRef.current) {
        panelContentsRef.current.scrollTop = scrollPosition;
      }
    };

    initializeMermaid(); // Mermaid 초기화 및 렌더링 호출


  }, [chartData]); // chartData가 변경될 때마다 렌더링 호출
  

  // * 스크롤 이벤트 핸들러
  const handleScroll = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLDivElement;
    setScrollPosition(target.scrollTop); // 스크롤 위치 업데이트
  }



  return (
    <div className={styles.container} onScroll={handleScroll} ref={panelContentsRef} >
      <div id="123" className={styles.uml_container} ref={chartRef}></div>
    </div>
    
  );
});

export default SequenceDiagram;
