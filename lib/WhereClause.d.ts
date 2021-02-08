import { AutoSql } from "./AutoSql";
export declare class WhereClause<T> {
    private on;
    private obj;
    constructor(on: any, obj: AutoSql<T>);
    getCopy(): AutoSql<T>;
    above(val: string): AutoSql<T>;
    aboveOrEqual(val: any): AutoSql<T>;
    below(val: any): AutoSql<T>;
    belowOrEqual(val: any): AutoSql<T>;
    between(val1: any, val2: any): AutoSql<T>;
    equals(val: any): AutoSql<T>;
    notEquals(val: any): AutoSql<T>;
    isNull(): AutoSql<T>;
    isNotNull(): AutoSql<T>;
}
