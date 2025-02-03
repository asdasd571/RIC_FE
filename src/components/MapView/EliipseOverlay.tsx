
import React, { useEffect, useState } from 'react'
import { Ellipse,Circle, Map, MapMarker,CustomOverlayMap } from 'react-kakao-maps-sdk' ;

import styled from 'styled-components';
import cellON from "../../assets/imgs/cellON.svg";
import cellOFF from "../../assets/imgs/cellOFF.svg"
import axios from 'axios';
import defaultAxios from '../../apis/defaultAxios';
import { useQuery } from '@tanstack/react-query';

import { RICData } from './MapView';
import styles from "./EllipseOverlay.module.scss";

// ! 타원형을 그리는 컴포넌트
interface EllipseOverlayProps {
    ric: RICData;
    level: number; // 줌 레벨 
    }

    //level 2, level 3 

    const EllipseOverlay: React.FC<EllipseOverlayProps> = ({ ric, level }) => {
        const [rotation, setRotation] = useState<number>(ric.Z_Pos|| 0); // 회전 각도 상태 관리, Z_Pos가 없다면 0을 반환한다.
    
        // * 테스트 코드 : 1초에 한번씩 돌게 만든다.
        // useEffect(() => {
        //     const intervalId = setInterval(() => {
        //         setRotation((prevRotation) => (prevRotation + 60) % 360);
        //     }, 1000);
    
        //     return () => {
        //         clearInterval(intervalId);
        //     };
        // }, []);
    
        // *level 2를 기준으로 비율을 유지하면서 level에 따라 자동으로 크기를 조정
        const scaleFactor = Math.pow(2, 2 - level); // level 2에서는 1, level 3에서는 0.5, level 4에서는 0.25
    
        // *level 2를 기준으로 크기를 유지
        const adjustedTxPower = ric.Tx_Power * scaleFactor +5; 
        const adjustedTxPower2 = ric.Tx_Power != 200 ? (ric.Tx_Power * scaleFactor +5) : (ric.Tx_Power * scaleFactor +5) / 2 ; 
        const cellId = 123;

        const getFillColor = (ric: RICData) => {
            const { State, Freq_Band } = ric;
        
            // return State === 1
            //     ? (Freq_Band === 1 ? "#bbdcffb3" : Freq_Band === 2 ? "#CAFFBFb3" : "#FDFFB6b3")
            //     : (Freq_Band === 1 ? "#cccccc6c" : Freq_Band === 2 ? "#90d682b3" : "#c2c48db3");
            return State === 1
                ? (Freq_Band === 1 ? "#C6DEF1b3" : Freq_Band === 2 ? "#C9E4DEb3" : Freq_Band === 3 ? "#FAEDCBb3" : "#33333333")
                : (Freq_Band === 1 ? "#b6c4cfb3" : Freq_Band === 2 ? "#aebfbbb3" : Freq_Band === 3 ? "#d3cab3b3" : "#77777777");
        
        };

        
        ///* cell 마커 크기만큼 조금더하기 (30) 인데, 5만큼 더해줌 
        return (
            <CustomOverlayMap
                position={{ lat: ric.Y_Pos, lng: ric.X_Pos }}
                zIndex={-1} // zindex를 마커보다 뒤로 설정한다.
            >
                <div
                    className={styles.container}
                    style={{
                        position: 'absolute',
                        top: `-${adjustedTxPower * 2 + adjustedTxPower * 0.8}px`,
                        left: `-${adjustedTxPower * 2}px`,
                    }}
                >
                    <svg
                        className={styles.svg_container}
                        width={adjustedTxPower * 4}
                        height={adjustedTxPower * 4}
                        viewBox={`0 0 ${adjustedTxPower * 4} ${adjustedTxPower * 4}`}
                        style={{
                            transform: `rotate(${rotation}deg)`,
                            transformOrigin: "50% 70%", // x, y축 지점을 기준으로 회전
                        }}
                    >
                        <ellipse
                            cx={adjustedTxPower * 2}
                            cy={adjustedTxPower * 2}
                            rx={adjustedTxPower2 / 2} // ! 원래 크기 , 원의 가로 길이! KSLEE
                            // rx={adjustedTxPower / 8} // TODO 얇게만든 크기, 추후 변경하기
                            ry={adjustedTxPower}
                            // ric state, numue에 따라 값이 바뀐다.
                            fill={getFillColor(ric)}
                            stroke="#FFFFFF"
                            strokeWidth="1"
                        />
                        <text
                            x={adjustedTxPower * 2}  // 텍스트의 x 위치
                            y={adjustedTxPower * 2}  // 텍스트의 y 위치
                            textAnchor="middle"      // 텍스트를 가운데 정렬
                            dy=".3em"                // 텍스트가 수직으로 살짝 조정되도록
                            fill="#7d7d7d64"             // 텍스트 색상
                        >
                            {ric.Cell_ID}
                        </text>

                        
                    </svg>
                </div>
            </CustomOverlayMap>
        );
    };
    


export default EllipseOverlay;