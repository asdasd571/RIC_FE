// types/Sidebar.types.ts
export interface SidebarItem {
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
