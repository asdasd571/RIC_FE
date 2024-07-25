

// 사이드바의 데이터를 구성하는 타입
export interface SidebarData {
    title: string | null;
    items: { name: string; icon: string }[];
}
