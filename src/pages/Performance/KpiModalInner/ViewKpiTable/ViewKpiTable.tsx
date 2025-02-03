import { Dispatch, SetStateAction, useState } from "react";
import Dropdown from "../../../../components/Dropdown/Dropdown";
import styles from "./ViewKpiTable.module.scss";
import { KpiItems } from "../../../../types/apis.types";
import { useQuery } from "@tanstack/react-query";
import { fetchKpiItemsData } from "../../../../apis/performanceApis";
import { DropdownProps } from "../../../../types/Dropdown.types";

interface ViewKpiTableProps {
  dropDownOptions: string[]; // 내부 아이템 설정 드롭다운 메뉴가 필요하기 때문이다.
  selectedValues: string[];
  setSelectedValues: Dispatch<SetStateAction<string[]>>;
  handleKpiDelete: (index: number) => void;
}

const ViewKpiTable: React.FC<ViewKpiTableProps> = ({
  dropDownOptions, // item 데이터 
  selectedValues,
  setSelectedValues,
  handleKpiDelete,
}) => {

  // Dropdown 값 변경 핸들러
  const handleDropdownChange = (index: number, newValue: string) => {
    setSelectedValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[index] = newValue;
      return updatedValues;
    });
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th></th>
          <th>KPI</th>
        </tr>
      </thead>
      <tbody>
        {selectedValues?.map((valueName, index) => (
          <tr key={index}>
            <td>
              <button
                onClick={() => handleKpiDelete(index)}
                className={styles.btn_kpi_delete}
                type="button"
              >
                ㅡ
              </button>
            </td>
            <td>
              <div className={styles.dropdown_td}>
                <Dropdown
                  options={dropDownOptions} // kpiItemsData가 없으면 빈 배열을 기본값으로 사용
                  selectedValue={valueName}
                  setSelectedValue={(newValue) =>
                    handleDropdownChange(index, newValue)
                  }
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ViewKpiTable;
