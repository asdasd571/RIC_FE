import React, { useEffect, useState } from 'react'
import { Ellipse,Circle, Map, MapMarker,CustomOverlayMap } from 'react-kakao-maps-sdk' ;
import styles from "./MapView.module.scss";
import styled from 'styled-components';
import cellON from "../../assets/imgs/cellON.svg";
import cellOFF from "../../assets/imgs/cellOFF.svg"
import axios from 'axios';
import defaultAxios from '../../apis/defaultAxios';
import { useQuery } from '@tanstack/react-query';



// 각 마커 이름
const StyledMarkerName = styled.div`
    display: flex;
    align-items: center;

    color: #333333;
    font-size: 0.9rem;
    font-family: 'Pretendard';
    font-weight: bold;
    background-color : #f5f5f57a;
    /* border-radius: 5px; */
    /* border: 1px solid #333333; */
    
    text-align: center;

    position: relative;
    top: 0.9rem;

    padding-right: 2px;
    padding-left: 2px;
    /* background-color: red; */
`;

// network-info 데이터 타입
interface RICData {
    Cell_ID : number;
    Cell_ID_Full: string;
    Num_UE: number;
    State : number;
    Tx_Power: number;
    X_Pos : number;
    Y_Pos : number;
    Z_Pos : number;
}

// * KAKAO 지도를 보여주는 부분.
const MapView : React.FC = () => {

    //* RIC 데이터 받기 , /network-info
    const getRicData = async () => {
        try {
            const url:string = `/network-info`;
            const response = await defaultAxios.get(url);
            return response.data;            
        } catch (error) {
            console.log(error);
        }
    }

    // react-query로 데이터 패칭 및 주기적 업데이트
    const {data: ricData} = useQuery<RICData[]>({
        queryKey: ['ricData'],
        queryFn: getRicData,
        // refetchInterval: 1000 //1초마다 refetch
    })

    return(
        <>
            <Map     //center={{lat: 36.38275, lng: 127.36311 }} />/ (etri 11동 건물 기준)
                center={{ lat: 36.38292, lng: 127.3652 }} // todo : 임시 지도 위치. (셀 가운데)
                style={{ width: "100%", height: "100%" , borderRadius:"10px" }}
            >

            {ricData?.map((ric, index) => (
                <>
                <MapMarker
                    
                    key = {index}
                    position={{lat : ric['Y_Pos'], lng : ric['X_Pos']}} 
                    image={{
                        //마커 이미지 설정
                        src: ric['State'] == 1 ? cellON  : cellOFF, // on : off
                        // 마커 커스텀 이미지 사이즈 지정    
                        size: {
                            width: 30,
                            height: 30,
                            },        
                    }}
                    // 마커의 클릭 버튼
                    onClick={ () => {console.log('lat(Y)',ric['Y_Pos'],'lng (X)',ric['X_Pos'])}}
                >

                {/* <div style={{ color: "#000" }}> */}
                    
                
                {/* </div> */}
                </MapMarker>

                <CustomOverlayMap 
                    position={{ lat: ric['Y_Pos'], lng: ric['X_Pos'] }}
                >
                    <StyledMarkerName>Cell ID: {ric['Cell_ID']}</StyledMarkerName>
                </CustomOverlayMap> 

                
                
                <Circle
                    center={{lat : ric['Y_Pos'], lng : ric['X_Pos']}} 
                    radius={ric['Tx_Power']} // 파워값으로, 반지름
                    strokeWeight={1} // 선의 두께입니다
                    strokeColor={"#FFFFFF"} // 선의 색깔입니다
                    strokeOpacity={2} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                    strokeStyle={"solid"} // 선의 스타일 입니다
                    fillColor={"#ccccccb7"} // 채우기 색깔입니다#C8FFFF
                    fillOpacity={0.7} // 채우기 불투명도 입니다
                />


                </>

            ))}

            </Map>
        

        </>
    )
}

export default MapView;



            // <MapMarker
            //     key={1}
            //     position={{lat: 36.387, lng: 127.349}}
            // ></MapMarker>  
            // <CustomOverlayMap position={{lat: 36.387, lng: 127.349}}>
            //     <StyledMarkerName>Cell_ID: temp </StyledMarkerName>
            // </CustomOverlayMap> 