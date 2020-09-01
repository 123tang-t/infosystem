// 菜单
export interface Menu {
    Id: number | null;
    RouteName: string;
    RouteUrl: string;
    IsShow: number;
    RouteOrder: number | null;
    ParentId: number | null;
}