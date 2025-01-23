import styles from "./KpiModalInner.module.scss";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  FileNames,
  KpiData,
  KpiItems,
  TimeSeriesKpiData,
} from "../../../types/apis.types";
import { useQuery } from "@tanstack/react-query";
import { DropdownProps } from "../../../types/Dropdown.types";
import ViewKpiTable from "./ViewKpiTable/ViewKpiTable";
import Dropdown from "../../../components/Dropdown/Dropdown";
import Swal from "sweetalert2";

interface KpiModalInnerProps {
  kpiTableViewData: string[];
  setKpiTableViewData: Dispatch<SetStateAction<string[]>>;
  kpiSelectData: DropdownProps; // 내부 아이템 설정 드롭다운 메뉴가 필요하기 때문이다.
  handleModalClose : () => void; // 모달 닫기 
} // TODO set 데이터 같은걸 받아서 변경해주게 해야할듯. 


const KpiModalInner: React.FC<KpiModalInnerProps> = ({
  kpiTableViewData,
  setKpiTableViewData,
  kpiSelectData,
  handleModalClose,
}) => {
  // * 테이블 항목 추가 함수 , AddItem
  const handleKpiAdd = (
    item: string
  ) => {
    setKpiTableViewData((prevValues) => [...prevValues, item]);
  };

  // * 테이블 삭제 함수 , ( - )
  const handleKpiDelete = (index: number) => {
    setKpiTableViewData((prevValues) =>
      prevValues.filter((_, i) => i !== index)
    );
  };

  // useEffect(()=>{
  //   console.log(kpiTableViewData)
  // },[kpiTableViewData])

  // * save 버튼클릭시, 해당 리스트로 KPI Series View 적용.
  // TODO  현재 선택된 KPI 목록(kpiTableViewData)들을 POST로 전송한다. /kpi, /kpits
  // kpi, kpits 데이터를 업데이트 시켜준다. 
  const handleSaveKPISelection = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Swal.fire({
      icon : 'success',
      title: '',
      text: `${kpiTableViewData} 저장되었습니다.`
    })
    // alert(kpiTableViewData);
    handleModalClose(); // 모달 닫기

    
  };

  return (
    <form
      onSubmit={(e) => handleSaveKPISelection(e)}
      className={styles.KpiModalInner_container}
    >
      <section className={styles.KpiModalInner_sub_container}>
        <h3>Select KPI Items to Add</h3>
        <p>KPI Item을 선택하여, Add Item 버튼을 누르면 아래 테이블에 추가됩니다.</p>
        <div className={styles.addItem_container}>
          <Dropdown
            options={kpiSelectData.options}
            selectedValue={kpiSelectData.selectedValue}
            setSelectedValue={kpiSelectData.setSelectedValue}
          ></Dropdown>
          <button
            type="button"
            onClick={() => handleKpiAdd(kpiSelectData.selectedValue)}
            className={styles.btn_kpi_add}
          >
            + Add Item
          </button>
        </div>
      </section>
      <section className={styles.KpiModalInner_sub_container}>
        <h3>Selected KPI Series</h3>
        <p>
          선택된 KPI Series List를 나타내며,  ( - ) 버튼 클릭시 테이블에서 제외됩니다.<br/>
          save 버튼 클릭시 변경된 KPI Series가 적용됩니다.
        </p>
        <div>
          <ViewKpiTable
            dropDownOptions={kpiSelectData.options}
            selectedValues={kpiTableViewData}
            setSelectedValues={setKpiTableViewData}
            handleKpiDelete={handleKpiDelete}
          />
        </div>
      </section>
      <button type="submit" className={styles.KpiModalInner_btn_save}>
        save
      </button>
    </form>
  );
};



export default KpiModalInner;