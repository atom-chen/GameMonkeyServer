let facade = require('../facade/Facade')

//如果在IDE中调测单个服务器功能，可以在以下语句中进行设置
let env = !!process.env.sys ? JSON.parse(process.env.sys) : {
    serverType: "IOS",      //待调测的服务器类型
    serverId: 1             //待调测的服务器编号
};  

if(env.constructor == String){
    env = JSON.parse(env);
}

//系统主引导流程，除了必须传递运行环境变量 env，也可以搭载任意变量，这些变量都将合并为核心类的options对象的属性，供运行时访问
facade.boot({env:env});
