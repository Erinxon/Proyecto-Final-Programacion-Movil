export interface ApiResponse<T> {
    data: T;
    succeeded: boolean;
    message: number;
    totalRegistros: number;
}