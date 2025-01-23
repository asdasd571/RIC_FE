import styles from "./Panel.module.scss";
import React from "react";

interface PanelProps {
  title?: string;
  children?: React.ReactNode; // children 추가
}

/**
 * @param {PanelProps} props - 컴포넌트에 전달되는 props
 * @param {string} [props.title="title"] - 제목 텍스트. 제공되지 않으면 기본값 "title"이 사용됩니다.
 * @param {React.ReactNode} [props.children] - 컴포넌트 안에 렌더링될 자식 요소들
 * @returns {JSX.Element} - 렌더링된 섹션 요소
 */
const Panel: React.FC<PanelProps> = ({ title = "title", children }) => {
  return (
    <section className={styles.pannel_container}>
      <h3 className={styles.title}>{title}</h3>
      <hr />
      <div className={styles.contents}>{children}</div>
    </section>
  );
};

export default Panel;
