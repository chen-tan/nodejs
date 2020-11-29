const mysql = require('mysql2/promise');
//防止sql注入
const pool=mysql.createPool({
    host:"localhost",
    user:"root",
    password:"Lct11235813",
    database:"companydb",
    multipleStatements:true
})

async function test(id){
    const sql=`select * from employee where id=?`;
    const [results] = await pool.execute(sql,[id]);
    console.log(results);
    
}

test(7);


