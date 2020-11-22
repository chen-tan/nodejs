const net = require("net");
//访问一个网站，分别得到响应头和响应体的数据

const socket = net.createConnection({
    host:"www.baidu.com",
    port:80
},()=>{
    console.log("连接成功");
})

let isFirst=true;
let receive='';
let contentLength=0;
let headObj={};
function parseResponse(response){
    if(isFirst){
        const index = response.indexOf("\r\n\r\n");
        const head=response.substring(0,index);
        const body=response.substring(index+2);
        headObj = head.split("\r\n").slice(1).reduce((obj,item)=>{
            const arr=item.split(":");
            obj[arr[0]]=arr[1];
            return obj;
        },{})
        contentLength=headObj["Content-Length"];
        // console.log("contentLength:",contentLength);
        // console.log("bodyLength:",body.length);
        if(contentLength-body.length<400){
            receive=body;
            socket.end();
        }else{
            receive+=body;
        }
        isFirst=false;
    }else{
        receive+=response;
        if(contentLength-receive.length<400){
            socket.end();
    }
    }
    
}

socket.on("data",async chunk=>{
    const response=chunk.toString("utf-8");
    parseResponse(response);
    console.log("这是head信息：",headObj);
    console.log("这是body信息：",receive);
}
)

socket.write(`GET / HTTP/1.1
Host: www.baidu.com

`);

socket.on("close",()=>{
    console.log("结束了");

})
