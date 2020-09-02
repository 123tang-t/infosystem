// 假期列表
export interface Vacation {
    Id: number | null;
    Name: string;
    JobNumber: null;
    Type: number | null;
    StartTime: string;
    EndTime: string;
    IsPermit?: number;
}