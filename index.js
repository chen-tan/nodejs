const http=require("http");
const path=require("path");
const URL=require("url");
const fs=require("fs");

async function getStat(filename){
    try{
        return await fs.promises.stat(filename);
    }
    catch{
        return null;
    }
}
async function getFileInfo(req){
    const urlObj=URL.parse(req.url);
    const pathname=urlObj.pathname;
    let filename;
    filename=path.resolve(__dirname,"public",pathname.substr(1));
    let stat = await getStat(filename);
    if(!stat){
        return null;
    }else if(stat.isDirectory()){
        filename=path.resolve(__dirname,"public",pathname.substr(1),"index.html");
        stat=await getStat(filename);
        if(!stat){
            return null;
        }else{
            return fs.promises.readFile(filename);
        }
    }else{
            return fs.promises.readFile(filename);
    }
}

async function handler(req,res){
    const info=await getFileInfo(req);
    if(info){
        res.statusCode=200;
        res.write(info);
    }else{
        res.statusCode=404;
        res.write("Resource is not exist");
    }
    res.end();
}

const server = http.createServer((req,res)=>{
    handler(req,res);
});

server.listen(9888);
server.on("listening",()=>{
    console.log("server listen 9888");
})