const http= require("http");
const URL = require("url");
//作为客户端
// const request = http.request("http://yuanjin.tech:5005/api/movie",{
//     method:"GET"
// },resp=>{
//     console.log("响应码：",resp.statusCode);
//     console.log("响应头：",resp.headers);
//     let result="";
//     resp.on("data",chunk=>{
//         result+=chunk.toString("utf-8");
//     })
//     resp.on("end",()=>{
//         console.log(JSON.parse(result));
//     })
// })

// request.end();

//作为服务器

function handleReq(req){
    const urlObj=URL.parse(req.url);
    console.log("请求地址：",urlObj);
    console.log("请求头",req.headers);
    console.log("请求方法",req.method);
    let body="";
    req.on("data",chunk=>{
        body+=chunk.toString("utf-8");
    })
    req.on("end",()=>{
        console.log("请求体",body);
    })
}

const server = http.createServer((req,res)=>{
    handleReq(req);
    res.setHeader("a","1");
    res.setHeader("b","2");
    res.statusCode=201;
    res.write("好晚了该去睡觉了");
    res.end();
})

server.listen(9527);
server.on("listening",()=>{
    console.log("有请求来了！");
})