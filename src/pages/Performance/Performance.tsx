import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./Performance.module.scss";
import o_ran from "../../assets/imgs/o-ranStructure.png";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Panel from "../../components/Panel/Panel";

import Dropdown from "../../components/Dropdown/Dropdown";
import CustomValueCard from "./CustomValueCard/CustomValueCard";
import CompareCard from "./CompareCard.tsx/CompareCard";
import MCharts from "../../components/Charts/MCharts";

import settingImg from "../../assets/imgs/setting.svg";
import Modal from "../../components/Modal/Modal";
import { ModalProps } from "../../types/Modal.types";
import ViewKpiTable from "./KpiModalInner/ViewKpiTable/ViewKpiTable";
import {
  fetchFileNamesData,
  fetchKpiData,
  fetchKpiItemsData,
  fetchTimeSeriesKpiData,
} from "../../apis/performanceApis";
import { useQuery } from "@tanstack/react-query";
import {
  FileNames,
  KpiData,
  KpiItems,
  TimeSeriesKpiData,
} from "../../types/apis.types";
import { DropdownProps } from "../../types/Dropdown.types";
import { MChartsProps } from "../../types/Chart.types";
import { chartColors } from "../../utils/chartColors";
import KpiModalInner from "./KpiModalInner/KpiModalInner";
import Swal from "sweetalert2";
import { testTimeSeriesKpiChartData } from "./testTimeSeriesKpiChartData";

