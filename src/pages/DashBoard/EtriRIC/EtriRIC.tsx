import { useEffect, useState } from "react";
import styles from "./EtriRIC.module.scss";
import defaultAxios from "../../../apis/defaultAxios";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchRicInfoData } from "../../../apis/dashboardApi";
import useNavigates from "../../../hooks/useNavigates";
import { useNavigate } from "react-router-dom";

// * ETRI RIC 목록을 모여주는 컨테이너

// * API 데이터
interface RicInfoType {
  value: string;
  name: string;
  state: "OFF" | "ON" | "ERROR" | "WARNING"; // 상태는 고정된 문자열이므로 Union 타입으로 정의
  description: string; // value에 대한 설명
}

// 맞춤 경로
interface RicInfoPathArray {
  target: "self" | "blank"; // self: 탭 이동, blank : 새 창
  path: string;
}

// 맞춤 경로데이터. index로 이렇게 넣어줬다. //todo : 후에 순서가 바뀌면, 이것도 변경해줘야함..
const ricInfoPathArray: RicInfoPathArray[] = [
  {
    target: "blank",
    path: process.env.REACT_APP_SMO_OAM_PATH as string,
  },
  {
    target: "self",
    path: "/framework", // KSLEE 2nd
  },
  {
    target: "self", // KSLEE 3rd
    path: "/rapp",
  },
  {
    target: "self", // KSLEE 3rd
    path: "/e2-nodes",
    //target : "blank",
    // path:process.env.REACT_APP_E2_NODE_PATH as string
  },
];

const EtriRIC: React.FC = () => {
  //* 선언
  const navigate = useNavigate();

  //* useQuery로 실시간 데이터 패칭
  const { data: ricInfoData } = useQuery<RicInfoType[]>({
    queryKey: ["ricInfoData"], // 쿼리 키
    queryFn: fetchRicInfoData, // 쿼리 실행 함수
    refetchInterval: 2000, // 1초 단위 실행
  });

  //extrenalurl에 따라 비교
  const handleCardClick = (item: RicInfoPathArray) => {
    if (item.target === "self") {
      // .현재 탭인 경우
      navigate(item.path); // 탭 이동
    } else if (item.target === "blank") {
      window.open(item.path, "_blank"); // 새 창이동
    }
  };

  return (
    <div className={styles.container}>
      {/* 위에  상태 설명 부분  */}
      <div className={styles.description}>
        <div className={styles.des_item}>
          <span className={`${styles.state} ${styles.off}`}> </span>
          <span className={styles.text}>OFF</span>
        </div>
        <div className={styles.des_item}>
          <span className={`${styles.state} ${styles.on}`}></span>
          <span className={styles.text}>ON</span>
        </div>
        <div className={styles.des_item}>
          <span className={`${styles.state} ${styles.error}`}></span>
          <span className={styles.text}>ERROR</span>
        </div>
        <div className={styles.des_item}>
          <span className={`${styles.state} ${styles.warning}`}></span>
          <span className={styles.text}>WARNING</span>
        </div>
      </div>

      {ricInfoData?.map((ric, index) => (
        <section
          onClick={() => {
            handleCardClick(ricInfoPathArray[index]);
          }}
          className={styles.item}
        >
          <div className={styles.item_titles}>
            <span className={styles.item_name}>{ric.name}</span>
            <span className={styles.item_description}>{ric.description}</span>
          </div>
          <div className={styles.item_value}>{ric.value}</div>
          <div
            className={`${styles.item_state} ${
              ric.state === "OFF"
                ? styles.item_state_off
                : ric.state === "ON"
                  ? styles.item_state_on
                  : ric.state === "WARNING"
                    ? styles.item_state_warning
                    : ric.state === "ERROR"
                      ? styles.item_state_error
                      : ""
            }`}
          >
            {/* 원 */}
          </div>
        </section>
      ))}
    </div>
  );
};

export default EtriRIC;
