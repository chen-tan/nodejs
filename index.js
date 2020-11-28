const MyRequest=require("./MyRequest.js");

const request=new MyRequest("http://www.baidu.com");

request.send();

request.on("res",(headers,result)=>{
    console.log(headers);
    console.log(result);
})
