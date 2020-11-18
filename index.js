const path=require("path");
const fs=require("fs");
const { kMaxLength } = require("buffer");

// const file=path.resolve(__dirname,"copy/a.txt");
// const ws=fs.createWriteStream(file,{
//     highWaterMark:16*1024,
//     encoding:"utf-8",
// });
// for(let i=0;i<1024*1024*10;i++){
//     ws.write("a");
// }
// ws.end();


//把一个文件复制到另一个文件

//方式一

async function method1(){
    const from=path.resolve(__dirname,"copy/a.txt");
    const to=path.resolve(__dirname,"copy/b.txt");
    console.time("方式1");
    const content=await fs.promises.readFile(from);
    await fs.promises.writeFile(to,content);
    console.timeEnd("方式1");
}

method1();

//方式二
async function method2(){
    const from=path.resolve(__dirname,"copy/a.txt");
    const to=path.resolve(__dirname,"copy/c.txt");
    const rs=fs.createReadStream(from,{
        encoding:"utf-8",
        highWaterMark:16*1024
    });
    const ws=fs.createWriteStream(to,{
        encoding:"utf-8",
        highWaterMark:16*1024
    })
    console.time("方式2");
    rs.on("data",chunk=>{
        let flag = ws.write(chunk);
        if(!flag){
            rs.pause();
        }
    })
    ws.on("drain",()=>{
        rs.resume();
    })
    rs.on("close",()=>{
        ws.end();
        console.timeEnd("方式2");
        console.log("复制完成");
    })
}

method2();

async function method3(){
    const from=path.resolve(__dirname,"copy/a.txt");
    const to=path.resolve(__dirname,"copy/d.txt");
    const rs=fs.createReadStream(from);
    const ws=fs.createWriteStream(to,{
        encoding:"utf-8",
        highWaterMark:16*1024
    })
    console.time("方式3");
    rs.pipe(ws);
    console.timeEnd("方式3");
}
method3();