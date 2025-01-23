// export interface DropdownOption {
//   value: number;
//   name: string;
// }

export interface DropdownProps {
  options: string[];
  selectedValue: string; // 부모에서 전달받은 상태 값
  setSelectedValue: (value: string) => void; // 선택된 값을 업데이트하는 함수
}
