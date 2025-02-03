import React, { useState } from "react";
import styles from "./Modal.module.scss"; // SCSS 파일 import
import Draggable from "react-draggable";
import { ModalProps } from "../../types/Modal.types";
// // * setting 모달
// // * modal 열기
// const handleModalOpen = ():void => {
//     setModalIsOpen(true);
// };
// // * modal 닫기
// const handleModalClose = ():void => {
//     setModalIsOpen(false);
// };

// // *------------------//
// interface ModalProps {
//   isOpen: boolean; // 모달 on/
//   handleModalClose: () => void; //매개변수가 없고 반환값도 없는 함수. (모달 닫기)
//   title?: string; // 모달 제목
//   innerComponent: React.ReactNode; // 모달 내부
// }

// ? width, height도 받을지 고민민을 해야할 것 같아요
// height: 600px;
// width: 800px;

/**
 * 모달 컴포넌트
 * @param isOpen - boolean 모달 on/off
 * @param handleModalClose - void, 모달 닫는 함수  () => isOpen(false)
 * @param title - string (optional): 모달 제목
 * @param innerCompoenet - React.ReactNode, 모달 내부에 렌더링할 컴포넌트
 * @returns  JSX.Element: 모달 UI 렌더링
 */
const Modal: React.FC<ModalProps> = ({
  isOpen,
  handleModalClose,
  title = "",
  innerComponent = <></>, // children 추가
}) => {
  return isOpen ? (
    <Draggable
      handle={`.${styles.title_container}`} // 드래그 가능하게 하는 class 지정
      bounds="body" // body 밖으로 벗어나지 못하도록 설정
    >
      <section
        className={styles.modal_container} // 모달 내용 스타일 클래스 적용
      >
        <header className={styles.title_container}>
          <h3 className={styles.title}>{title}</h3>
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
          {innerComponent}
        </section>

        {/* <button className={styles.btn_apply}>apply</button> */}
      </section>
    </Draggable>
  ) : null;
};

export default Modal;
