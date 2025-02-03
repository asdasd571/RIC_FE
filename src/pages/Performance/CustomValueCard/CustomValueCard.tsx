import styles from "./CustomValueCard.module.scss";
import React from "react";
import { CustomValueCardType } from "../../../types/CustomValueCard.types";

interface CustomValueCardProps {
  data: CustomValueCardType;
  backgroundColor?: string;
}

//** vlaue를 나타내는 카드, value 값과 색상값을 넣어준다. */
const CustomValueCard: React.FC<CustomValueCardProps> = ({
  data,
  backgroundColor = "#59A5F5",
}) => {
  return (
    <div
      style={{ backgroundColor: backgroundColor }}
      className={styles.container}
    >
      <h3 className={styles.title}>{data.name}</h3>
      <hr />
      <section className={styles.section_value}>
        <div className={styles.value}> {data.value}</div>
        <div className={styles.plus_minus}>{data.miniValue}</div>
      </section>
      <section className={styles.section_description}>
        {data.description}
      </section>
    </div>
  );
};

export default CustomValueCard;