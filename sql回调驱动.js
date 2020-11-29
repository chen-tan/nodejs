// get the client
const mysql = require('mysql2');
 
// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password:'Lct11235813',
  database: 'companydb'
});

// connection.end();
 
// simple query
// connection.query(
//   'SELECT * FROM `company`;',
//   function(err, results) {
//     console.log(results); // results contains rows returned by server
//   }
// );

// connection.query(
//     "insert into company(`name`,location,buildDate) values('上海锅炉厂有限公司','上海市闵行区华宁路210号',CURDATE())",
//     (err,results)=>{
//         console.log(results);
//     }
// )

// connection.query(
//     "update company set buildDate = '1949-11-11' where id=10",
//     (err,results)=>{
//         console.log(results);
//     }
// )

connection.query(
    "delete from company where id in (9,10)",
    (err,result)=>{
        console.log(result);
    }
)

// // with placeholder
// connection.query(
//   'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
//   ['Page', 45],
//   function(err, results) {
//     console.log(results);
//   }
// );




