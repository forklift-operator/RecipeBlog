export type IdType = string;
export interface Identifiable<T = IdType> {
    id: T;
}