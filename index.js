const path=require("path");
const fs=require("fs");

class File{
    constructor(filename,name,ext,isFile,size,createTime,updateTime){
        this.filename=filename;
        this.name=name;
        this.ext=ext;
        this.isFile=isFile;
        this.size=size;
        this.createTime=createTime;
        this.updateTime=updateTime;
    }
    static async getFile(filename){
        const file=await fs.promises.stat(filename);
        const name = path.basename(filename);
        const ext=path.extname(filename);
        const isFile=file.isFile();
        const size=file.size;
        const createTime=file.birthtime;
        const updateTime=file.mtime;
        return new File(filename,name,ext,isFile,size,createTime,updateTime);
    }
    async getContent(isBuffer=false){
        if(this.isFile){
            if(isBuffer){
                return await fs.promises.readFile(this.filename);
            }
            else{
                return await fs.promises.readFile(this.filename,"utf-8");
            }
        }
        return null;
    }
    async getChildren(){
        if(this.isFile){
            return null;
        }
        let children = await fs.promises.readdir(this.filename);
        children = children.map(name=>{
            const childPath = path.resolve(this.filename,name);
            return File.getFile(childPath);
        })
        return Promise.all(children);
    }
}

    // async function test(){
    //     const filename = path.resolve(__dirname,"myFiles");
    //     const file =await File.getFile(filename);
    //     const res = await file.getChildren();
    //     console.log(res);
    // } 

    async function readDir(dirname){
        const file = File.getFile(dirname);
        return (await file).getChildren();
    }

    async function test(){
        const dirname=path.resolve(__dirname,"myFiles");
        const result = await readDir(dirname);
        console.log(await result[2].getChildren()); 
        console.log(result);
    }

test();
