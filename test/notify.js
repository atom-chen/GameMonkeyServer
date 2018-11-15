/**
 * 单元测试：消息推送
 * Creted by liub 2017.5.15
 */
let remote = require('./util')
let {wait} = require('./utils/commonFunc');

//一组单元测试，可使用 skip only 修饰
describe('推送', function() {
    it('服务端推送消息测试'/*单元测试的标题*/, /*单元测试的函数体，书写测试流程*/ async () => {
        if(remote.rpcMode == remote.CommMode.ws){
            await remote.login();
            await remote.watch(msg => {
                console.log(msg);
            }, remote.NotifyType.none).fetching({func:"test.notify", msg:"hello"});
        }
    });
});
