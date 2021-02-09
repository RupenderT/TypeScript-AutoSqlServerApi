export class WhereClause<T> {

    constructor(private on, private obj:any) { }
    getCopy() { return this.obj; }

    above(val: string):T {
        var obj = this.getCopy();
        obj.strWhere.push({ name: this.on, value: val, operator: ">" });
        return obj;
    }
    aboveOrEqual(val:string):T {

        var obj = this.getCopy();
        obj.strWhere.push({ name: this.on, value: val, operator: ">=" });
        return obj;
    }
    below(val:string):T {
        var obj = this.getCopy();
        obj.strWhere.push({ name: this.on, value: val, operator: "<" });
        return obj;
    }
    belowOrEqual(val:string):T {
        var obj = this.getCopy();
        obj.strWhere.push({ name: this.on, value: val, operator: "<=" });
        return obj;
    }
    between(val1:string, val2:string):T {
        var obj = this.getCopy();
        obj.betweenArr.push({ name: this.on, value1: val1, value2: val2 });
        return obj;
    }
    equals(val:string):T {
        var obj = this.getCopy();
        obj.strWhere.push({ name: this.on, value: val, operator: "=" });
        return obj;
    }
    notEquals(val:string):T{
        var obj = this.getCopy();
        obj.strWhere.push({ name: this.on, value: val, operator: "<>" });
        return obj;
    }

    isNull():T {
        var obj = this.getCopy();
        obj.strWhere.push({ name: this.on, value: "AUTOSQLNULL", operator: "IS" });
        return obj;
    }
    isNotNull():T {
        var obj = this.getCopy();
        obj.strWhere.push({ name: this.on, value: "AUTOSQLNULL", operator: "IS NOT" });
        return obj;
    }

}