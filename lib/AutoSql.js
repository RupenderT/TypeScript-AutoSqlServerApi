"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoSqlView = exports.AutoSqlTable = exports.AutoSql = void 0;
const AutoSqlConfig_1 = require("./AutoSqlConfig");
const models_1 = require("./models");
const WhereClause_1 = require("./WhereClause");
class AutoSql {
    constructor(TableName) {
        this.TableName = TableName;
        this.selectList = [];
        this.strWhere = [];
        this.groupby = [];
        this.orderby = [];
        this.isDistinct = false;
        this.betweenArr = [];
        //TableName;
        this.host = AutoSqlConfig_1.dotNetApiPath;
        this.requestOptions = {
            method: 'POST',
            headers: null,
            body: null,
            redirect: 'follow'
        };
        //this.TableName = this.constructor.name;
        var header = new Headers();
        header.append("Content-Type", "application/json");
        this.requestOptions.headers = header;
    }
    //startsWith() { }
    first() { this.top = 1; return this; }
    //last() { }
    //exists() { }
    //bulkAdd() { }
    select(arr) {
        this.selectList = [...this.selectList, ...arr];
        return this;
    }
    desc(by) {
        if (by) {
            this.orderby.push({ name: by, by: models_1.SqlSortTypes.DESC });
        }
        return this;
    }
    asc(by) {
        this.orderby.push({ name: by, by: models_1.SqlSortTypes.ASC });
        return this;
    }
    distinct() {
        this.isDistinct = true;
        return this;
    }
    orderBy(arr) {
        this.orderby = [...this.orderby, ...arr];
        return this;
    }
    where(on) {
        var obj = this.getCopy();
        obj.currentWhereOn = on;
        return new WhereClause_1.WhereClause(on, obj);
    }
    get() {
        var raw = JSON.stringify(this.getObj());
        var raw = JSON.stringify(this.getObj());
        this.requestOptions.body = raw;
        this.requestOptions.method = "GET";
        this.cleanUp();
        return new Promise((reslove, reject) => __awaiter(this, void 0, void 0, function* () {
            const json = yield this.execute(this.requestOptions);
            let ret = JSON.parse(JSON.stringify(json));
            reslove(ret);
        }));
    }
    count() {
        this.selectList.push('count(*) Total');
        return this.execute(this.getBasicRequestOption());
    }
    take(count) {
        this.top = count;
        return this;
    }
    getCopy() {
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
    getObj() {
        let obj = {
            top: this.top,
            select: this.selectList,
            where: this.strWhere,
            groupBy: this.groupby,
            orderBy: this.orderby,
            isDistinct: this.isDistinct,
            betweens: this.betweenArr
        };
        return obj;
    }
    execute(requestOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            const api = this.API(requestOptions.method);
            this.cleanUp();
            if (requestOptions.method == "GET") {
                requestOptions.method = "POST";
            }
            var header = new Headers();
            header.append("Content-Type", "application/json");
            requestOptions.headers = header;
            var responce = yield fetch(api, requestOptions);
            return responce.json();
        });
    }
    getResult() {
        return this.execute(this.getBasicRequestOption());
    }
    getBasicRequestOption() {
        var raw = JSON.stringify(this.getObj());
        this.requestOptions.body = raw;
        this.requestOptions.method = "GET";
        return JSON.parse(JSON.stringify(this.requestOptions));
    }
    cleanUp() {
        this.top = null;
        this.selectList = [];
        this.strWhere = [];
        this.groupby = [];
        this.orderby = [];
    }
    API(type) {
        return this.host + `${type}/` + this.TableName;
    }
}
exports.AutoSql = AutoSql;
class AutoSqlTable extends AutoSql {
    constructor(tableName) {
        super(tableName);
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            var raw = JSON.stringify(this.getObj());
            this.requestOptions.body = raw;
            this.requestOptions.method = "DELETE";
            return this.execute(this.requestOptions);
        });
    }
    add(T) {
        return __awaiter(this, void 0, void 0, function* () {
            var raw = JSON.stringify(T);
            var raw = JSON.stringify(this.getObj());
            this.requestOptions.body = raw;
            this.requestOptions.method = "POST";
            return this.execute(this.requestOptions);
        });
    }
    update(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            var raw = JSON.stringify({ obj: obj, where: this.strWhere, betweens: this.betweenArr });
            this.requestOptions.body = raw;
            this.requestOptions.method = "PUT";
            return this.execute(this.requestOptions);
        });
    }
}
exports.AutoSqlTable = AutoSqlTable;
class AutoSqlView extends AutoSql {
}
exports.AutoSqlView = AutoSqlView;
