import { SqlSort, SqlWhereClause } from "./models";
import { WhereClause } from "./WhereClause";
interface IAutoSqlTable<T> {
    select(arr: any): any;
    add(obj: any): any;
    update(obj: any): any;
    delete(): any;
}
interface IAutoSqlView<T> {
    select(arr: any): any;
}
export declare abstract class AutoSql<T> {
    protected TableName: any;
    protected top: number;
    protected selectList: string[];
    strWhere: SqlWhereClause[];
    protected groupby: string[];
    protected orderby: SqlSort[];
    protected isDistinct: boolean;
    betweenArr: any[];
    currentWhereOn: any;
    host: string;
    requestOptions: {
        method: string;
        headers: any;
        body: any;
        redirect: string;
    };
    constructor(TableName: any);
    first(): this;
    select(arr: string[]): this;
    desc(by: any): this;
    asc(by: any): this;
    distinct(): this;
    orderBy(arr: SqlSort[]): this;
    where(on: string): WhereClause<unknown>;
    get(): Promise<T[]>;
    count(): Promise<any>;
    take(count: number): this;
    protected getCopy(): any;
    protected getObj(): {
        top: number;
        select: string[];
        where: SqlWhereClause[];
        groupBy: string[];
        orderBy: SqlSort[];
        isDistinct: boolean;
        betweens: any[];
    };
    protected execute(requestOptions: any): Promise<any>;
    getResult(): Promise<any>;
    protected getBasicRequestOption(): any;
    protected cleanUp(): void;
    protected API(type: any): string;
}
export declare class AutoSqlTable<T> extends AutoSql<T> implements IAutoSqlTable<T> {
    constructor(tableName: any);
    delete(): Promise<any>;
    add(T: any): Promise<any>;
    update(obj: any): Promise<any>;
}
export declare class AutoSqlView<T> extends AutoSql<T> implements IAutoSqlView<T> {
}
export {};
