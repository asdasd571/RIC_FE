import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
// import '../../styles/common.scss';
import styles from "./XApps.module.scss";
import { XAppCardType } from "../../types/XApp.types";
import XAppCard from "./XAppCard/XAppCard";
import { useEffect, useState } from "react";
import defaultAxios from "../../apis/defaultAxios";
import React from "react";
import { MenuItem } from "../../types/SelectedViewMenu.types";
import SelectedViewMenu from "../../components/SelectedVeiwMenu/SelectedVeiwMenu";
import PrintAppTable from "../../components/RICBlocks/PrintAppTable/PrintAppTable";
import { PrintTableData } from "../../types/PrintAppTable.types";

const XApps: React.FC = () => {
  //xapp List를 저장할 state
  const [xAppList, setxAppList] = useState<XAppCardType[]>([]);

  //* ========== API XAPP 데이터 받기 =========*//
  // xAPP 리스트를 받아오는 부분
  const getxAppList = async (): Promise<void> => {
    try {
      const url: string = `http://localhost:8080/xapp`;
      const response = await defaultAxios.get(url);

      setxAppList(response.data);
    } catch (error) {
      console.error("오류 발생!", error);
    }
  };
  //* ======================================== //

  //첫 렌더링시, 실행!
  useEffect(() => {
    getxAppList(); // rApp 리스트 받아오기.
  }, []);

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

    tableData: xAppList,
  };
  // * ===================================== //

  // * 카드 컴포넌트 출력
  const PrintrAppCardConpment = () => {
    return (
      <section className={styles.rApps_cards}>
        <XAppCard data={xAppList} />
      </section>
    );
  };

  // * 출력 데이터 ========================== //
  const menuData: MenuItem[] = [
    {
      menuName: "block",
      component: <PrintrAppCardConpment />, // 리액트 컴포넌트 타입 지정
    },
    {
      menuName: "table",
      component: <PrintAppTable data={tableData} />, // 리액트 컴포넌트 타입 지정
    },
  ];
  // * ===================================== //

  return (
    <div className="container">
      <Sidebar />
      <div className="main_header_container">
        {/* <Header titleText="xApps"/> */}
        <main className="main_container">
          <h1 className="main_title">xApps</h1>
          <article className={styles.rApps_card_container}>
            <SelectedViewMenu data={menuData} />
          </article>
        </main>
      </div>
    </div>
  );
};

export default XApps;
