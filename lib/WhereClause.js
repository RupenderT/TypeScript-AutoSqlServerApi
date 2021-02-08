"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhereClause = void 0;
class WhereClause {
    constructor(on, obj) {
        this.on = on;
        this.obj = obj;
    }
    getCopy() { return this.obj; }
    above(val) {
        var obj = this.getCopy();
        obj.strWhere.push({ name: this.on, value: val, operator: ">" });
        return obj;
    }
    aboveOrEqual(val) {
        var obj = this.getCopy();
        obj.strWhere.push({ name: this.on, value: val, operator: ">=" });
        return obj;
    }
    below(val) {
        var obj = this.getCopy();
        obj.strWhere.push({ name: this.on, value: val, operator: "<" });
        return obj;
    }
    belowOrEqual(val) {
        var obj = this.getCopy();
        obj.strWhere.push({ name: this.on, value: val, operator: "<=" });
        return obj;
    }
    between(val1, val2) {
        var obj = this.getCopy();
        obj.betweenArr.push({ name: this.on, value1: val1, value2: val2 });
        return obj;
    }
    equals(val) {
        var obj = this.getCopy();
        obj.strWhere.push({ name: this.on, value: val, operator: "=" });
        return obj;
    }
    notEquals(val) {
        var obj = this.getCopy();
        obj.strWhere.push({ name: this.on, value: val, operator: "<>" });
        return obj;
    }
    isNull() {
        var obj = this.getCopy();
        obj.strWhere.push({ name: this.on, value: "AUTOSQLNULL", operator: "IS" });
        return obj;
    }
    isNotNull() {
        var obj = this.getCopy();
        obj.strWhere.push({ name: this.on, value: "AUTOSQLNULL", operator: "IS NOT" });
        return obj;
    }
}
exports.WhereClause = WhereClause;
