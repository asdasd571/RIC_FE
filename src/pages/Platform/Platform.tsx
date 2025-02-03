import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
// import '../../styles/common.scss';
import styles from "./Platform.module.scss";
import PlatformCard from "./PlatformCard/PlatformCard";
import defaultAxios from "../../apis/defaultAxios";
import React from "react";
import { PrintTableData } from "../../types/PrintAppTable.types";
import PrintAppTable from "../../components/RICBlocks/PrintAppTable/PrintAppTable";
import { MenuItem } from "../../types/SelectedViewMenu.types";
import SelectedViewMenu from "../../components/SelectedVeiwMenu/SelectedVeiwMenu";

const Platform: React.FC = () => {
  //* ========== state ======================= //
  const [platformList, setPlatformList] = useState([]);
  //* ======================================== //

  //* ========== API RAPP 데이터 받기 =========*//

  // rAPP 리스트를 받아오는 부분
  const getPlatformList = async (): Promise<void> => {
    try {
      const url: string = `http://localhost:8080/xblock`;
      const response = await defaultAxios.get(url);
      setPlatformList(response.data);
    } catch (error) {
      console.error("오류 발생!", error);
    }
  };
  //* ======================================== //

  //첫 렌더링시, 실행!
  useEffect(() => {
    getPlatformList(); // rApp 리스트 받아오기.
  }, []);

  // * 카드 컴포넌트
  const PrintPlatformCardCompment = () => {
    return (
      <section className={styles.framework_cards}>
        <PlatformCard data={platformList} />
      </section>
    );
  };

  // * 테이블 데이터
  const tableData: PrintTableData = {
    theadPrintData: [
      //print용 데이터
      "Name",
      "Version",
      "Vendor",
      "Service Type",
      "State",
      "Desc",
    ],
    theadData: [
      "name",
      "version",
      "vendor",
      "ServiceType",
      "state",
      "description",
    ],

    tableData: platformList,
  };

  // * 메뉴 출력 데이터 ========================== //
  const menuData: MenuItem[] = [
    {
      menuName: "block",
      component: <PrintPlatformCardCompment />, // 리액트 컴포넌트 타입 지정
    },
    {
      menuName: "table",
      component: <PrintAppTable data={tableData} />, // 리액트 컴포넌트 타입 지정
    },
  ];
  // * ===================================== //

  // * ====================================== //
  return (
    <div className="container">
      <Sidebar />
      <div className="main_header_container">
        {/* <Header titleText="Platform" /> */}
        <main className="main_container">
          <h1 className="main_title">Near-RT RIC Platform</h1>
          <article className={styles.framework_card_container}>
            <SelectedViewMenu data={menuData} />
          </article>
        </main>
      </div>
    </div>
  );
};

export default Platform;
