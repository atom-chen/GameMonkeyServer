/**
 * 单元测试：注册登录
 * Creted by liub 2017.3.24
 */

let remote = require('./util')

describe('认证', function() {
    /**
     * 一个单元测试，可使用 skip only 修饰
     * 和负载均衡相关的单元测试，首先连接9901端口，发送config.getServerInfo请求，携带 "stype":"IOS", "oemInfo":{"openid":'helloworl'} 等参数，返回值：data.newbie:是否新注册用户 data.ip:服务器IP, data.port:服务器端口号
     */
    it('注册并登录 - 自动负载均衡'/*单元测试的标题*/, /*单元测试的函数体，书写测试流程*/ async () => {
        let msg = await remote.login({openid: `${Math.random()*1000000000 | 0}`});
        remote.isSuccess(msg);
    });

    it('路由基准测试', async () => {
        await remote.login();
        let msg = await remote.fetching({thirdUrl: `test/ping.html`});
        console.log(msg);
    });

    it('登录 - 自动推送好友列表', async () =>{
        let msg = await remote.watch(msg => {
            remote.log(msg);
        }, remote.NotifyType.friends).login();
       
        remote.isSuccess(msg);
    });

    /**
     * NotifyType.action会在登录时或者冲关体力不足时自动下发,也可以调用 gate.checkAction 主动查询
     */
    it('登录 - 自动推送体力值', async () => {
        let msg = await remote.watch(msg => { //服务端下发当前体力、体力上限、下一点体力恢复时间戳
            remote.log(msg);
        }, remote.NotifyType.action).login();

        if(remote.isSuccess(msg)) {
            console.log(`用户昵称: ${decodeURIComponent(msg.data.info.name)}`); //中文解码
        }
    });
});
