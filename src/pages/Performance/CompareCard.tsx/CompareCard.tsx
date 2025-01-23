import styles from "./CompareCard.module.scss";
import React from "react";
import { CustomValueCardType } from "../../../types/CustomValueCard.types";
import CustomValueCard from "../CustomValueCard/CustomValueCard";
import DLSumGagueChart from "../../DashBoard/TopDLThroughput/DLSumGagueChart";
import SimpleGagueChart from "../../../components/Charts/SimpleGagueChart";
import { SimpleGagueChartProps } from "../../../types/Chart.types";

interface CompareCardProps {
  data: CustomValueCardType;
}

//** value와 speedChart를 나타낸다. */
const CompareCard: React.FC<CompareCardProps> = ({ data }) => {
  // data 객체를 복사하여 새로운 객체 생성
  const customValueCardData = { ...data, miniValue: "%" };

  return (
    <div className={styles.container}>
      <section className={styles.contents}>
        <CustomValueCard data={customValueCardData} backgroundColor="#00BFFF" />
      </section>
      <section className={styles.contents}>
        <SimpleGagueChart
          title={data.name}
          value={data.value}
          unit="%"
          maxValue={100}
          minValue={-100}
        />
      </section>
    </div>
  );
};

export default CompareCard;
