import React, { useState } from "react";
import Modal from "react-modal";
import styles from "./DMSettingModal.module.scss"; // SCSS 파일 import
import Draggable from "react-draggable";
import LogCheckBoxTable from "./LogCheckBoxTable/LogCheckBoxTable";

interface DMSettingModalProps {
  handleModalClose: () => void; //매개변수가 없고 반환값도 없는 함수. (모달 닫기)
}
const DMSettingModal: React.FC<DMSettingModalProps> = ({
  handleModalClose,
}) => {
  return (
    <Draggable
      handle={`.${styles.title_container}`} // 드래그 가능하게 하는 class 지정
      bounds="body" // body 밖으로 벗어나지 못하도록 설정
    >
      <section
        className={styles.modal_container} // 모달 내용 스타일 클래스 적용
      >
        <header className={styles.title_container}>
          <h3 className={styles.title}>DM Setting</h3>
          {/* <button title="check시 로그에서 해당 level이 보이게 됩니다." className={styles.btn_question}>
                        ?
                    </button> */}
          <button
            title="close"
            className={styles.btn_close}
            onClick={handleModalClose}
          >
            X
          </button>
        </header>
        <hr />

        <section className={styles.modal_inner_contents}>
          <LogCheckBoxTable />
        </section>

        {/* <button className={styles.btn_apply}>apply</button> */}
      </section>
    </Draggable>
  );
};

export default DMSettingModal;
