export interface IResponse<T> {
    data: T | null,
    success: boolean,
    errors: string[]
}