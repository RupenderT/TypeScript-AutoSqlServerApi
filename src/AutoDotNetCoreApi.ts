import { dotNetApiPath } from './AutoDotNetCoreApiConfig';

import { SqlSort, SqlSortTypes, SqlWhereClause } from "./models";
import { WhereClause } from "./WhereClause";

declare var fetch: any;

interface IAutoDotNetCoreApiTable<T> {
    select(arr: any): any;
    add(obj: any): any;
    update(obj: any): any;
    delete(): any;
}
interface IAutoDotNetCoreApiView<T> {
    select(arr: any): any;
}
interface IAutoDotNetCoreApiStoredProc {
    get(obj): any;
}


export abstract class AutoDotNetCoreApi<T> {
    protected top: number;
    protected selectList: string[] = [];
    strWhere: SqlWhereClause[] = [];
    protected groupby: string[] = [];
    protected orderby: SqlSort[] = [];
    protected isDistinct = false;
    betweenArr = [];

    //
    currentWhereOn;
    //TableName;

    // host = dotNetApiPath;
    requestOptions = {
        method: 'POST',
        headers: null,
        body: null,
        redirect: 'follow'
    };


    constructor(protected TableName, protected host) {
        //this.TableName = this.constructor.name;
        var header = new Headers();
        header.append("Content-Type", "application/json")
        this.requestOptions.headers = header;

    }




    //startsWith() { }
    first() { this.top = 1; return this; }
    //last() { }
    //exists() { }
    //bulkAdd() { }

    select(arr: string[]) {
        this.selectList = [...this.selectList, ...arr];
        return this;
    }
    desc(by) {
        if (by) {
            this.orderby.push({ name: by, by: SqlSortTypes.DESC });
        }

        return this;
    }
    asc(by) {
        this.orderby.push({ name: by, by: SqlSortTypes.ASC });
        return this;
    }
    distinct() {
        this.isDistinct = true;
        return this;
    }
    orderBy(arr: SqlSort[]) {
        this.orderby = [...this.orderby, ...arr];
        return this;
    }
    where(on: string) {
        var obj = this.getCopy();
        obj.currentWhereOn = on;
        return new WhereClause<this>(on, obj);
    }



    get() {
        var raw = JSON.stringify(this.getObj());

        var raw = JSON.stringify(this.getObj());
        this.requestOptions.body = raw;
        this.requestOptions.method = "GET";
        this.cleanUp();
        return new Promise<T[]>(async (reslove, reject) => {
            const json = await this.execute(this.requestOptions);
            let ret: T[] = <T[]>JSON.parse(JSON.stringify(json));
            reslove(ret);
        });


    }
    count() {
        this.selectList.push('count(*) Total');
        return this.execute(this.getBasicRequestOption());
    }

    take(count: number) {
        this.top = count;
        return this;
    }






    protected getCopy() {
        var v = JSON.parse(JSON.stringify(this));
        var copy = Object.assign(Object.create(Object.getPrototypeOf(this)), v);
        var header = new Headers();
        header.append("Content-Type", "application/json");
        copy.requestOptions =
        {
            method: 'POST',
            headers: header,
            body: null,
            redirect: 'follow'
        };

        return copy;
    }

    protected getObj() {
        let obj = {
            top: this.top,
            select: this.selectList,
            where: this.strWhere,
            groupBy: this.groupby,
            orderBy: this.orderby,
            isDistinct: this.isDistinct,
            betweens: this.betweenArr
        }

        return obj;
    }




    protected async execute(requestOptions) {

        const api = this.API(requestOptions.method);
        this.cleanUp();
        if (requestOptions.method == "GET") {
            requestOptions.method = "POST";
        }
        var header = new Headers();
        header.append("Content-Type", "application/json");
        requestOptions.headers = header;
        var responce = await fetch(api, requestOptions);
        return responce.json();
    }

    getResult() {
        return this.execute(this.getBasicRequestOption());
    }
    protected getBasicRequestOption() {
        var raw = JSON.stringify(this.getObj());
        this.requestOptions.body = raw;
        this.requestOptions.method = "GET";
        return JSON.parse(JSON.stringify(this.requestOptions));
    }
    protected cleanUp() {
        this.top = null;
        this.selectList = [];
        this.strWhere = [];
        this.groupby = [];
        this.orderby = [];
    }
    protected API(type) {
        return this.host + `${type}/` + this.TableName;
    }


}


export class AutoDotNetCoreApiTable<T> extends AutoDotNetCoreApi<T> implements IAutoDotNetCoreApiTable<T>{

    constructor(tableName, host) {
        super(tableName, host);

    }

    async delete() {
        var raw = JSON.stringify(this.getObj());
        this.requestOptions.body = raw;
        this.requestOptions.method = "DELETE";
        return this.execute(this.requestOptions);

    }
    async add(T) {
        var raw = JSON.stringify(T);

        var raw = JSON.stringify(this.getObj());
        this.requestOptions.body = raw;
        this.requestOptions.method = "POST";
        return this.execute(this.requestOptions);
    }

    async update(obj) {

        var raw = JSON.stringify({ obj: obj, where: this.strWhere, betweens: this.betweenArr });

        this.requestOptions.body = raw;
        this.requestOptions.method = "PUT";
        return this.execute(this.requestOptions);
    }


}

export class AutoDotNetCoreApiView<T> extends AutoDotNetCoreApi<T> implements IAutoDotNetCoreApiView<T>{

}


export class AutoDotNetCoreApiStoredProc implements IAutoDotNetCoreApiStoredProc {

    constructor(private name: string, private host: string) {

    }
    async get(obj: any) {
        const api = this.API();


        var header = new Headers();
        header.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'POST',
            headers: header,
            body: obj,
            redirect: 'follow'
        };

        var responce = await fetch(api, requestOptions);
        return responce.json();
    }
    protected API() {
        return this.host + `storedProc/` + this.name;
    }

}