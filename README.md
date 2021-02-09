AutoSqlServerApi work with Asp.Net Core .net 5.0 and above. AutoSqlServerApi can create CRUD Api for your Sql Server by just adding a middleware in your Startup.
# Installation:
##### Install AutoSqlServerApi Nuget package in your asp.net core application then Add Middleware in Startup file.

        app.UseAutoSqlServerApi<MyAppDbContext>("/api/values","SqlUser");
        Following is the full signature for the UseAutoSqlServerApi Middleware.
        UseAutoSqlServerApi<T>(ApiPath,Role);
        
   - T: T is type of Microsoft.EntityFrameworkCore.DbContext
   - ApiPath: this path will be used by AutoSqlServerApi every request to this path    will going to  be handled by UseAutoSqlServerApi.
   
If your are using http://example.com for your application then by giving ApiPath="/api/values" api path is going to be:
http://example.com/api/values/  
And user must be in "SqlUser" role to access this api.
# Usage:
 to use this package you have to send a json object to api, object is given below:

       { 
            top: "2",
            select: ["column1","column2","column2"],
            where: [ { name:"columnName", value:"value", operator:"=" } ],
            groupBy: ["column1","column2"],
            orderBy:[ {name:"column1",by:"ASC|DESC"} ],
            isDistinct: true|false, 
            betweens: [ { name:"columnName", value1:"",value2:"" } ]
       }

  - **top**: how many rows you need
  - **select**: string array leave empty to select all columns
  - **where**:array of object to filter data
  - **groupBy**:string array leave empty if no group by required
  - **orderBy**:array of ordering columns, leave empty if required none
  - **isDistinct**: Wheather result should be unique or not
  - **betweens**:arrayof objects for checking value of a column to be between in                   value1 and value2 , leave empty if required none
  
AutSqlServerApi also have ha npm package for create this object automatically for you.
just add autosqlserverapi in your angular or react (or any client side framework how usage Typescript or Javascript).

# Usage of  npm autosqlserverapi  package:
    First create a class for representing your Sql Server Table  or View
    like :
    class Employee {
            employeeID: string
            lastName: string
            firstName: string
            title: string
            titleOfCourtesy: string
            birthDate: string
            hireDate: string
            address: string
            city: string
            region: string
            postalCode: string
            country: string
            homePhone: string
            extension: string
            photo: string
            notes: string
            eportsTo: string
            photoPath: string
        }

now crate a object of AutoSqlTable or View 

        var employees=new AutoSqlTable<Employee>("Employees");

Signature for crating new AutoSqlTable or AutSqlView Object:
      
        AutoSqlTable<T>(tableName);
        
 - **T**: T is your class type who represent your Table or View(All properties name must    match the table columns name)

- **tableNam**e: name of the table in your database;

Now you can use the employees object for:
-   Getting the data of table,
- Filterint the table data,
- For updateing the row,
- For adding new row
- Get the count of table rows
- And  more.

## Available methods in npm package

-	first
-	select
-	desc
-	asc
-	distinct
-	orderBy
-	where
-	get
-	count
-	take
-	delete
-	add
-	update

## first:
    first() method will return the top row of table
    eg:
     employees.select(["Id,name"]).desc("id").first().getResult(p=>{
        console.log(p)
        });
        
## select:
        select selcted columns form the table eg:
        employees.select(["Id,name"]).getResult(p=>{
            console.log(p)
        }); 
 
## desc(columnName):
    Select result in desc order.
## asc(columnName);
    Select result in asc order
## orderBy([obj]):
    employees.orderBy([{ name: "Year", by: SqlSortTypes.DESC }])
    wll order the result by given array
## where:
    will return the object of WhereClause set on the given column name;
    In where clause you can create a chain of metods to filter the data like this
    employees.where("DOBMonth").between("1", "2").where("id").above("1").getResult()

## WhereClause have following Methods
- above(val:string);
-  aboveOrEqual(val);
- below(val) ;
-  belowOrEqual(val)
- between(val1, val2) 
-  equals(val)
-  notEquals(val);
- isNull()
- isNotNull()

WhereClause metods returns the object of your tableClass so you can add another filter on the table.



