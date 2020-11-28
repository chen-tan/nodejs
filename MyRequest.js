const http=require("http");
const { EventEmitter } = require("events");

module.exports=class MyRequest extends EventEmitter{
    constructor(url,options){
        super();
        this.url=url;
        this.options=options;
    }
    send(body=""){
        const request=http.request(this.url,this.options,res=>{
            const headers=res.headers;
            let result="";
            res.on("data",chunk=>{
                result+=chunk.toString("utf-8");
            })
            res.on("end",()=>{
                this.emit("res",headers,result);
            })
        })
        request.write(body);
        request.end();
    }
}