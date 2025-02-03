import { useEffect, useRef, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { DMType, LogType } from "../../types/DM.types";
import styles from "./DM.module.scss";
import Log from "./Log/Log";
import { tsDmAxios } from "../../apis/defaultAxios";
import { useQuery } from "@tanstack/react-query";
import arrow_left from "./imgs/arrow_left.svg";
import arrow_right from "./imgs/arrow_right.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styled from "styled-components";
import DMSettingModal from "./DMModal/DMSettingModal";
import { _services } from "../../store/useLogCheckBoxStore";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import { MutableRefObject } from "react";
import {CSVLink} from "react-csv";


const DM: React.FC = () => {
  //* 데이터를 저장할 state
  const [logData, setLogData] = useState<LogType[]>([]); // 전체 Log를 저장하는 state
  const [blockNameArr, setBlockNameArr] = useState<string[]>(_services); // 각 블록 이름을 담은 부분
  // todo  : 추후 ALL로 바꿔줘야함.
  // const [blockNameArr, setBlockNameArr] = useState<string[]>(['ALL', ..._services]); // 각 블록 이름을 담은 부분
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false); // * 모달 on off
  const MAX_LINES: number = 500; // 최대 라인 수를 20으로 설정 (20줄이 넘어가면 리셋)

  const REFETCH_INTERVAL = 1000; // *데이터 요청 주기 (1초)

  const logRef = useRef<HTMLTableElement>(null); // * DM 저장을 위한 ref

  // *refresh 버튼 클릭 시 chartData 초기화
  const handleRefresh = () => {
    setLogData([]);
  };

  // * 데이터 쿼리 ===================//
  // * dm log 데이터 fetch
  const fetchDmData = async () => {
    const url: string = `http://localhost:8080/agent/dm`;
    const response = await tsDmAxios.get(url);
    return response.data;
  };

  //* react-query를 활용한 1초 단위 데이터 호출 (DM 데이터)
  const { data: dmData } = useQuery({
    queryKey: ["dmData"],
    queryFn: fetchDmData,
    refetchInterval: REFETCH_INTERVAL,
  });

  //* 데이터를 반들때마다 log 출력
  useEffect(() => {
    console.log(dmData);
    // console.log(logData);
    if (dmData?.length > 0) {
      setLogData((prevLogData) => {
        // * 데이터가 MAX_LINES개 이상이면 초기화 (일단 주석 처리 ) ------ //
        // if (prevLogData.length + dmData.length > MAX_LINES) {
        //     return []; // 초기화
        // }

        // * ----------------------------------------------------------- //
        return [...prevLogData, ...dmData]; // 이전 데이터 + 현재 데이터
      });
    }
  }, [dmData]);

  // todo location이 바뀌면 초기화되게 해야.
  //* 첫 렌더링시, log 초기화
  useEffect(() => {
    setLogData([]);
  }, []);
  // * =============================//

  //* 슬라이더 세팅
  const settings = {
    dots: true,
    infinite: false, // 슬라이드 무한
    speed: 500,
    slidesToShow: 4, //페이지당 보여줄 것
    slidesToScroll: 4, //스크롤 한번 넘길 때 보여줄 것
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  // * 슬라이더 버튼 세팅--------------------------------------//
  // Define styled components for the arrows
  const ArrowButton = styled.span<{ direction: "left" | "right" }>`
    background-image: url(${(props) => props.direction === "left" ? arrow_left : arrow_right});
    position: absolute;
    width: 40px;
    height: 40px;
    top: 45%;
    cursor: pointer;
    ${(props) =>
      props.direction === "left" ? "left: -40px;" : "right: -40px;"}
  `;

  // * 오른쪽 버튼
  function SampleNextArrow(props: any) {
    const { onClick } = props;
    return <ArrowButton direction="right" onClick={onClick} />;
  }

  // * 오른쪽 왼쪽 버튼
  function SamplePrevArrow(props: any) {
    const { onClick } = props;
    return <ArrowButton direction="left" onClick={onClick} />;
  }
  // * 슬라이더 버튼 세팅 끝--------------------------------------//

  // * setting 모달
  // * modal 열기
  const handleModalOpen = (): void => {
    setModalIsOpen(true);
  };
  // * modal 닫기
  const handleModalClose = (): void => {
    setModalIsOpen(false);
  };

  // *------------------//

  // * save 버튼 ------- ///

  // todo : save 추후 개발 완료
  //* save 버튼 클릭시, 현재 사진 저장
  // * ref를 인자로 받는다.
  // const handleSave = async (ref: MutableRefObject<HTMLTableElement | null>) => {
  //   if (!ref.current) return;

  //   try {
  //     const panel = ref.current;
  //     const canvas = await html2canvas(panel, {
  //       scale: 2, // 캡처 해상도를 2배로 높임 (선택 사항)
  //       height: panel.scrollHeight, // 전체 스크롤 길이만큼 캡처
  //       width: panel.scrollWidth, // 전체 너비 설정
  //       useCORS: true, // CORS 문제 방지 (이미지 외부 로딩 시)
  //     });

  //     // 이미지 저장
  //     canvas.toBlob((blob) => {
  //       if (blob !== null) {
  //         saveAs(blob, "Diagnostic Monitor.png");
  //       }
  //     });
  //   } catch (error) {
  //     console.error("Error converting panel to image:", error);
  //   }
  // };



  //* save 버튼 클릭시, 현재 csv로 저장하기 
  function toCsv(input:LogType) {
    return `${input.time},${input.vendor},${input.block},${input.level},${input.description}\n`
  }
  const handleSave = (logData:LogType[]) => {
    alert("csv저장!");
    // console.log(logData);

    // * String 으로 저장받는 데이터 
    // let logCsvData:string[] = [`time, vendor, block, level, description`]
    // logData.forEach((row) => {
    //   logCsvData.push(toCsv(row));
    // })

    // console.log(logCsvData)

    
    
  }

  // CSV 저장할때 쓸 헤더 (테이블 상단 )
  const csvSaveHeaders = [
    {label:"Time", key:"time"},
    {label:"Vendor", key:"vendor"},
    {label:"Block", key:"block"},
    {label:"Level", key:"level"},
    {label:"Description", key:"description"}
  ]

  // * ---------------- ///
  return (
    <div className="container">
      <Sidebar />
      {modalIsOpen && <DMSettingModal handleModalClose={handleModalClose} />}
      <div className="main_header_container">
        {/* <Header titleText="Dashboard"/> */}
        <main className="main_container">
          <h1 className="main_title">Diagnostic Monitor</h1>

          <article className={styles.DM_container}>
            <section className={styles.btn_container}>
              <button className={styles.btn_setting} onClick={handleModalOpen}>
                setting
              </button>
              {/* // todo save 버튼 개발
               */}
              <CSVLink className={styles.btn_save} data={logData}  separator={", "} filename={"Diagnostic Monitor Log.csv"} headers={csvSaveHeaders} > save</CSVLink>
              
              {/* <button className={styles.btn_save} onClick={()=> handleSave(logRef)}>save</button> */}
              {/* <button className={styles.btn_save} onClick={() => handleSave(logData)}>save</button> */}
              <button className={styles.btn_refresh} onClick={handleRefresh}>
                refresh
              </button>
            </section>
            <section className={styles.log_all_container}>
              <Slider {...settings}>
                {blockNameArr.map(
                  (
                    blockName //block에 맞게 log를 출력한다.
                  ) => (
                    <Log ref={logRef} data={logData} block={blockName} />
                  )
                )}
              </Slider>
            </section>
          </article>
        </main>
      </div>
    </div>
  );
};

export default DM;
