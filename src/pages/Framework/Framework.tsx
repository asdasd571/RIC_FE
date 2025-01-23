import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
// import '../../styles/common.scss';
import styles from "./Framework.module.scss";
import FrameworkCard from "./FrameworkCard/FrameworkCard";
// import { FrameworkCardType } from "../../types/Framework.types";
import { useEffect, useState } from "react";
import defaultAxios from "../../apis/defaultAxios";
import React from "react";
import PrintAppTable from "../../components/RICBlocks/PrintAppTable/PrintAppTable";
import { MenuItem } from "../../types/SelectedViewMenu.types";
import SelectedViewMenu from "../../components/SelectedVeiwMenu/SelectedVeiwMenu";
import { PrintTableData } from "../../types/PrintAppTable.types";

const Framework: React.FC = () => {
  //* ========== state ======================= //
  const [FrameworkList, setFrameworkList] = useState([]);

  //* ======================================== //

  //* ========== API RAPP 데이터 받기 =========*//

  // rAPP 리스트를 받아오는 부분
  const getFrameworkList = async (): Promise<void> => {
    try {
      const url: string = `http://localhost:8080/rblock`;
      const response = await defaultAxios.get(url);
      setFrameworkList(response.data);
    } catch (error) {
      console.error("오류 발생!", error);
    }
  };
  //* ======================================== //
  
  //첫 렌더링시, 실행!
  useEffect(() => {
    getFrameworkList(); // rApp 리스트 받아오기.
  }, []);

  // * 메뉴 관련 ===================================== //
  // * 카드 컴포넌트
  const PrintFrameworkCardCompment = () => {
    return (
      <section className={styles.framework_cards}>
        <FrameworkCard data={FrameworkList} />
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

    tableData: FrameworkList,
  };

  // * 메뉴 출력 데이터 ========================== //
  const menuData: MenuItem[] = [
    {
      menuName: "block",
      component: <PrintFrameworkCardCompment />, // 리액트 컴포넌트 타입 지정
    },
    {
      menuName: "table",
      component: <PrintAppTable data={tableData} />, // 리액트 컴포넌트 타입 지정
    },
  ];
  // * ===================================== //
  // * =============================================== //

  return (
    <div className="container">
      <Sidebar />
      <div className="main_header_container">
        <main className="main_container">
          <h1 className="main_title">Non-RT RIC Framework</h1>
          <article className={styles.framework_card_container}>
            <SelectedViewMenu data={menuData} />
          </article>
        </main>
      </div>
    </div>
  );
};

export default Framework;
