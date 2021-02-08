export interface SqlSort {
    name: string;
    by: SqlSortTypes
}

export enum SqlSortTypes {
    ASC = "ASC",
    DESC = "DESC"
}
export interface SqlWhereClause {
    name: string;
    value: string;
    operator: string;
}