// * AI/ML 성능 결과를 그래프로 표시하는 페이지
const Performance: React.FC = () => {
  // * 데이터 패칭
  const [fileNamesData, setFileNamesData] = useState<FileNames>({
    filename: [""],
  }); // 선택된 파일 이름
  const [kpiItemsData, setKpiItemsData] = useState<KpiItems>({ items: [""] }); // 선택할 수 있는 KPI Items들 데이터
  const [timeSeriesKpiItemsData, setTimeSeriesKpiItemsData] = useState<KpiItems>({ items: [""] }); // 선택할 수 있는 tiem Series KPI Items들 데이터

  const [kpiData, setKpiData] = useState<KpiData[]>();
  const [timeSeriesKpiData, setTimeSeriesKpiData] =
    useState<TimeSeriesKpiData[]>();

  //* 선택된 Dropdown 메뉴
  // 드롭다운 선택 file
  const [selectedFile1Value, setSelectedFile1Value] = useState<string>("");
  const [selectedFile2Value, setSelectedFile2Value] = useState<string>("");

  //* kpi 쪽에서 보여줄 파일 이름들
  const [viewFileNames, setViewFileNames] = useState<string[]>(["", ""]);

  // *첫 렌더링시, /items (선택 목록), /fileNames 파일 목록 받아오기
  const fetchFileNamesAndKpiItemsData = async () => {
    try {
      const fileNames = await fetchFileNamesData();
      setFileNamesData(fileNames);

      //* 처음 filename 드롭다운 세팅
      setSelectedFile1Value(fileNames.filename[0]);
      setSelectedFile2Value(fileNames.filename[0]);

      //* kpi 드롭다운 메뉴 설정
      const kpiItems = await fetchKpiItemsData('kpi');
      const timeSerieskpiItems = await fetchKpiItemsData('kpits');
      setKpiItemsData(kpiItems);
      setTimeSeriesKpiItemsData(timeSerieskpiItems);

      setSelectedKpiSettingModalValue(kpiItems.items[0]);
      setSelectedTimeKpiSettingModalValue(timeSerieskpiItems.items[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFileNamesAndKpiItemsData();
  }, []);

  // * 파일 선택 ============================================== //

  //* file 목록 받아오기.

  // TODO 버튼 클릭했을 때, 클릭된 파일 API 요청 , /kpis, compare 요청해서 데이터 띄워주기
  const handleFileSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 폼의 이벤트 기본 동작 없앰( 새로고침 등)

    try {
      // TODO /compare 요청

      Swal.fire({
        icon: "success",
        title: "",
        text: `비교할 파일이 저장되었습니다.\n
                - ${selectedFile1Value} \n
                - ${selectedFile2Value} `,
      });
      // 3. 데이터 요청 (병렬로 처리)
      const [kpiData, timeSeriesKpiData] = await Promise.all([
        fetchKpiData(),
        fetchTimeSeriesKpiData(),
      ]);

      // 4. 상태 업데이트
      setKpiData(kpiData);
      setTimeSeriesKpiData(timeSeriesKpiData);
      setViewFileNames([selectedFile1Value, selectedFile2Value]);
    } catch (error) {
      console.error(error);
    }
  };

  // * ============================================================== //

  // * 모달 띄우기 =================================================== //
  const [isKpiSettingModalOpen, setIsKpiSettingModalOpen] = useState(false); // kpi 모달
  const [isTimeKpiSettingModalOpen, setIsTimeKpiSettingModalOpen] =
    useState(false); // Time Series Kpi 모달

  //* Add Item 할때 선택된 DropwDown Item 값
  const [selectedKpiSettingModalValue, setSelectedKpiSettingModalValue] =
    useState<string>(kpiItemsData.items[0]);

  const [
    selectedTimeKpiSettingModalValue,
    setSelectedTimeKpiSettingModalValue,
  ] = useState<string>(timeSeriesKpiItemsData.items[0]);

  //* KPI TableView , Time Series KPI Table View 데이터 상태
  const [kpiTableViewData, setKpiTableViewData] = useState<string[]>([]);
  const [tiemSeriesKpiTableViewData, setTiemSeriesKpiTableViewData] = useState<
    string[]
  >([]);

  //* on/off 될 때 kpi로 변경
  // *KpiSettingModalOpen on/off될때, 현재 보고 있는 KPI 데이터 확인
  useEffect(() => {
    if (kpiData && isKpiSettingModalOpen === true) {
      setKpiTableViewData(kpiData.map((kpi) => kpi.item));
    }
  }, [kpiData, isKpiSettingModalOpen]); // KpiData가 변경될 때 동기화

  // *TiemKpiSettingModal이 on/off될때 현재 보고 있는 KPI 데이터 확인
  useEffect(() => {
    if (timeSeriesKpiData && isTimeKpiSettingModalOpen === true) {
      setTiemSeriesKpiTableViewData(timeSeriesKpiData.map((kpi) => kpi.item));
    }
  }, [timeSeriesKpiData, isTimeKpiSettingModalOpen]); // KpiData가 변경될 때 동기화

  //* 모달 Open, OFF 함수
  const kpiSettingModalOpen = () => {
    setIsKpiSettingModalOpen(true);
  };

  const kpiSettingModalClose = () => {
    setIsKpiSettingModalOpen(false);
  };

  const timeKpiSettingModalOpen = () => {
    setIsTimeKpiSettingModalOpen(true);
  };

  const timeKpiSettingModalClose = () => {
    setIsTimeKpiSettingModalOpen(false);
  };

  //* KPI 세팅
  const kpiModalSettings: ModalProps = {
    isOpen: isKpiSettingModalOpen,
    handleModalClose: kpiSettingModalClose,
    title: "KPI Selection",
    innerComponent: (
      <KpiModalInner
        kpiTableViewData={kpiTableViewData}
        setKpiTableViewData={setKpiTableViewData}
        kpiSelectData={{
          options: kpiItemsData?.items,
          selectedValue: selectedKpiSettingModalValue,
          setSelectedValue: setSelectedKpiSettingModalValue,
        }}
        handleModalClose={kpiSettingModalClose}
      />
    ),
  };

  //* TiemSeriesKPI 세팅
  const timeKpiModalSettings: ModalProps = {
    isOpen: isTimeKpiSettingModalOpen,
    handleModalClose: timeKpiSettingModalClose,
    title: "Time Series KPI Selection",
    innerComponent: (
      <KpiModalInner
        kpiTableViewData={tiemSeriesKpiTableViewData}
        setKpiTableViewData={setTiemSeriesKpiTableViewData}
        kpiSelectData={{
          options: timeSeriesKpiItemsData?.items,
          selectedValue: selectedTimeKpiSettingModalValue,
          setSelectedValue: setSelectedTimeKpiSettingModalValue,
        }}
        handleModalClose={timeKpiSettingModalClose}
      />
    ),
  };

  // * =============================================================== //

  return (
    <div className="container">
      <Sidebar />
      <Modal {...kpiModalSettings} />
      <Modal {...timeKpiModalSettings} />
      <div className="main_header_container">
        <main className="main_container">
          <h1 className="main_title">Performance Evaluation</h1>
          <article className={styles.performance_container}>
            <section className={styles.form_container}>
              <Panel title="Select two files to compare">
                <form
                  onSubmit={handleFileSave}
                  className={styles.select_files_form}
                >
                  <div className={styles.item_file}>
                    <span className={styles.name}>File1</span>
                    <div className={styles.select}>
                      <Dropdown
                        options={fileNamesData?.filename}
                        selectedValue={selectedFile1Value}
                        setSelectedValue={setSelectedFile1Value}
                      ></Dropdown>
                    </div>
                  </div>
                  <div className={styles.item_file}>
                    <span className={styles.name}>File2</span>
                    <div className={styles.select}>
                      <Dropdown
                        options={fileNamesData?.filename}
                        selectedValue={selectedFile2Value}
                        setSelectedValue={setSelectedFile2Value}
                      ></Dropdown>
                    </div>
                  </div>
                  <button type="submit" className={styles.btn_save}>
                    save
                  </button>
                </form>
              </Panel>
            </section>

            {kpiData ? (
              <section className={styles.kpi_container}>
                <section className={styles.kpi_thead_container}>
                  <div
                    className={`${styles.kpi_td_title} ${styles.kpi_thead_item}`}
                  >
                    KPI
                  </div>
                  <div className={styles.kpi_thead_item}>
                    {viewFileNames[0]}
                  </div>
                  <div className={styles.kpi_thead_item}>
                    {viewFileNames[1]}
                  </div>
                  <div className={`${styles.kpi_thead_item}`}>
                    <div>compare</div>
                    <button
                      onClick={kpiSettingModalOpen}
                      className={styles.btn_setting}
                    >
                      <img src={settingImg} alt="setting" />
                    </button>
                  </div>
                </section>
                {kpiData?.map((kpi, index) => {
                  return (
                    <section className={styles.kpi_tr_container}>
                      <div
                        className={`${styles.kpi_td_item} ${styles.kpi_td_title}`}
                      >
                        {kpi.item}
                      </div>
                      <CustomValueCard
                        data={{
                          name: kpi.item,
                          value: kpi.value1,
                          miniValue: kpi.unit,
                          description: kpi.desc,
                        }}
                        backgroundColor="#0077C2"
                      />
                      <CustomValueCard
                        data={{
                          name: kpi.item,
                          value: kpi.value2,
                          miniValue: kpi.unit,
                          description: kpi.desc,
                        }}
                      />
                      <CompareCard
                        data={{
                          name: kpi.item,
                          value: kpi.compare,
                          miniValue: kpi.unit,
                          description: kpi.desc,
                        }}
                      />
                    </section>
                  );
                })}
              </section>
            ) : (
              <></>
            )}

            {timeSeriesKpiData ? (
              <section className={styles.time_kpi_all_container}>
                <Panel title="Time Series KPIs">
                  <button
                    onClick={timeKpiSettingModalOpen}
                    className={styles.btn_setting}
                  >
                    <img src={settingImg} alt="setting" />
                  </button>

                  <div className={styles.time_kpi_container}>
                    {timeSeriesKpiData?.map((timeSeriesKpi, index) => {
                      const timeSeriesKpiChartData: MChartsProps = {
                        chartType: "mLine",
                        data: timeSeriesKpi.valueData || testTimeSeriesKpiChartData[index].valueData,
                        color: chartColors,
                        dataKey: ["value1", "value2"],
                        title: timeSeriesKpi.item,
                        name: "name",
                        yLabel: timeSeriesKpi.unit, // y축 레이블
                      };
                      return (
                        <section className={styles.time_kpi_item}>
                          <MCharts {...timeSeriesKpiChartData} />
                        </section>
                      );
                    })}
                  </div>
                </Panel>
              </section>
            ) : (
              <></>
            )}
          </article>
        </main>
      </div>
    </div>
  );
};

export default Performance;
