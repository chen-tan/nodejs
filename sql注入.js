const mysql = require('mysql2/promise');
//sql注入
async function test(id){
    const connection=await mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"Lct11235813",
        database:"companydb",
        multipleStatements:true
    })
    const sql=`select * from employee where id=${id}`;
    const [results] = await connection.query(sql);
    console.log(results);
    connection.end();
}

test('"";delete from company where `name`="上海锅炉厂"');


