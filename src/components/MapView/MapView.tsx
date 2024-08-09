import React, { useEffect, useState } from 'react'
import { Ellipse,Circle, Map, MapMarker,CustomOverlayMap } from 'react-kakao-maps-sdk' ;
import styles from "./MapView.module.scss";
import styled from 'styled-components';
import cellON from "../../assets/imgs/cellON.svg";
import cellOFF from "../../assets/imgs/cellOFF.svg"
import axios from 'axios';
import defaultAxios from '../../apis/defaultAxios';



// 각 마커 이름
const StyledMarkerName = styled.div`
    display: flex;
    align-items: center;

    color: #000;
    /* font-weight: bold; */
    /* position: relative; */
    font-size: 0.9rem;
    /* background-color: white; */
    background-color : rgba(255, 255, 255, 0.5);
    /* opacity: 50%; */
    border-radius: 10px;
    
    text-align: center;

    position: relative;
    top: 0.9rem;

    padding-right: 2px;
    padding-left: 2px;
    /* background-color: red; */
`;

// * KAKAO 지도를 보여주는 부분.
const MapView : React.FC = () => {


        //========= 상태 ==============//
    // 위치 정보를 받아옵니당
    const [ricData, setRicData] = useState([]);
    //=============================//

    //* RIC 데이터 받기 , /network-info
    const getRicData = async () => {
        try {

            const url:string = `/network-info`;
            const response = await defaultAxios.get(url);
            
            // 성공 핸들링
            setRicData(response.data);
            // console.log(ricData)
            // console.log('network-info',response.data);
            
        } catch (error) {
            // 실패시 핸들링
            console.log(error);
            // throw error; // 오류를 다시 던져서 호출한 쪽에서 오류 처리 가능
        }
        }

    // useEffect(()=>{
    //     // 설정된 시간 간격마다 setInterval 콜백이 실행된다.
    //     const id = setInterval(()=> {
    //     getRicData();


    //     }, 1000); //n초에 한번씩 실행됨.

    //     return () => clearInterval(id);
    // }, [ ricData]); // ricData는 n초 간격으로 바뀐다.
    //* 첫 렌더링 시 실행
    useEffect(()=>{
        getRicData();
    },[])

    return(
        <>
            <Map     //center={{ lat: 36.38275, lng: 127.3611 }}
                center={{ lat: 36.38275, lng: 127.36311 }} // //todo 임시 좌표 ,위도, 경도 지도 중심 좌표 (etri 11동 건물 기준)
                style={{ width: "100%", height: "100%" , borderRadius:"10px" }}
            >

            {ricData.map((ric, index) => (
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
                    <StyledMarkerName>Cell_ID: {ric['Cell_ID']}</StyledMarkerName>
                </CustomOverlayMap> 

                
                
                <Circle
                    center={{lat : ric['Y_Pos'], lng : ric['X_Pos']}} 
                    radius={ric['Tx_Power']} // 파워값으로, 반지름
                    strokeWeight={2} // 선의 두께입니다
                    strokeColor={"#75B8FA"} // 선의 색깔입니다
                    strokeOpacity={2} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                    strokeStyle={"solid"} // 선의 스타일 입니다
                    fillColor={"#CFE7FF"} // 채우기 색깔입니다
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