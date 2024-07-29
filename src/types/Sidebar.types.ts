// types/Sidebar.types.ts
export interface SidebarItem {
    id: number; //인덱스
    name: string;
    icon: string;
    path?: string;  // 내부 링크
    externalUrl?: string;  // 외부 링크
    action?: 'logout';  // 특별 액션
    
}

export interface SidebarData {
    title?: string | null;
    items: SidebarItem[];
}
