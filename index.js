const net = require("net");
const fs=require("fs");
const path=require("path");

const server = net.createServer();
server.listen(9527);
server.on("listening",()=>{
    console.log("正在监听9527端口");
})

server.on("connection",socket=>{
    console.log("有客户端连接到了");
    socket.on("data",async chunk=>{
        // console.log("客户端的请求内容为",chunk.toString("utf-8"));
        const filename = path.resolve(__dirname,"./convey.jpg");
        const imgBuffer = await fs.promises.readFile(filename);
        const headBuffer=Buffer.from(`HTTP/1.1 200 OK
Content-Type:image/jpg
Connection:keep-alive

`,"utf-8");
        //Buffer.concat传的参数要是一个数组
        const result=Buffer.concat([headBuffer,imgBuffer]);
        socket.write(result);
        socket.end();
    })
    socket.on("end",()=>{
        console.log("连接断开了");
    })
})