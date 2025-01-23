import React, { useEffect, useRef, useState } from "react";
import {
  ZoomControl,
  Ellipse,
  Circle,
  Map,
  MapMarker,
  CustomOverlayMap,
} from "react-kakao-maps-sdk";
import styles from "./MapView.module.scss";
import styled from "styled-components";
import cellON from "../../assets/imgs/cellON.svg";
import cellOFF from "../../assets/imgs/cellOFF.svg";
import axios from "axios";
import defaultAxios from "../../apis/defaultAxios";
import { useQuery } from "@tanstack/react-query";
import EllipseOverlay from "./EliipseOverlay";

// 각 마커 이름
const StyledMarkerName = styled.div`
  @font-face {
    font-family: "Pretendard-Medium";
    src: url("https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Medium.woff")
      format("woff");
    font-weight: 500;
    font-style: normal;
  }

  display: flex;
  align-items: center;

  color: #333333;
  font-size: 0.9rem;
  font-family: "Pretendard-Medium";
  font-weight: bold;
  /* background-color : #f5f5f57a; */
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
export interface RICData {
  Cell_ID: number;
  Cell_ID_Full: string;
  Freq_Band: number;
  State: number;
  Tx_Power: number;
  X_Pos: number;
  Y_Pos: number;
  Z_Pos: number;
}

// * KAKAO 지도를 보여주는 부분.
const MapView: React.FC = () => {
  const mapRef = useRef<kakao.maps.Map>(null); // Map 인스턴스를 참조하기 위한 useRef
  const DEFAULT_MAP_LEVEL:number = 3;
  const DEFAULT_MAP_CENTER =  {lat: 36.38292, lng: 127.3652}
  const [zoomLevel, setZoomLevel] = useState<number>(DEFAULT_MAP_LEVEL); // 기본 줌 레벨
  const [mapCenter, setMapCenter] = useState( DEFAULT_MAP_CENTER)//지도 위치 및 부드럽게 이동 수정 
  
  
  // window.kakao. 일케 쓰면 됨
  //* RIC 데이터 받기 , /network-info
  const getRicData = async () => {
    try {
      const url: string = `/network-info`;
      const response = await defaultAxios.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  // react-query로 데이터 패칭 및 주기적 업데이트
  const { data: ricData } = useQuery<RICData[]>({
    queryKey: ["ricData"],
    queryFn: getRicData,
    // refetchInterval: 1000 //1초마다 refetch
  });


  const GoOriginalMapCenterButton = () => {
      // * 클릭시 지도 원본 중심 좌표와 비율로 이동 
    const handleGoOriginalMapCenter = () => {
      setZoomLevel(DEFAULT_MAP_LEVEL); // TODO 두개 동시에 이동시키도록 해야함. 가끔 하나만 설정되기 때문이다 
      setMapCenter(DEFAULT_MAP_CENTER); 
    }


    //* 클릭시 원래 좌표로 이동합니다.
    return <button title="Click to go back to the original coordinates." className={styles.btn_goOriginalMapCenter} onClick={handleGoOriginalMapCenter}>
      Go Center
    </button>
  }

  useEffect(()=>{
    console.log(mapCenter);
  },[mapCenter])

  return (
    <>
      <GoOriginalMapCenterButton/>  
      <Map //center={{lat: 36.38275, lng: 127.36311 }} />/ (etri 11동 건물 기준) center={{ lat: 36.38292, lng: 127.3652 }}
        center={mapCenter} // todo : 임시 지도 위치. (셀 가운데)
        onCenterChanged={(map) => { // *지도 위치 변경 시 이벤트 처리, center 위치를 바꾸고, 적용한다. 
          const latlng = map.getCenter();
          const level = map.getLevel();
          setMapCenter({lat:latlng.getLat(), lng: latlng.getLng(),});
          setZoomLevel(level);
        }}
        isPanto={false} // 지도 위치 변경시 panto(부드럽게이동) 이용할지에 대해 정의 
        style={{ width: "100%", height: "100%", borderRadius: "10px", position:"relative"}}
        ref={mapRef} // Map 인스턴스를 참조
        level={zoomLevel} // 줌레벨, 3으로 설정 
        zoomable={true}
        onZoomChanged={() => {
          // * 줌 레벨 얻기.
          // console.log(zoomLevel);
          if (mapRef.current) {
            // Kakao Map API의 인스턴스에 접근
            const currentMap = mapRef.current;
            if (currentMap) {
              const currentZoom = currentMap.getLevel(); // 현재 줌 레벨 가져오기
              setZoomLevel(currentZoom); // 상태 업데이트
            }
          }
        }}
        // maxLevel={2} // 최대 축소  (커지는거)
        // minLevel={4} // 최소 확대 (작아지는거)
      >

        
        {/* 지도 줌 가능 컨트롤러 */}
        <ZoomControl position={"RIGHT"} />

        {ricData?.map((ric, index) => (
          <>
            <MapMarker
              key={index}
              position={{ lat: ric["Y_Pos"], lng: ric["X_Pos"] }}
              image={{
                //마커 이미지 설정
                src: ric["State"] === 1 ? cellON : cellOFF, // on : off
                // 마커 커스텀 이미지 사이즈 지정
                size: {
                  width: 30,
                  height: 30,
                },
              }}
              // 마커의 클릭 버튼
              onClick={() => {
                console.log("lat(Y)", ric["Y_Pos"], "lng (X)", ric["X_Pos"]);
              }}
            >
              {/* <div style={{ color: "#000" }}> */}

              {/* </div> */}
            </MapMarker>

            <CustomOverlayMap
              position={{ lat: ric["Y_Pos"], lng: ric["X_Pos"] }}
            >
              <StyledMarkerName>
                {" "}
                {/* ric['Cell_ID'] Cell ID KSLEE*/}
              </StyledMarkerName>
            </CustomOverlayMap>

            <div
              style={{
                position: "relative",
                top: "0px", // y축 반지름만큼 이동한다.
                left: "0px",
              }}
            >
              {
                // * todo : Z_pos 값에 따라 원 / 타원 표시
                ric.Z_Pos === 360 ? ( // ric.Z_Pos 각도가 360이라면, 원 표시
                  <Circle
                    center={{ lat: ric["Y_Pos"], lng: ric["X_Pos"] }}
                    radius={ric["Tx_Power"]} // 파워값으로, 반지름
                    strokeWeight={1} // 선의 두께입니다
                    strokeColor={"#FFFFFF"} // 선의 색깔입니다
                    strokeOpacity={2} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                    strokeStyle={"solid"} // 선의 스타일 입니다
                    // state에 따라 Circle 배경 색 변경.
                    fillColor={ric["State"] === 1 ? "#bbdcffb3" : "#cccccc6c"} // 채우기 색깔입니다#C8FFFF
                    // #59A5F5 # #ec7779
                    fillOpacity={0.7} // 채우기 불투명도 입니다
                  />
                ) : ric.Z_Pos >= 0 && ric.Z_Pos < 360 ? ( // Z_Pos 각도가 0 ~ 359라면, 타원으로 표시
                  <EllipseOverlay ric={ric} level={zoomLevel} />
                ) : null
              }

              {/* <Circle
                                center={{lat : ric['Y_Pos'], lng : ric['X_Pos']}} 
                                radius={ric['Tx_Power']} // 파워값으로, 반지름
                                strokeWeight={1} // 선의 두께입니다
                                strokeColor={"#FFFFFF"} // 선의 색깔입니다
                                strokeOpacity={2} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                                strokeStyle={"solid"} // 선의 스타일 입니다
                                // state에 따라 Circle 배경 색 변경.
                                fillColor={ric['State'] === 1 ? "#bbdcffb3" :"#cccccc6c"} // 채우기 색깔입니다#C8FFFF
                                // #59A5F5 # #ec7779
                                fillOpacity={0.7} // 채우기 불투명도 입니다
                            /> */}

              {/* 줌 레벨도 같이 넘겨준다. */}
              {/* <EllipseOverlay ric={ric} level={zoomLevel}/>    */}
            </div>

            {/* 
                    <Ellipse
                    
                        center={{lat : ric['Y_Pos'], lng : ric['X_Pos']}}
                        rx={14}
                        ry={24}
                        strokeWeight={1} // 선의 두께입니다
                        strokeColor={"#FFFFFF"} // 선의 색깔입니다
                        strokeOpacity={2} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                        strokeStyle={"solid"} // 선의 스타일 입니다
                        // state에 따라 Circle 배경 색 변경.
                        fillColor={ric['State'] === 1 ? "#bbdcffb3" :"#cccccc6c"} // 채우기 색깔입니다#C8FFFF
                        // #59A5F5 # #ec7779
                        fillOpacity={0.7} // 
                        />  */}
          </>
        ))}
      </Map>
    </>
  );
};

export default MapView;

// <MapMarker
//     key={1}
//     position={{lat: 36.387, lng: 127.349}}
// ></MapMarker>
// <CustomOverlayMap position={{lat: 36.387, lng: 127.349}}>
//     <StyledMarkerName>Cell_ID: temp </StyledMarkerName>
// </CustomOverlayMap>
