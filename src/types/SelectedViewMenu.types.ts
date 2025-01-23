// 데이터 타입 정의
export interface MenuItem {
  menuName: string;
  component: React.ReactNode; // 리액트 컴포넌트 타입 지정
}

export interface SelectedViewMenuProps {
  data?: MenuItem[];
}
