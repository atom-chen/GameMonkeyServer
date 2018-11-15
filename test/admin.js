/**
 * 单元测试：后台管理
 * Creted by liub 2017.3.24
 */
let remote = require('./util')

describe('后台管理', function() {
    /**
     * 一个单元测试，可使用 skip only 修饰
     */
    it('登录'/*单元测试的标题*/, /*单元测试的函数体，书写测试流程*/ async () => {
        let msg = await remote.login({domain:'admin', openid:'2222', openkey:'chick.server'});
        console.log(msg);
    });

    it('注册/在线/消费'/*单元测试的标题*/, /*单元测试的函数体，书写测试流程*/ async () => {
        let msg = await remote.login({domain:'admin', openid:'2222', openkey:'chick.server'});
        msg = await remote.fetching({func:'admin.summary', server:'IOS.1'});
        remote.log(msg);
    });

    it('服务器列表', async () => {
        let msg = await remote.login({domain:'admin', openid:'super', openkey:'chick.server'});
        msg = await remote.fetching({func:'admin.getServerList'});
        remote.log(msg);
    });

    it('留存率'/*单元测试的标题*/, /*单元测试的函数体，书写测试流程*/ async () => {
        let msg = await remote.login({domain:'admin', openid:'2222', openkey:'chick.server'});
        msg = await remote.fetching({func:'admin.survive', time:'2017.5.29'});
        remote.isSuccess(msg);
    });

    it('列表特殊路由', async () => {
        let msg = await remote.login({domain:'admin', openid:'2222', openkey:'chick.server'});
        msg = await remote.fetching({func:'admin.addRoute', openid:'111'});
        msg = await remote.fetching({func:'admin.addRoute', openid:'222'});
        remote.fetching({func:'admin.delRoute', openid:'111'});
        console.log(msg);
    });
});
