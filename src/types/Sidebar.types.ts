// types/Sidebar.types.ts
export interface SidebarItem {
    name: string;
    icon: string;
    path?: string;  // 내부 링크
    externalUrl?: string;  // 외부 링크
    action?: 'logout';  // 특별 액션
    
}

//사이드바 리스트 타이틀 type
export interface SidebarTitle {
    name: string | null;  // 타이틀 제목 
    path? : string | null; // 이동할 path
    isToggle? : boolean; //토글됐는지? true : 닫힘, false: 열림
    externalUrl?: string;  // 외부 링크
}
export interface SidebarData {
    title: SidebarTitle;
    items: SidebarItem[];
}
