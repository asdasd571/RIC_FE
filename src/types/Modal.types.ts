export interface ModalProps {
  isOpen: boolean; // 모달 on/
  handleModalClose: () => void; //매개변수가 없고 반환값도 없는 함수. (모달 닫기)
  title?: string; // 모달 제목
  innerComponent: React.ReactNode; // 모달 내부
}
