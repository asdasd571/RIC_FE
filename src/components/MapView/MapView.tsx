import React from 'react'
import { Ellipse,Circle, Map, MapMarker,CustomOverlayMap } from 'react-kakao-maps-sdk' ;
import styles from "./MapView.module.scss";
import styled from 'styled-components';


// * KAKAO 지도를 보여주는 부분.
const MapView : React.FC = () => {

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

    return(
        <>
            <Map
                center={{ lat: 36.387, lng: 127.349 }} // 지도 중심 좌표 (etri 11동 건물 기준)
                style={{ width: "100%", height: "100%" , borderRadius:"10px" }}
            >
            <MapMarker
                key={1}
                position={{lat: 36.387, lng: 127.349}}
            ></MapMarker>  
            <CustomOverlayMap position={{lat: 36.387, lng: 127.349}}>
                <StyledMarkerName>Cell_ID: temp </StyledMarkerName>
            </CustomOverlayMap> 
            </Map>
        

        </>
    )
}

export default MapView;