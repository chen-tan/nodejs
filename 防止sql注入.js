const mysql = require('mysql2/promise');
//防止sql注入
async function test(id){
    const connection=await mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"Lct11235813",
        database:"companydb",
        multipleStatements:true
    })
    const sql=`select * from employee where id=?`;
    const [results] = await connection.execute(sql,[id]);
    console.log(results);
    connection.end();
}

test(6);


