AutoSqlServerApi work with Asp.Net Core .net 5.0 and above. AutoSqlServerApi can create CRUD Api for your Sql Server by just adding a middleware in your Startup.
Installation:
Install AutoSqlServerApi Nuget package in your asp.net core application then Add Middleware in Startup file.
app.UseAutoSqlServerApi<MyAppDbContext>("/api/values","SqlUser");
Following is the full signature for the UseAutoSqlServerApi Middleware.
UseAutoSqlServerApi<T>(ApiPath,Role);
T: T is type of Microsoft.EntityFrameworkCore.DbContext
ApiPath: this path will be used by AutoSqlServerApi every request to this path will going to be handled by UseAutoSqlServerApi.
if your are using http://example.com for your application then by giving ApiPath="/api/values" api path is going to be:
http://example.com/api/values/  
And use me be in "SqlUser" role to use this api.
Usage:
to use this package you have to send a json object to api, object is given below;
{ top: "2",// how many rows you need
select: ["column1","column2","column2"],//string array leave empty to select all columns
where: [ { name:"columnName", value:"value", operator:"=" } ],//array of object to filter data
groupBy: ["column1","column2"],//string array leave empty if no group by required
orderBy:[ {name:"column1",by:"ASC|DESC"} ],//array of ordering columns, leave empty if required none
isDistinct: true|false,
betweens: [ { name:"columnName", value1:"",value2:"" } ]//arrayof objects for checking value of a column to be between in value1 and value2 , leave empty if required none

AutSqlServerApi also have ha npm package for create this object automatically for you.
just add autosqlserverapi in your angular or react (or any client side framework how usage Typescript or Javascript)
Usage of npm autosqlserverapi package:
set your api path in dotNetApiPath variable of AutoSqlconfig;
dotNetApiPath="http://example.com/api/values/"

Now Create a class for representing your Sql Server Table or View
like :
class Employee {
EmployeeID: string
LastName: string
FirstName: string
Title: string
TitleOfCourtesy: string
BirthDate: string
HireDate: string
Address: string
City: string
Region: string
PostalCode: string
Country: string
HomePhone: string
Extension: string
Photo: string
Notes: string
ReportsTo: string
PhotoPath: string
}

now crate a object of AutoSqlTable or View

var employees=new AutoSqlTable<Employee>("Employees");

Signature for crating new AutoSqlTable or AutSqlView Object
AutoSqlTable<T>(tableName);
T: T is your class type who represent your Table or View(All properties name must match the table columns name)

tableName: name of the table in your database;

Now you can use the employees object for:
Getting the data of table,
Filterint the table data,
for updateing the row,
for adding new row
get the count of table rows
and more.
available methods in npm package

⦁ first()
⦁ select([])
⦁ desc()
⦁ asc()
⦁ distinct()
⦁ orderBy()
⦁ where
⦁ get
⦁ count
⦁ take
⦁ delete
⦁ add
⦁ update

first:
first() method will return the top row of table
eg:
employees.select(["Id,name"]).desc("id").first().getResult(p=>{
console.log(p)
});
select:
select selcted columns form the table eg:
employees.select(["Id,name"]).getResult(p=>{
console.log(p)
});
desc(columnName):
select result in desc order
asc(columnName);
select result in asc order
orderBy([obj]):
employees.orderBy([{ name: "Year", by: SqlSortTypes.DESC }])
wll order the result by given array
Where:
will return the object of WhereClause set on the given column name;
In where clause you can create a chain of metods to filter the data like this
employees.where("DOBMonth").between("1", "2").where("id").above("1").getResult()
WhereClause have following Methods
above(val:string);
aboveOrEqual(val);
below(val) ;
belowOrEqual(val)
between(val1, val2)
equals(val)
notEquals(val);
isNull()
isNotNull()
WhereClause metods returns the object of your tableClass so you can add another filter on the table.
