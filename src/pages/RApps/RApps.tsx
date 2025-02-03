import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
// import '../../styles/common.scss';
import styles from "./RApps.module.scss";
import { rAppCardType } from "../../types/RApp.types";
import RAppCard from "./RAppCard/RAppCard";
import defaultAxios from "../../apis/defaultAxios";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { PrintTableData } from "../../types/PrintAppTable.types";
import { MenuItem } from "../../types/SelectedViewMenu.types";
import SelectedViewMenu from "../../components/SelectedVeiwMenu/SelectedVeiwMenu";

const RApps: React.FC = () => {
  //* ========== state ======================= //
  const [rAppList, setrAppList] = useState<rAppCardType[]>([]);

  //* ======================================== //

  //* ========== API RAPP 데이터 받기 =========*//

  // rAPP 리스트를 받아오는 부분
  const getrAppList = async (): Promise<void> => {
    try {
      const url: string = `http://localhost:8080/rapp`;
      const response = await defaultAxios.get(url);

      setrAppList(response.data);
      // console.log('성공 /rapp', response.data );
    } catch (error) {
      console.error("오류 발생!", error);
    }
  };
  //* ======================================== //

  //첫 렌더링시, 실행!
  useEffect(() => {
    getrAppList(); // rApp 리스트 받아오기.
  }, []);

  // * 메뉴 출력 관련 ================================//

  // * 카드 컴포넌트
  const PrintRAppCardCompnent: React.FC = () => {
    return (
      <section className={styles.rApps_cards}>
        <RAppCard data={rAppList} />
      </section>
    );
  };

  //* 테이블 컵포넌트
  // RAPP의 경우, 데이터 형식이 다르기 때문에 직접 테이블을 만들어준다.

  const PrintRAppTableComponent: React.FC = () => {
    //* 각각 클릭시 적절한 페이지로 이동
    const handleCardClick = (url: string) => {
      window.open(url, "_blank"); // 창 오픈
      // window.location.href= url; // 탭 오픈
    };
    return (
      <section className={styles.table_container}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Version</th>
              <th>Vendor</th>
              <th>Service Type</th>
              <th>State</th>
              <th>Desc</th>
            </tr>
          </thead>
          <tbody>
            {rAppList.map((rApp) => (
              <tr
                onClick={() => {
                  // 클릭시 해당 rApp 페이지로 이동
                  handleCardClick(rApp.open);
                }}
              >
                <td>{rApp.name}</td>
                <td>{rApp.rappSchema.version}</td>
                <td>{rApp.rappSchema.vendor}</td>
                <td>{rApp.rappSchema.ServiceType}</td>
                <td>
                  <div className={styles.state_container}>
                    <span
                      className={`${styles.state} ${rApp.state === "ON" ? "" : styles.off}`}
                    ></span>
                  </div>
                </td>
                <td>{rApp.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  };
  // * 메뉴 출력 데이터 ========================== //
  const menuData: MenuItem[] = [
    {
      menuName: "block",
      component: <PrintRAppCardCompnent />,
    },
    {
      menuName: "table",
      component: <PrintRAppTableComponent />,
    },
  ];
  // * ===================================== //

  // * ===============================================//

  return (
    <div className="container">
      <Sidebar />
      <div className="main_header_container">
        {/* <Header titleText="rApps"/> */}
        <main className="main_container">
          <h1 className="main_title">rApps</h1>
          <article className={styles.rApps_card_container}>
            <SelectedViewMenu data={menuData} />
          </article>
        </main>
      </div>
    </div>
  );
};

export default RApps;
