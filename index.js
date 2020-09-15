


// process对象
// process.cwd() 与当前文件在哪没关系，是运行时命令行目录
// console.log('当前命令行：',process.cwd());

// 强制退出进程
// setTimeout(()=>{
//     console.log('abc');
// },1000);
// process.exit();
// 有参数，默认为0，表示正常退出，没有错误

// node index a b c d 得到命令行参数
// console.log(process.argv);

// 操作系统运行平台
// console.log(process.platform);

// 杀死一个进程 kill(进程的id)
// console.log(process.kill);

// console.log(process.env);